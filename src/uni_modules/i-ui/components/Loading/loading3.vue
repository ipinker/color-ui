<template>
	<text class="ILoadingIcon"></text>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme";
const props = defineProps({
    color: {
        type: String,
        default: ""
    },
    size: {
        type: [String, Number],
        default: "32rpx"
    }
})
const store = mapStores(useThemeStore).themeStoreStore();
const borderColor = computed(() => props.color || store.theme?.colorBorder || "");
</script>

<style lang="scss" scoped>
.ILoadingIcon {
    display: inline-block;
    width: v-bind(size);
    height: v-bind(size);
    border-radius: 50%;
    border: 3rpx solid v-bind(borderColor);
    border-right-color: transparent;
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