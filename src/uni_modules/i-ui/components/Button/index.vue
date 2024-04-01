<template>
    <button class="IButton" :class="IButtonClass" :style="IButtonStyle" ref="buttonRef"
        :open-type="openType" :form-type="formType" :hover-class="hoverClass"
        :disabled="disabled"
		@click="handlerClick"
	>
        <template v-if="isLoading">
            <UILoading :class="defaultSlot ? 'IButtonIconMR8' : ''"/>
            <span class="IButtonLoadingMask"></span>
        </template>
        <template v-else>
            <span class="IButtonIconMR8" v-if="icon">
                <UIIcon :icon="icon"/>
            </span>
            <slot name="icon" v-else/>
        </template>
        <slot></slot>
    </button>
</template>
<script lang="ts" setup>
import {ref, computed, useSlots, Ref, StyleValue} from "vue";
import { buttonProps } from "./button";
import { useThemeStore } from "../../theme";
import UILoading from "../Loading/index.vue"
import UIIcon from "../Icon/index.vue"
import {
    genButtonAnimationClass,
    genButtonSizeClass,
    genButtonTypeClass,

    genButtonSizeStyle,
    genButtonRadiusStyle,

    genColorMap
} from "./style"
import type { SeedKey } from "../../index";
import { CLICK_EVENT, LIGHT_MODE_ID, RADIUS_LIST, RadiusToSeedKey, RadiusType } from "../../common/constants";
import { genColorString, genDarkColor, genPx } from "../../common/style";
import { useStyle } from "../../hooks/useStyle"

const store = useThemeStore();
const props = defineProps(buttonProps);

const emits = defineEmits(["click"]);
const buttonRef: Ref<HTMLElement | null> = ref(null);

// 获取插槽集合
const slots = useSlots();
// 这里获取到的是默认插槽的vnode
const defaultSlot = slots.default && slots.default()[0];
const { colorValue } = useStyle();
// 生成button的class部分
const IButtonClass = computed(() => {
    return [
        ...genButtonAnimationClass(props),
        ...genButtonSizeClass(props),
        ...genButtonTypeClass(props)
    ];
});


let textActiveColor = ref();
let bgActiveColor = ref();
// 生成button的style部分
const IButtonStyle = computed(() => {
    let {
        bgColor, textColor,
        activeTextColor, activeBgColor,
        shadowColor, borderColor,
        _custom, disabled, _type, plain
    } = genColorMap(props);
    const styleOption: StyleValue = {};
    if(!_custom){
        styleOption.color = store.theme?.[textColor as SeedKey] as string;
        if(bgColor) styleOption.backgroundColor = store.theme?.[bgColor as SeedKey] as string;
        if(activeTextColor) textActiveColor.value = store.theme?.[activeTextColor as SeedKey] as string;
        if(activeBgColor) bgActiveColor.value = store.theme?.[activeBgColor as SeedKey] as string;
        if(shadowColor) styleOption.boxShadow = `0 2px 6px ${store.theme?.[shadowColor as SeedKey] as string}`;
        if(borderColor) styleOption.borderColor = store.theme?.[borderColor as SeedKey] as string;
    }
    else {
        const isLight = store.mode == LIGHT_MODE_ID;
        textColor = colorValue.value(textColor as string);
        bgColor = colorValue.value(bgColor as string);
        shadowColor = genColorString(bgColor, 0.15);
        activeBgColor = genDarkColor(bgColor);
        if(plain){
            borderColor = activeBgColor;
            activeBgColor = shadowColor;
            activeTextColor = activeBgColor;
        }
        const _textColor = isLight ? textColor : genDarkColor(textColor);
        const _BgColor = isLight ? bgColor : genDarkColor(bgColor);
        styleOption.color = _textColor;
        if(bgColor) styleOption.backgroundColor = _BgColor;
        if(activeTextColor) {
            const _activeTextColor = isLight ? activeTextColor : genDarkColor(activeTextColor);
            textActiveColor.value = _activeTextColor;
        }
        if(activeBgColor) {
            const _activeBgColor = isLight ? activeBgColor : genDarkColor(activeBgColor);
            bgActiveColor.value = _activeBgColor;
        }
        if(shadowColor) {
            const _shadowColor = isLight ? shadowColor : genDarkColor(shadowColor);
            styleOption.boxShadow = `0 2px 0 ${_shadowColor}`
        };
        if(borderColor) {            
            const _borderColor = isLight ? borderColor : genDarkColor(borderColor);
            styleOption.borderColor = _borderColor;
        }
    }
    if(disabled && _type != "link" && _type != "text"){
        styleOption.backgroundColor = genColorString(bgColor as string, 0.03);
        styleOption.color = store.theme?.[textColor as SeedKey] as string;
        styleOption.borderColor = store.theme?.[borderColor as SeedKey] as string;
    }
    if(borderColor) styleOption.borderStyle = "solid", styleOption.borderWidth = store.theme?.borderWidth + 'px';
    if(RADIUS_LIST.includes(("" + props.radius) as RadiusType)){
        const key: SeedKey = RadiusToSeedKey[("" + props.radius) as RadiusType] as SeedKey;
        styleOption.borderRadius = store.theme?.[key] + 'px';
    }
    if(props.width){
        styleOption.width = genPx(props.width);
    }
    if(props.height){
        styleOption.height = genPx(props.height);
    }
    return [
        genButtonSizeStyle(props),
        genButtonRadiusStyle(props.radius),
        styleOption
    ];
});

const isLoading = computed(() => props.loading);

/* Mouse Event Block */
const handlerClick = (e: Event) => {
    if ( props.disabled || props.loading) return false;
    emits(CLICK_EVENT, e);
};

/* Animation Block */
defineExpose({
    _ref: buttonRef,
    handlerClick,
});

</script>

<style lang="scss" scoped>
    // Button 对 button 的一些处理
    button,
    uni-button,
    uni-button::after,
    .button {
        border: none;
        outline: none;
        padding: 0;
        background-color: transparent;
        border-radius: 0;
        font-size: $i-font-s;
    }
    .IButton {
        position: relative;
        border: none;
        font-size: $i-font-xs;
        transition: all .3s;
        border-radius: 4px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: $i-margin-m;
        &:last-child {
            margin-right: 0;
        }

        .LiveIcon,
        .iconfont {
            font-size: $i-font-xs;
            margin: 0 !important;
            font-weight: $i-weight-m;
        }
        // Plain button
        &.button-type--plain {
            border-width: 1px;
            border-style: solid;
            border-color: #BCC1C2;
        }
        // Dashed border button
        &.button-type-dashed {
            border-width: 1px;
            border-style: dashed !important;
            border-color: #BCC1C2;
        }
        &.button-size-mini,
        &.button-size-xs {
            min-width: 80rpx;
            height: 40rpx;
            padding: 0 10rpx;
        }
        //  Button`s size
        &.button-size-s,
        &.button-size-small {
            min-width: 150rpx;
            height: 48rpx;
            padding: 0 14rpx;
            .LiveIcon,
            .iconfont {
                font-size: $i-font-xxs;
            }
        }
        &.button-size-,
        &.button-size-m,
        &.button-size-normal {
            min-width: 240rpx;
            height: 64rpx;
            padding: 0 24rpx;
        }
        &.button-size-l,
        &.button-size-big {
            min-width: 360rpx;
            height: 80rpx;
            padding: 0 30rpx;
            &,
            .LiveIcon,
            .iconfont {
                font-size: $i-font-m;
            }
        }
        &.button-size-xl {
            min-width: 480rpx;
            height: 90rpx;
            padding: 0 30rpx;
            &,
            .LiveIcon,
            .iconfont {
                font-size: $i-font-m;
            }
        }
        &.button-size-large,
        &.button-size-xxl {
            min-width: 690rpx;
            height: 100rpx;
            padding: 0 30rpx;
            &,
            .LiveIcon,
            .iconfont {
                font-size: $i-font-l;
            }
        }

        // Round button
        &.button-type-round {
            border-radius: 50% !important;
            overflow: hidden;
            padding: 0;
            &.button-size-mini,
            &.button-size-xs {
                min-width: 40rpx;
                max-width: 40rpx;
                min-height: 40rpx;
                max-height: 40rpx;
            }
            &.button-size-s,
            &.button-size-small {
                min-width: 48rpx;
                max-width: 48rpx;
                min-height: 48rpx;
                max-height: 48rpx;
            }
            &.button-size-,
            &.button-size-m,
            &.button-size-normal {
                min-width: 64rpx;
                min-height: 64rpx;
                max-width: 64rpx;
                max-height: 64rpx;
            }
            &.button-size-l,
            &.button-size-big {
                min-width: 80rpx;
                min-height: 80rpx;
                max-width: 80rpx;
                max-height: 80rpx;
            }
            &.button-size-xl {
                min-width: 100rpx;
                min-height: 100rpx;
                max-width: 100rpx;
                max-height: 100rpx;
            }
            &.button-size-xxl,
            &.button-size-large {
                min-width: 120rpx;
                min-height: 120rpx;
                max-width: 120rpx;
                max-height: 120rpx;
            }
        }
        // Link and plan text
        &.button-type-link,
        &.button-type-text {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
        }

        & > .IButtonIconMR8 {
            margin-right: 16rpx !important;
        }

        &.button-ele-block {
            display: flex;
            width: 100%;
        }

        &.button-func-loading {
            opacity: 0.65;
        }

		&.button-animation-,
		&.button-animation-default {
            &:active {
                color: v-bind(textActiveColor) !important;
                background-color: v-bind(bgActiveColor) !important;
            }
		}
    }
</style>