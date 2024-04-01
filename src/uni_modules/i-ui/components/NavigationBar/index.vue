<template>
    <div class="INavigationBarContainer" :style="[{height: navigateHeight + 'px'}]">
        <div class="INavigationBarRelative"></div>
        <div class="INavigationBar" :style="[{ height: navigateHeight +'px' }]">
            <div class="INavigationStatus" :style="[{height: statusBarHeight+'px'}, statusBarBackground]" v-if="!statusBarInBody"></div>
            <div class="INavigationBody" :style="[{ height: contentHeightValue + 'px'}, navigationBarBackground]" v-if="custom">
                <slot />
            </div>
            <div class="INavigationBody" :style="[{ height: contentHeightValue + 'px' }, navigationBarBackground]" v-else>
                <div class="INavigationContent">
                    <div class="INavigationContentBox flex-align-center" :style="[navigationTextColor]">
                        <div class="INavigationBack flex-align-center ActiveLight" v-if="useBack" @click="handleBack">
                            <UIIcon size="40" :icon="backIcon" />{{backTxt}}
                        </div>
                        <div class="INavigationContext flex-align-center flex-full padding-s"
                            :style="[titleAlignObj]"
                        >
                            <block v-if="title"> {{title}} </block>
                            <block v-else> <slot /> </block>
                        </div>
                        <div class="INavigationRight flex-align-center flex-justify-end" :style="[{paddingRight: paddingRight + 'px'}]"><slot name="operate"></slot></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
	import { navigateBack } from "ipink-util";
    import { StyleValue, ref, computed, ComputedRef, onMounted } from "vue";
    import { mapStores } from "pinia";
    import { useThemeStore } from "../../theme";
    import { navigationProps, NavigationBarPropsType } from "./navigationBar"
    import { isLightColor } from "../../common/style";
    import UIIcon from "../Icon/index.vue"
    const themeStore = mapStores(useThemeStore).themeStoreStore();
    const props: NavigationBarPropsType = defineProps(navigationProps);

    let statusBarHeight = ref(0),
        paddingRight = ref(0),
        canBack = ref(true),
        statusBarBackground = computed(() => {
            const themeColor = props.primary ? themeStore.theme?.colorPrimaryHover : themeStore.theme?.colorInfoHover;
            return { background : props.statusColor || themeColor }
        }),
        navigationBarBackground = computed(() => {
            let bgValue = ""
            if (props.gradientType) bgValue = props.gradientType+'-gradient('+props.gradientValue+')';
            else bgValue = props.bgColor || (props.primary ? themeStore.theme?.colorPrimary : themeStore.theme?.colorBgContainer) || "";
            return {
                background : bgValue
            };
        }),
        navigationTextColor = computed(() => {
            let colorValue = "";
            if (props.gradientType) colorValue = themeStore.theme?.colorWhiteTextBase || "";
            else {
                const bgColor = props.bgColor || (props.primary ? themeStore.theme?.colorPrimary : themeStore.theme?.colorBgContainer) || "";
                colorValue = (isLightColor(bgColor) ? themeStore.theme?.colorText : themeStore.theme?.colorWhiteTextBase) || "";
            }
            if(props.color) colorValue = props.color;
            return {
                color: colorValue
            };
        });
    const titleAlignObj: ComputedRef<StyleValue> = computed((): StyleValue => {
        return {
            textAlign : props.titleAlign || 'center'
        } as StyleValue
    })
    const contentHeightValue = computed(() => {
        if(props.statusBarInBody) return uni.upx2px(+props.height) + statusBarHeight.value;
        return uni.upx2px(+props.height)
    })
    const navigateHeight = computed(() => contentHeightValue.value + statusBarHeight.value);
    const maskColor = computed(() => themeStore.theme?.colorBgMask)
    onMounted(() => {
        try {
            const sysInfo = uni.getSystemInfoSync();
            statusBarHeight.value = sysInfo.statusBarHeight || 0;
            // #ifdef MP
            const _info = wx.getMenuButtonBoundingClientRect() || {};
            paddingRight.value = sysInfo.windowWidth - _info.left;
            // #endif
            paddingRight.value = paddingRight.value + 10;
        } catch (e) {
        }
    });

    const handleBack = () => {
        if(canBack.value){
            canBack.value = false;
            navigateBack();
            setTimeout(() => canBack.value = true, 300);
        }
    }
</script>

<style lang="scss">
.INavigationBarContainer {
    width: 1rpx;
}
.INavigationBarRelative {
    height: calc(100rpx + var(--status-bar-height));
}
.INavigationBar {
    position: fixed;
    top: 0; left: 0;
    z-index: $i-index-l;
    width: $i-width-full;
}

.INavigationStatus {
    width: $i-width-full;
}
.INavigationBody  {
    position: relative;
    height: 100rpx;
    width: $i-width-full;
    overflow-y: hidden;
}
.INavigationContent {
    position: absolute;
    left: 0; right:0;
    bottom: 0; top:0;
    width: $i-width-full;
    height: 100%;
    
}
.INavigationContentBox {
    position: relative;
    width: $i-width-full;
    height: 100%;
    font-size: $i-font-l;
}

.INavigationBack {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    padding-left: $i-padding-m;
    padding-right: $i-padding-m;
    transition: all .3s;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
    &:active {
        background: v-bind(maskColor);
    }
}
.INavigationContext {
    @include ellipsis(2);
    text-align: center;
    padding: 0 80rpx;
    width: 100%;
}
.INavigationRight {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    box-sizing: border-box;
}
</style>