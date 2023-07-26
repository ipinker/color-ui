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

const store = useThemeStore();
const props = defineProps(buttonProps);

const emits = defineEmits(["click"]);
const _ref = ref(null);

const IButtonClass = computed(() => {
    return [
        SIZES.includes(props.size as Size) ? `button-size-${props.size}` : "",
        `button-type-${props.type}`,
        {
            "button-shape-round": props.round,
            "button-type-dashed": props.type === "dashed",
            "button-style-plain": props.plain
        }
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

const primaryColor = computed(() => store.theme?.colorPrimary);
const successColor = computed(() => store.theme?.colorSuccess);
const successTextColor = computed(() => store.theme?.colorSuccessText);
const whiteColor = computed(() => store.theme?.colorWhite);
const dangerColor = computed(() => store.theme?.colorError);
const warningColor = computed(() => store.theme?.colorWarning);
const fontColor = computed(() => store.theme?.colorText);
const infoColor = computed(() => store.theme?.colorInfo);
const borderColor = computed(() => store.theme?.colorBorder);
const shadowColor = computed(() => store.theme?.colorShadowBase);
const boxShadowWidth = computed(() => store.theme?.boxShadowWidth + "px");
</script>

<style lang="scss" scoped>
    .IButton {
        color: v-bind(whiteColor);
        box-shadow: 0 v-bind(boxShadowWidth) 0 v-bind(shadowColor);

        &.button-type-,
        &.button-type-default,
        &.button-type-dashed {
            color: v-bind(fontColor);
            border: 1px solid v-bind(borderColor);
        }
        &.button-type-primary {
            background-color: v-bind(primaryColor);
            &.button-style-plain {
                color: v-bind(primaryColor);
                border: 1px solid v-bind(primaryColor);
            }
        }
        &.button-type-success {
            background-color: v-bind(successColor);
            &.button-style-plain {
                color: v-bind(successTextColor);
                border: 1px solid v-bind(successColor);
            }
        }
        &.button-type-warning {
            background-color: v-bind(warningColor);
            &.button-style-plain {
                color: v-bind(warningColor);
                border: 1px solid v-bind(warningColor);
            }
        }
        &.button-type-danger {
            background-color: v-bind(dangerColor);
            &.button-style-plain {
                color: v-bind(dangerColor);
                border: 1px solid v-bind(dangerColor);
            }
        }
        &.button-type-info {
            background-color: v-bind(infoColor);
            &.button-style-plain {
                color: v-bind(infoColor);
                border: 1px solid v-bind(infoColor);
            }
        }
        &.button-style-plain {
            background-color: transparent;
        }
        &.button-type-text {
            background-color: transparent;
            color: v-bind(fontColor);
        }
        &.button-type-dashed {
            border-style: dashed;
        }

        &.button-func-disabled {}
        &.button-func-loading {}
        &.button-func-link {}

    }
</style>