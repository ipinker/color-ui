<template>
    <view class="IRow flex" :class="classList" :style="styleOption">
        <slot />
    </view>
</template>
<script setup lang="ts">
import { StyleValue, computed } from 'vue';
import { genPx } from "../../common/style";


const props = defineProps({
    justify: String,
    align: String,
    width: String,
    height: String
});
const styleOption: StyleValue = {};
if(props.width){
    styleOption.width = genPx(props.width)
}
if(props.height){
    styleOption.height = genPx(props.height);
}

const classList = computed(() => {
    const list: string[] = [];
    switch (props.justify) {
        case "center":
            list.push("flex-justify-center");
            break;
        case "end":
            list.push("flex-justify-end");
            break;
        case "between":
            list.push("flex-justify-between");
            break;
        case "around":
            list.push("flex-justify-around");
            break;
        default:
            list.push("flex-align-start");
            break;
    }
    switch (props.align) {
        case "center":
            list.push("flex-align-center");
            break;
        case "end":
            list.push("flex-align-end");
            break;
        default:
            list.push("flex-align-start");
            break;
    }
    return list;
});
</script>
