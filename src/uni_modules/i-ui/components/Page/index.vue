<template>
    <view class="IPageBody col" :class="{ 'flex-column-align-center' : center }">
        <UINavigationBar :opacity="opacity" :title="title" :useBack="useBack" :titleAlign="titleAlign" :usePrimary="usePrimary"
            v-if="title"
        >
            <template v-slot="operate">
                <slot name="operate"/>
            </template>
        </UINavigationBar>
        <view class="StatusBarRelative" v-if="!title && nav"></view>
        <slot />
        <UILoading :color="colorForMask" size="60" :type="loadingType" useMask v-if="isLoading"/>
    </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme"
import { PagePropsType, pageProps } from "./page"
import UINavigationBar from "../NavigationBar/index.vue"
import UILoading from "../Loading/index.vue"
const props: PagePropsType = defineProps(pageProps)
const themeStore = mapStores(useThemeStore).themeStoreStore();
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
    min-height: calc(100vh - var(--window-bottom));
    background-color: v-bind(pageColor);
    color: v-bind(textColor);
}
.StatusBarRelative {
    height: var(--status-bar-height);
}
.TabBarRelative {
    height: var(--window-bottom);
}
</style>