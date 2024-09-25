<template>
    <div class="INavigationBarContainer" :style="[{height: navigateHeight + 'px'}]">
        <div class="INavigationBarRelative"></div>
        <div class="INavigationBar" :style="[{ height: navigateHeight +'px', opacity: opacity || 1 }, styleExt]">
            <div class="INavigationStatus" :style="[{height: statusBarHeight+'px'}, statusBarBackground]" v-if="!isInBodyWithStatusBar"></div>
            <div class="INavigationBody" :style="[{ height: contentHeightValue + 'px'}, navigationBarBackground]" v-if="custom">
                <slot />
            </div>
            <div class="INavigationBody" :style="[{ height: contentHeightValue + 'px' }, navigationBarBackground]" v-else>
                <div class="INavigationContent" :class="{'StatusBarPaddingTop' : isInBodyWithStatusBar}">
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
                        <div class="INavigationRight flex-align-center flex-justify-end" :style="[{paddingRight: paddingRight + 'px'}]"><slot name="ext"></slot></div>
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
    import { Config }from "../../index"
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
            const gradientType = props.gradientType || Config.getOption()?.navigationBarProps?.gradientType;
            const gradientValue = props.gradientValue || Config.getOption()?.navigationBarProps?.gradientValue;
            if (gradientType && gradientType != "none") bgValue = gradientType+'-gradient('+gradientValue+')';
            else bgValue = props.bgColor || (props.primary ? themeStore.theme?.colorPrimary : themeStore.theme?.colorBgContainer) || "";
            return {
                background : bgValue
            };
        }),
        navigationTextColor = computed(() => {
            let colorValue = "";
            const gradientType = props.gradientType || Config.getOption()?.navigationBarProps?.gradientType;
            if (gradientType && gradientType != "none") colorValue = themeStore.theme?.colorWhiteTextBase || "";
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
    const isInBodyWithStatusBar = computed(() => {
        if(props.statusBarInBody === undefined) return Config.getOption()?.navigationBarProps?.statusBarInBody
        return props.statusBarInBody
    })
    const contentHeightValue = computed(() => {
        if(isInBodyWithStatusBar.value) return uni.upx2px(+props.height) + statusBarHeight.value;
        return uni.upx2px(+props.height)
    })
    const navigateHeight = computed(() => contentHeightValue.value + (isInBodyWithStatusBar.value ? 0 : statusBarHeight.value));
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
    width: 1px;
}
.INavigationBarRelative {
    height: calc(50px + var(--status-bar-height));
}
.INavigationBar {
    position: fixed;
    top: 0; left: 0;
    z-index: $i-index-l;
    width: $i-width-full;
    overflow: hidden;
}

.INavigationStatus {
    width: $i-width-full;
}
.INavigationBody  {
    position: relative;
    height: 50px;
    width: $i-width-full;
    overflow-y: hidden;
}
.INavigationContent {
    position: absolute;
    left: 0; right:0;
    bottom: 0; top:0;
    width: $i-width-full;
    height: 100%;
    &.StatusBarPaddingTop {
        box-sizing: border-box;
        padding-top: var(--status-bar-height)
    }
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
    padding: 0 40px;
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