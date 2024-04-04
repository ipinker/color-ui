<template>
	<text class="ILoadingIcon"></text>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme";
import { genPx } from "../../common/style";

const props = defineProps({
    color: {
        type: String,
        default: ""
    },
    size: {
        type: [String, Number],
        default: "32"
    }
})
const store = mapStores(useThemeStore).themeStoreStore();
const borderColor = computed(() => props.color || store.theme?.colorBorder || "");
const fontSize = computed(() => genPx(props.size));
</script>

<style lang="scss" scoped>
.ILoadingIcon {
    display: inline-block;
    width: v-bind(fontSize);
    height: v-bind(fontSize);
    border-radius: 50%;
    border: 2px solid v-bind(borderColor);
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