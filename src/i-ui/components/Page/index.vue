<template>
    <div class="IPageBody" :class="{ 'flex-column-align-center' : center }">
        <UINavigationBar :title="title" :useBack="useBack" :titleAlign="titleAlign" :usePrimary="usePrimary"
            v-if="title"
        >
            <template v-slot="operate">
                <slot name="operate"/>
            </template>
        </UINavigationBar>
        <slot />
        <UILoading :color="colorForMask" size="60rpx" :type="loadingType" useMask v-if="isLoading"/>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useThemeStore } from "@/store/theme"
import { PagePropsType, pageProps } from "./page"
import UINavigationBar from "../NavigationBar/index.vue"
import UILoading from "../Loading/index.vue"
const props: PagePropsType = defineProps(pageProps)
const themeStore = useThemeStore();
const pageColor = computed(() => themeStore.theme?.colorBgLayout);
const textColor = computed(() => themeStore.theme?.colorText);
const colorForMask = computed(() => themeStore.theme?.colorWhite);
</script>

<style lang="scss">
page,
.IPageBody {
    position: relative;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
    min-height: 100vh;
    background-color: v-bind(pageColor);
    color: v-bind(textColor);
}
</style>
