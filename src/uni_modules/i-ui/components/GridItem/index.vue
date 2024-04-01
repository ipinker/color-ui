<template>
	<div v-if="width" :style="[gridItemRectStyle]" class="IGridItemContainer">
		<div class="IGridItem"  :class="{ 
            'IGridItemBorder': useBorder,  
            'IGridItemBorderTop': showBorderTop,
            'IGridItemActive': active
          }"
		  :style="[gridItemStyle]"
          @click="handleClick"
        >
			<slot />
		</div>
	</div>
</template>

<script setup lang='ts'>
import { ComponentInternalInstance, StyleValue } from 'vue';
import { gridItemProps, GridItemPropsType } from "./gridItem"
import { GridPropsType } from "../Grid/grid"
import { useThemeStore } from '../../theme';
import { genDarkColor, genColor } from '../../common/style';
import { useStyle } from "../../hooks/useStyle";


type GridProvideType = { 
    props : GridPropsType, 
    exposed: { 
        children: any[], 
        width: Ref<string>,
        change: (e: any) => void 
    }
};

const props: GridItemPropsType = defineProps(gridItemProps);
const _self = getCurrentInstance();
const gridProvide: { grid : ComponentInternalInstance } | undefined = inject("GridKey");
const gridThis : GridProvideType = gridProvide?.grid as unknown as GridProvideType;;
const store = useThemeStore();

const { colorValue } = useStyle();
const column = ref(0);
const useBorder = ref(true);
const square = ref(true);
const active = ref(true);
const width = ref("0");
const borderColor = ref('');

watch(() => gridThis?.exposed?.width.value, (newValue) => {
    if(newValue.length > 1){
        width.value = newValue;
    }
})

const showBorderTop = computed(() => useBorder.value && +props.index < column.value)

const borderColorValue = computed(() => colorValue.value(borderColor.value || store.theme?.colorBorderSecondary || ""));
const layoutColorValue = computed(() => store.theme?.colorBgLayout || "#F4F4F7");
const gridItemStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
    return {
        'border-right-color' : borderColorValue.value,
        'border-bottom-color' : borderColorValue.value,
        'border-top-color' : borderColorValue.value
    }
})
const gridItemRectStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
    const style: StyleValue = {
        width: width.value
    }
    if(square.value) style.height = width.value;
    return style;
})

const handleClick = () => {
    gridThis?.exposed?.change && gridThis.exposed.change({
        index: props.index
    })
}

onBeforeMount(() => {
    const gridProps: GridPropsType = gridThis?.props;
    column.value = +gridProps?.column;
	useBorder.value = gridProps.useBorder;
	square.value = gridProps.square;
	active.value = gridProps.active;
	borderColor.value = gridProps.borderColor || store.theme?.colorBorderSecondary || "";
    gridThis?.exposed?.children && gridThis.exposed.children.push(_self);
    nextTick(() => {
        if(gridThis?.exposed?.width.value){
            width.value = gridThis?.exposed?.width.value;
        }
    })
})

onBeforeUnmount(() => {
    gridThis?.exposed?.children && gridThis.exposed.children.forEach((item, index) => {
        if (item === _self) {
            gridThis.exposed.children.splice(index, 1)
        }
    })
});

defineExpose({
    self: _self
})
</script>

<style lang="scss" >
	.IGridItemContainer {
		/* #ifndef APP-NVUE */
		height: 100%;
		display: flex;
		/* #endif */
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.IGridItem {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		position: relative;
		flex: 1;
		flex-direction: column;
        transition: all .3s;
	}

	.IGridItemBorder {
		position: relative;
		/* #ifdef APP-NVUE */
		border-bottom-color: v-bind(borderColorValue);
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		border-right-color: v-bind(borderColorValue);
		border-right-style: solid;
		border-right-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		z-index: 0;
		border-bottom: 1px v-bind(borderColorValue) solid;
		border-right: 1px v-bind(borderColorValue) solid;
		/* #endif */
	}

	.IGridItemBorderTop {
		position: relative;
		/* #ifdef APP-NVUE */
		border-top-color: v-bind(borderColorValue);
		border-top-style: solid;
		border-top-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		border-top: 1px v-bind(borderColorValue) solid;
		z-index: 0;
		/* #endif */
	}

    .IGridItemActive:active {
        background-color: v-bind(layoutColorValue);
        opacity: $i-opacity-l;
    }
	.IGridItemActive:hover {
		background-color: $i-bg-layout;
        background-color: v-bind(layoutColorValue);
        opacity: $i-opacity-xl;
	}
</style>