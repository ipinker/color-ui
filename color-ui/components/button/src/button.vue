<template>
    <button class="IButton" ref="_ref" @click="handlerClick" :class="IButtonClass" :style="IButtonStyle">
        <span></span>
        <slot name="icon"></slot>
        <slot></slot>
    </button>
</template>
<script lang="ts">
export default {
    name: "IButton"
}
</script>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { buttonProps } from "./button";
import "../style";
import { useThemeStore } from "../../../index"
import {Size, SIZES} from "../../../common/constant";
import { getSize } from "../../../utils/style";
import {
    genButtonAnimationClass,
    genButtonLoadingClass,
    genButtonRadiusClass,
    genButtonSizeClass,
    genButtonTypeClass
} from"../style/genStyle"

const store = useThemeStore();
const props = defineProps(buttonProps);
type PropsType = typeof props;

const emits = defineEmits(["click"]);
const _ref = ref(null);

const IButtonClass = computed(() => {
    return [
        SIZES.includes(props.size as Size) ? `button-size-${props.size}` : "",
        `button-type-${props.type}`,
        {
            "button-shape-round": props.round,
            "button-type-dashed": props.type === "dashed",
            "button-type--plain": props.plain
        },
        genButtonAnimationClass(props),
        genButtonLoadingClass(props),
        genButtonRadiusClass(props),
        genButtonSizeClass(props),
        genButtonTypeClass(props)
    ];
});

const IButtonStyle = computed(() => {
    return [
        SIZES.includes(props.size as Size) ? "" : getSize(props.size)
    ];
});

const handlerClick = (e: Event) => emits("click", e);

defineExpose({
    _ref: _ref,
    // _size: ,
    // _type: ,
    // _disabled:
    handlerClick,
});

const whiteColor = computed(() => store.theme?.colorWhite);
const fontColor = computed(() => store.theme?.colorText);
const borderColor = computed(() => store.theme?.colorBorder);
const shadowColor = computed(() => store.theme?.colorShadowBase);
const boxShadowWidth = computed(() => store.theme?.boxShadowWidth + "px");

const primaryColor = computed(() => store.theme?.colorPrimary);
const primaryTextColor = computed(() => store.theme?.colorPrimaryText);
const successColor = computed(() => store.theme?.colorSuccess);
const successTextColor = computed(() => store.theme?.colorSuccessText);
const dangerColor = computed(() => store.theme?.colorError);
const dangerTextColor = computed(() => store.theme?.colorErrorText);
const warningColor = computed(() => store.theme?.colorWarning);
const warningTextColor = computed(() => store.theme?.colorWarningText);
const infoColor = computed(() => store.theme?.colorInfo);
const infoTextColor = computed(() => store.theme?.colorInfoText);

const disabledColor = computed(() => store.theme?.colorFillQuaternary);
const disabledTextColor = computed(() => store.theme?.colorTextQuaternary);
</script>

<style lang="scss" scoped>
    // Button 对 button 的一些处理
    .IButton {
        border: none;
        color: v-bind(whiteColor);
        box-shadow: 0 v-bind(boxShadowWidth) 0 v-bind(shadowColor);
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
            &.button-type--plain {
                color: v-bind(primaryColor);
                border: 1px solid v-bind(primaryColor);
            }
        }
        &.button-type-success {
            background-color: v-bind(successColor);
            &.button-type--plain {
                color: v-bind(successTextColor);
                border: 1px solid v-bind(successColor);
            }
        }
        &.button-type-warning {
            background-color: v-bind(warningColor);
            &.button-type--plain {
                color: v-bind(warningTextColor);
                border: 1px solid v-bind(warningColor);
            }
        }
        &.button-type-danger {
            background-color: v-bind(dangerColor);
            &.button-type--plain {
                color: v-bind(dangerTextColor);
                border: 1px solid v-bind(dangerColor);
            }
        }
        &.button-type-info {
            background-color: v-bind(infoColor);
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
        &.button-type-round {
            border-radius: 50%;
        }

        &.button-type-link,
        // 文字按钮, 禁止各种花里胡哨
        &.button-type-text {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
            color: v-bind(fontColor);
        }
        &.button-type-link {
            color: v-bind(primaryTextColor);
        }

        // 权重最高
        &.button-type-disabled {
            color: v-bind(disabledTextColor);
            background-color: v-bind(disabledColor);
            border: 1px solid v-bind(borderColor);
        }


        &.button-func-loading {}

    }
</style>