<template>
    <div class="ITitleContainer flex-align-center" :style="[containerStyle, styleOption]">
        <div class="ITitleSign" :style="[signStyleOpt]" v-if="showSign"></div>
        <div class="ITitle flex-align-center flex-full">
            <template v-if="title">{{title}}</template>
            <template v-else><slot/></template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "../../theme";
import { ComputedRef, StyleValue} from "vue";
import { titleProps, TitlePropsType } from "./title";
import { useStyle } from "../../hooks/useStyle"
import { genPx } from "../../common/style";
const props: TitlePropsType = defineProps(titleProps);
const store = useThemeStore();
const { colorValue } = useStyle();
const signStyleOpt: ComputedRef<StyleValue> = computed((): StyleValue => {
    const style: StyleValue = {
        backgroundColor: colorValue.value(props.color || store.theme?.colorPrimary || "")
    };
    return style;
});

const containerStyle = computed(() => {
    const style: StyleValue = {};
    if(props.width){
        style.width = genPx(props.width)
    }
    return style
})

</script>
<style lang="scss" scoped>
    .ITitleContainer {
        width: 100%;
        max-width: 100%;
        padding: $i-padding-m 0;
        &.normal {
            font-weight: $i-weight-m;
        }
        .ITitleSign {
            width: 6px;
            height: 20px;
            margin-right: 8px;
            border-radius: $i-radius-s;
        }
        .ITitle {
            max-width: calc(100% - 16rpx);
            line-height: $i-line-l;
            font-size: $i-font-l;
            font-weight: $i-weight-l;
            word-break: break-all;
        }
    }
</style>