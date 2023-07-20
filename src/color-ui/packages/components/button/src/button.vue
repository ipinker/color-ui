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
import {Size, SIZES} from "../../../common/constant";
import {formatSize} from "../../../utils/style";


const props = defineProps(buttonProps);

const emits = defineEmits(["click"]);
const _ref = ref(null);

const IButtonClass = computed(() => {
    return [
        SIZES.includes(props.size as Size) ? `button-size-${props.size}` : "",
        `button-type-${props.type}`,
        {
            "button-shape-round": props.round
        }
    ];
});

const IButtonStyle = computed(() => {
    return [
        SIZES.includes(props.size as Size) ? "" : formatSize(props.size)
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

const primaryColor = "#16AD90";
const successColor = "#01ef90";
const whiteColor = "#16AD90";
const dangerColor = "#de0920";
const warningColor = "yellow";
const blackColor = "#333333";
const infoColor = "#BCC1C2";
</script>

<style lang="scss" scoped>
    .IButton {
        color: #fff;

        &.button-type-,
        &.button-type-default {
            background-color: v-bind(whiteColor);
        }
        &.button-type-primary {
            background-color: v-bind(primaryColor);
        }
        &.button-type-success {
            background-color: v-bind(successColor);
        }
        &.button-type-warning {
            background-color: v-bind(warningColor);
        }
        &.button-type-danger {
            background-color: v-bind(dangerColor);
        }
        &.button-type-info {
            background-color: v-bind(infoColor);
        }
        &.button-type-text {
            background-color: transparent;
            color: v-bind(blackColor);
        }

        &.button-func-disabled {}
        &.button-func-loading {}
        &.button-func-link {}

    }
</style>