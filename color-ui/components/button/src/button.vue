<template>
    <button class="IButton" :class="IButtonClass" :style="IButtonStyle" ref="_ref" 
		@mousedown="onMouseEvent" @mouseup="onMouseEvent"
		@touchstart="onMouseEvent" @touchend="onMouseEvent"
		@click="handlerClick"
	>
        <template v-if="isLoading">
            <ILoading :class="defaultSlot ? 'IButtonIconMR8' : ''"/>
            <span class="IButtonLoadingMask"></span>
        </template>
        <template v-else>
            <span class="iconfont" :class="[props.icon, defaultSlot ? 'IButtonIconMR8' : '']" v-if="props.icon"></span>
            <slot name="icon" :class="[iconSlot&&defaultSlot ? 'IButtonIconMR8' : '']" v-else></slot>
        </template>
        <slot></slot>
    </button>
</template>
<script lang="ts">
export default {
    name: "IButton"
}
</script>
<script lang="ts" setup>
import { ref, computed, useSlots } from "vue";
import { buttonProps } from "./button";
import "../style";
import {genAlphaColor, useThemeStore, ILoading} from "../../../index";
import {
    genButtonAnimationClass,
    genButtonLoadingClass,
    genButtonRadiusClass,
    genButtonSizeClass,
    genButtonTypeClass,

    genButtonSizeStyle,
    genButtonRadiusStyle,
    genColorStyle
} from"../style/genStyle"
import {TinyColor} from "@ctrl/tinycolor";
import {
    useButtonTouch,
    useButtonMouse
} from "./useButton"

const store = useThemeStore();
const props = defineProps(buttonProps);

const emits = defineEmits(["click"]);
const _ref = ref(null);

// 获取插槽集合
const slots = useSlots();
// 这里获取到的是默认插槽的vnode
const defaultSlot = slots.default && slots.default()[0];
// 这里获取到的是图标插槽的vnode
const iconSlot = slots.icon && slots.icon()[0];

// 生成button的class部分
const IButtonClass = computed(() => {
    return [
        ...genButtonAnimationClass(props),
        ...genButtonLoadingClass(props),
        ...genButtonRadiusClass(props.radius),
        ...genButtonSizeClass(props),
        ...genButtonTypeClass(props)
    ];
});


const whiteColor = computed(() => store.theme?.colorWhite);
const fontColor = computed(() => store.theme?.colorText);
const borderColor = computed(() => store.theme?.colorBorder);
const shadowColor = computed(() => store.theme?.colorShadowBase);
const boxShadowWidth = computed(() => store.theme?.boxShadowWidth + "px");

const primaryColor = computed(() => store.theme?.colorPrimary);
const primaryTextColor = computed(() => store.theme?.colorPrimaryText);
const primaryShadowColor = computed(() => store.theme?.colorPrimaryShadow);

const successColor = computed(() => store.theme?.colorSuccess);
const successTextColor = computed(() => store.theme?.colorSuccessText);
const successShadowColor = computed(() => store.theme?.colorSuccessShadow);

const dangerColor = computed(() => store.theme?.colorError);
const dangerTextColor = computed(() => store.theme?.colorErrorText);
const dangerShadowColor = computed(() => store.theme?.colorErrorShadow);
const warningColor = computed(() => store.theme?.colorWarning);
const warningTextColor = computed(() => store.theme?.colorWarningText);
const warningShadowColor = computed(() => store.theme?.colorWarningShadow);
const infoColor = computed(() => store.theme?.colorInfo);
const infoTextColor = computed(() => store.theme?.colorInfoText);
const infoShadowColor = computed(() => store.theme?.colorInfoShadow);

const disabledColor = computed(() => store.theme?.colorFillQuaternary);
const disabledTextColor = computed(() => store.theme?.colorTextQuaternary);
const disabledShadowColor = computed(() => store.theme?.colorFillQuaternary);

const radiusDefault = computed(() => store.theme?.borderRadius + 'px');
const radiusLS = computed(() => store.theme?.borderRadiusXS + 'px');
const radiusSM = computed(() => store.theme?.borderRadiusSM + 'px');
const radiusLG = computed(() => store.theme?.borderRadiusLG + 'px');

// 生成button的style部分
const IButtonStyle = computed(() => {
    return [
        ...genButtonSizeStyle(props),
        ...genButtonRadiusStyle(props.radius),
        ...genColorStyle(props),
        props.bg ? {
           "box-shadow" : `0 ${boxShadowWidth.value} 0 ${new TinyColor(props.bg).setAlpha(0.1).toRgbString()}`
        } : {}
    ];
});

const isLoading = computed(() => props.loading);

/* Mouse Event Block */ 

const handlerClick = (e: Event) => {
    if ( props.disabled || props.loading) return false;
    emits("click", e);
};

/* Animation Block */
let xPos = ref("0");
let yPos = ref("0");
let offsetLeft: number, offsetTop: number, pageX: number, pageY: number;
const onMouseEvent = (event : MouseEvent | TouchEvent) => {
    const { type } = event;
    switch (type) {
        case "touchstart":
		    pageX = pageY = 0;
            useButtonTouch(event, 1);
            break;
        case "touchend":
            useButtonTouch(event, 0);
            break;
        case "mousedown":
		    pageX = pageY = 0;
            useButtonMouse(event, 1);
            break;
        case "mouseup":
            useButtonMouse(event, 0);
            break;
        default:
            break;
    }


    // console.log(event)
	// if(event){
	// 	const offset = event?.target || event?.currentTarget;
	// 	const page = (event?.pageX && event?.pageY) ? event : event?.changedTouches[0];
	// 	offsetLeft = offset.offsetLeft; offsetTop = offset.offsetTop;
	// 	pageX = page.pageX || pageX; pageY = page.pageY || pageY;
	// 	xPos.value = (Math.abs(pageX - offsetLeft) || 0) + "px";
	// 	yPos.value = (Math.abs(pageY - offsetTop) || 0) + "px";
    //     console.log(offsetLeft, offsetTop)
    //     console.log(pageX, pageY)
    //     console.log(xPos, yPos)
	// }
}

defineExpose({
    _ref: _ref,
    handlerClick,
});

</script>

<style lang="scss" scoped>
    @import "../../../styles/common.scss";
    @mixin ButtonShadow ($color: v-bind(shadowColor)) {
        box-shadow: 0 v-bind(boxShadowWidth) 0 if($color, $color, v-bind(shadowColor));
    }
    // Button 对 button 的一些处理
    .IButton {
        position: relative;
        border: none;
        @include ButtonShadow;
        text-align: center;
        font-size: 14px;
        color: v-bind(whiteColor);

        .iconfont {
            font-size: 14px;
            margin: 0 !important;
        }
        // 默认样式
        &.button-type-,
        &.button-type-default,
        &.button-type-dashed {
            color: v-bind(fontColor);
            border: 1px solid v-bind(borderColor);
        }
        // 默认情况下的 plain
        &.button-type--plain {
            border: 1px solid v-bind(borderColor);
        }

        &.button-type-primary {
            background-color: v-bind(primaryColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(primaryShadowColor));
            &.button-type--plain {
                color: v-bind(primaryColor);
                border: 1px solid v-bind(primaryColor);
            }
        }
        &.button-type-success {
            background-color: v-bind(successColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(successShadowColor));
            &.button-type--plain {
                color: v-bind(successTextColor);
                border: 1px solid v-bind(successColor);
            }
        }
        &.button-type-warning {
            background-color: v-bind(warningColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(warningShadowColor));
            &.button-type--plain {
                color: v-bind(warningTextColor);
                border: 1px solid v-bind(warningColor);
            }
        }
        &.button-type-danger {
            background-color: v-bind(dangerColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(dangerShadowColor));
            &.button-type--plain {
                color: v-bind(dangerTextColor);
                border: 1px solid v-bind(dangerColor);
            }
        }
        &.button-type-info {
            background-color: v-bind(infoColor);
            color: v-bind(whiteColor);
            @include ButtonShadow(v-bind(infoShadowColor));
            &.button-type--plain {
                color: v-bind(infoTextColor);
                border: 1px solid v-bind(infoColor);
            }
        }
        &.button-type--plain {
            background-color: transparent;
        }
        &.button-type-dashed {
            border-style: dashed;
        }
        &.button-size-small {
            height: 24px;
            padding: 0 7px;
            line-height: 24px;
            .iconfont {
                font-size: 12px;
            }
        }
        &,
        &.button-size-,
        &.button-size-normal {
            height: 32px;
            padding: 0 15px;
            line-height: 32px;
        }
        &.button-size-big {
            height: 40px;
            padding: 0 15px;
            line-height: 40px;
            &,
            .iconfont {
                font-size: 16px;
            }
        }
        &.button-type-round {
            border-radius: 50% !important;
            overflow: hidden;
            padding: 0;
            &.button-size-small {
                width: 24px;
                height: 24px;
            }
            &.button-size-normal {
                width: 32px;
                height: 32px;
            }
            &.button-size-big {
                width: 40px;
                height: 40px;
            }
        }

        &.button-type-link,
        // 文字按钮, 禁止各种花里胡哨
        &.button-type-text {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
            color: v-bind(fontColor);
            box-shadow: none !important;
        }
        &.button-type-link {
            color: v-bind(primaryTextColor);
        }

        // 权重最高
        &.button-type-disabled {
            color: v-bind(disabledTextColor);
            background-color: v-bind(disabledColor);
            border: 1px solid v-bind(borderColor);
            @include ButtonShadow(v-bind(disabledShadowColor));
        }
        // 边框特殊line-height
        &.button-type-,
        &.button-type-default,
        &.button-type-dashed,
        &.button-type--plain,
        &.button-type-disabled {
            &.button-size-small {
                line-height: 22px;
            }
            &.button-size-normal {
                line-height: 30px;
            }
            &.button-size-big {
                line-height: 38px;
            }
        }

        & > .IButtonIconMR8 {
            margin-right: 6px !important;
        }
        &,
        &.button-radius-,
        &.button-radius-default {
            border-radius: v-bind(radiusDefault);
        }
        &.button-radius-xs {
            border-radius: v-bind(radiusLS);
        }
        &.button-radius-sm {
            border-radius: v-bind(radiusSM);
        }
        &.button-radius-lg {
            border-radius: v-bind(radiusLG);
        }
        &.button-ele-block {
            display: block;
            width: 100%;
        }

        &.button-func-loading {
            opacity: 0.65;
        }
		
		&.button-animation-ripple {
			overflow: hidden;
			&::before {
				content: "";
				pointer-events: none;
				position: absolute;
				left: v-bind(xPos);
				top: v-bind(yPos);
				transform: translate(-50%, -50%);
				width: 0;
				height: 0;
				background-color: rgba(10, 10, 10);
				border-radius: 50%;
				transition: width 0.45s ease-in-out, height 0.45s ease-in-out;
				transform-origin: center;
				opacity: 0;
				z-index: 2;
			}
			&:active {
				&::before {
					width: 100vh;
					height: 100vh;
					opacity: 0.35;
				}
			}
		}
		&.button-animation-,
		&.button-animation-opacity,
		&.button-animation-default {
			&:active {
				opacity: 0.65;
			}
		}

    }
</style>