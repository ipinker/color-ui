<template>
	<div class="IGridContainer">
		<div :id="elId" ref="gridRef" class="IGrid" :class="{ 'IGridborder': useBorder }" 
        :style="[ gridStyle ]"
        >
			<slot />
		</div>
	</div>
</template>

<script setup lang='ts'>
import { CHANGE_EVENT } from "../../common/constants";
import { gridProps, GridPropsType} from "./grid"
import { useThemeStore } from "@/store/theme";
import { useStyle } from "../../hooks/useStyle";
const props: GridPropsType = defineProps(gridProps);
const emits = defineEmits([CHANGE_EVENT]);
const _self = getCurrentInstance();
const gridRef = ref(null);
const store = useThemeStore();
const { colorValue } = useStyle();
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif
const elId = `IGrid_${Math.ceil(Math.random() * 10e5).toString(36)}`;
const width = ref("0");
const children: {width: string}[] = reactive([]);
const borderColorValue = colorValue.value(props.borderColor || store.theme?.colorBorderSecondary || "");
const gridStyle = computed(() => {
    return {
        "border-left-color" : borderColorValue
    }
});

const _getSize = (fn: Function) => {
    const column = +props.column;
    // #ifndef APP-NVUE
    console.time("GetSize")
    uni.createSelectorQuery()
        .in(_self)
        .select(`#${elId}`)
        .boundingClientRect()
        .exec((ret: any) => {
            const parentWidth = ret[0].width;
            const _width: number = Math.floor((parentWidth - 1) / column);
            width.value = _width + 'px';
            fn(width.value)
        })
    // #endif
    // #ifdef APP-NVUE
    dom.getComponentRect(gridRef, (ret: any) => {
        const parentWidth = ret.size.width;
        const _width: number = Math.floor((parentWidth - 1) / column);
        width.value = _width + 'px';
        fn(width.value)
    })
    // #endif
}

const handleInit = () => {
    setTimeout(() => {
        _getSize((width: string, margin: string) => {
            children.forEach((item, index) => {
                item.width = width
            })
        })
    }, 50)
}

const handleChange = (e: any) => {
	emits(CHANGE_EVENT, e);
}

onMounted(() => {
    nextTick(()=>{
        handleInit();
    })
})

defineExpose({
    children,
    width,
    change: handleChange
})

provide("GridKey", {
    grid: _self
});

</script>

<style lang="scss" >
	.IGridContainer {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: column;
		/* #ifdef H5 */
		width: 100%;
		/* #endif */
        margin: 0 auto;
	}

	.IGrid {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		// flex: 1;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.IGridborder {
		position: relative;
		/* #ifdef APP-NVUE */
		border-left-color: v-bind(borderColorValue);
		border-left-style: solid;
		border-left-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		z-index: 1;
		border-left: 1px v-bind(borderColorValue) solid;
		/* #endif */
        box-sizing: border-box;
	}
</style>
