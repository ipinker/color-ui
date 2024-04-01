<template>
    <span class="margin-rs flex-justify-center ISwitchContainer" :class="{ 'mini' : mini }">
        <span class="ISwitchInactiveLabel margin-rs" :style="[!defaultValue?primaryText:{}]" v-if="inactiveLabel || useLabel">
            {{ inactiveLabel }}
            <slot name="activeLabel" v-if="!inactiveLabel"/>
        </span>

        <span class="ISwitchContent" :class="{'ISwitchActiveIcon' : defaultValue, 'disabled': disabled}" @click="handleSwitchChange"></span>

        <span class="ISwitchActiveLabel margin-ls" :style="[defaultValue?primaryText:{}]" v-if="activeLabel || useLabel">
            {{ activeLabel }}
            <slot name="activeLabel" v-if="!activeLabel"/>
        </span>
    </span>
</template>

<script lang="ts" setup>
import { switchProps, SwitchPropsType } from "./switch";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "../../common/constants";
import { useThemeStore } from "../../theme"
const props: SwitchPropsType = defineProps(switchProps);
const emits = defineEmits([CHANGE_EVENT, UPDATE_MODEL_EVENT]);
const store = useThemeStore();
const switchRef = ref(null);

const _default = ref(false);
const defaultValue = computed(() => {
    if(props.modelValue !== undefined) return props.modelValue;
    return _default.value;
})

const primaryText = computed(() => ({ color: store.theme?.colorPrimaryText }));
const activeColorValue = computed(() => props.activeColor || store.theme?.colorPrimary);
const inactiveColorValue = computed(() => props.inactiveColor || store.theme?.colorFillQuaternary);
const containerColor = computed(() => store.theme?.colorBgContainer);
const shadowColor = computed(() => store.theme?.colorShadowBase);

const handleSwitchChange = () => {
    if(props.disabled) return;
    const target = !defaultValue.value;
    emits(UPDATE_MODEL_EVENT, target);
    nextTick(() => emits(CHANGE_EVENT, target));
    _default.value = !_default.value;
}

defineExpose({
    _ref: switchRef
})
</script>

<style lang="scss">
    .ISwitchContainer {
        display: inline-flex;
        min-width: 104rpx;
        height: 60rpx;
        .ISwitchActiveLabel,
        .ISwitchInactiveLabel {
            line-height: 60rpx;
            font-size: $i-font-s;
            transition: color .3s;
        }
        .ISwitchContent {
            display: inline-block;
            width: 104rpx;
            height: 60rpx;
            background: v-bind(inactiveColorValue);
            border-radius: 30rpx;
            transition: all .3s;
            border: 2rpx solid $i-color-border;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            &::before {
                content: " ";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 98rpx;
                height: 54rpx;
                background-color: v-bind(inactiveColorValue);
                display: inline-block;
                transition: all .3s;
                border-radius: 30rpx;
            }
            &::after {
                content: " ";
                position: absolute;
                left: 2rpx;
                top: 2rpx;
                width: 52rpx;
                height: 52rpx;
                display: inline-block;
                background-color: v-bind(containerColor);
                border-radius: 50%;
                transition: all .3s;
                box-shadow: 0 4rpx 8rpx 0 v-bind(shadowColor);
            }
            &.disabled {
                opacity: $i-opacity-l;
                &::before {
                    opacity: $i-opacity-l;
                }
                &::after {
                    opacity: $i-opacity-l;
                }
            }
            &.ISwitchActiveIcon {
                
                background-color: v-bind(activeColorValue);
                &::before {
                    width: 0;
                    height: 0;
                    background-color: transparent;
                }
                &::after {
                    left: 47rpx;
                }
            }
        }
        &.mini {
            min-width: 70rpx;
            height: 42rpx;
            .ISwitchInactiveLabel,
            .ISwitchActiveLabel {
                line-height: 42rpx;
                font-size: $i-font-xxs;
            }
            .ISwitchContent {
                width: 70rpx;
                height: 42rpx;
                border-radius: 21rpx;
                border: 1.2rpx solid $i-color-border;
                &::before {
                    width: 64rpx;
                    height: 36rpx;
                    border-radius: 21rpx;
                }
                &::after {
                    width: 36rpx;
                    height: 36rpx;
                    left: 2rpx;
                    top: 2rpx;
                    box-shadow: 0 3rpx 6rpx 0 v-bind(shadowColor);
                }
                &.ISwitchActiveIcon {
                    &::before {
                        width: 0;
                        height: 0;
                    }
                    &::after {
                        left: 30rpx;
                    }
                }
            }
        }
    }
</style>