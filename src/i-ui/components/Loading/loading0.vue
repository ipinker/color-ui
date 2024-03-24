<template>
	<text class="ILoadingIcon"></text>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/store/theme";
const props = defineProps({
    color: {
        type: String,
        default: ""
    },
    size: {
        type: [String, Number],
        default: "32rpx"
    }
});
const store = useThemeStore();
const borderColor = computed(() => props.color || store.theme?.colorBorder || "");
</script>

<style lang="scss" scoped>
.ILoadingIcon {
    display: inline-block;
    width: v-bind(size);
    height: v-bind(size);
    position: relative;
    border-radius: 50%;
    border-top: 3rpx solid v-bind(borderColor);
    border-bottom: 3rpx solid transparent;
    border-left: 3rpx solid transparent;
    border-right: 3rpx solid transparent;
    animation: defaultLoading 0.95s linear infinite;
}

@keyframes defaultLoading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
