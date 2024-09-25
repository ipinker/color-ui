<template>
    <view class="IPageBody col" :class="{ 'flex-column-align-center' : center }">
        <UINavigationBar :opacity="opacity" :title="title" :useBack="useBack" 
            :titleAlign="titleAlign" :usePrimary="usePrimary" :statusBarInBody="statusBarInBody"
            :gradientType="gradientType" :gradientValue="gradientValue"
            :color="color" :bgColor="bgColor" :statusColor="statusColor"
            v-if="title"
        >
            <template #ext>
                <slot name="ext"/>
            </template>
        </UINavigationBar>
        <view class="StatusBarRelative" v-if="!title && nav"></view>
        <slot />
        <UILoading :color="colorForMask" size="60" :type="loadingType" useMask v-if="isLoading"/>
        <view :style="[pageSafeAreaStyle]"></view>
    </view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme"
import { PagePropsType, pageProps } from "./page"
import UINavigationBar from "../NavigationBar/index.vue"
import UILoading from "../Loading/index.vue"
import { getSystemInfo } from "../../common/util";
import { useStyle } from "../../hooks/useStyle";

const props: PagePropsType = defineProps(pageProps);
const { colorValue } = useStyle();
const themeStore = mapStores(useThemeStore).themeStoreStore();
const pageColor = computed(() => props.pageColor ? colorValue.value(props.pageColor) : themeStore.theme?.colorBgLayout);
const textColor = computed(() => themeStore.theme?.colorText);
const colorForMask = computed(() => themeStore.theme?.colorWhite);

let SYS_INFO = getSystemInfo();
const pageSafeAreaStyle = {
    "height":  +(props.tabHeight || 0) + (SYS_INFO.safeAreaInsets?.bottom || 0) + "px"
};

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

.StatusBarRelative {
    height: var(--status-bar-height);
}
.TabBarRelative {
    height: var(--window-bottom);
}
</style>