<template>
	<view :style="[{
		width: $width,
		height: $height,
		backgroundColor: bg || bgColor,
		margin: $margin,
		display: inline ? 'inline-block' : 'block'
	}]"></view>
</template>

<script lang="ts" setup>
import { genPx } from "../../common/style"
const props = defineProps({
    // 行宽
    width: {
        type: String,
        default: "100%"
    },
    // 列高
    height: {
        type: String,
        default: "0"
    },
    // 背景色
    bgColor: {
        type: String,
        default: ""
    },
    // 背景色
    bg: {
        type: String,
        default: ""
    },
    // 是否设置行内元素
    inline: Boolean,
    // 外边距
    margin: {
        type: String,
        default: "0"
    }
})
const $margin = computed(() => genPx(props.margin));
const $width = computed(() => genPx(props.width));
const $height = computed(() => genPx(props.height));
</script>

