<template>
    <text class="ICodeBody">
        <UIIcon class="UIIcon" icon="copy" size="40" primary @click="handleClick"/>    
        <IRich :node="code">
            
        </IRich>
    </text>
</template>

<script lang="ts" setup>
/** @desc Code, 预览组件的代码， 暂时不用 **/
import { CLICK_EVENT } from "../../common/constants";
import UIIcon from "../Icon/index.vue";
const props = defineProps({
    code: String
})
const emits = defineEmits([CLICK_EVENT]);
const handleClick = () => {
    emits(CLICK_EVENT)
}
</script>

<style lang="scss">
.ICodeBody {
    position: relative;
    display: inline-block;
    width: 100%;
    padding: 20rpx 0 15rpx;
    line-height: $i-line-m;
    font-size: $i-font-m;
}
.UIIcon {
    position: absolute;
    right: 0;
    top: 0;
}
</style>
