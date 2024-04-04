<template>
    <span class="margin-rs flex-justify-center ISwitchContainer" :class="{ 'mini' : mini }">
        <span class="ISwitchInactiveLabel margin-rs" :style="[!defaultValue?primaryText:{}]" v-if="inactiveLabel || useLabel">
            {{ inactiveLabel }}
            <slot name="inactiveLabel" v-if="!inactiveLabel"/>
        </span>

        <span class="ISwitchContent" :class="{'ISwitchActiveIcon' : defaultValue, 'disabled': disabled}" @click="handleSwitchChange"></span>

        <span class="ISwitchActiveLabel margin-ls" :style="[defaultValue?primaryText:{}]" v-if="activeLabel || useLabel">
            {{ activeLabel }}
            <slot name="activeLabel" v-if="!activeLabel"/>
        </span>
    </span>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from "vue"
import { mapStores } from "pinia"
import { switchProps, SwitchPropsType } from "./switch";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "../../common/constants";
import { useThemeStore } from "../../theme"
const props: SwitchPropsType = defineProps(switchProps);
const emits = defineEmits([CHANGE_EVENT, UPDATE_MODEL_EVENT]);
const store = mapStores(useThemeStore).themeStoreStore();
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
        min-width: 54px;
        height: 30px;
        .ISwitchActiveLabel,
        .ISwitchInactiveLabel {
            line-height: 30px;
            font-size: $i-font-s;
            transition: color .3s;
        }
        .ISwitchContent {
            display: inline-block;
            width: 52px;
            height: 30px;
            background: v-bind(inactiveColorValue);
            border-radius: 15px;
            transition: all .3s;
            border: 1px solid $i-color-border;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            &::before {
                content: " ";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 49px;
                height: 27px;
                background-color: v-bind(inactiveColorValue);
                display: inline-block;
                transition: all .3s;
                border-radius: 15px;
            }
            &::after {
                content: " ";
                position: absolute;
                left: 1px;
                top: 1.2px;
                width: 26px;
                height: 26px;
                display: inline-block;
                background-color: v-bind(containerColor);
                border-radius: 50%;
                transition: all .3s;
                box-shadow: 0 2px 4px 0 v-bind(shadowColor);
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
                    left: 23.5px;
                }
            }
        }
        &.mini {
            min-width: 37px;
            height: 21px;
            .ISwitchInactiveLabel,
            .ISwitchActiveLabel {
                line-height: 21px;
                font-size: $i-font-xxs;
            }
            .ISwitchContent {
                width: 35px;
                height: 21px;
                border-radius: 10.5px;
                border: 0.6px solid $i-color-border;
                &::before {
                    width: 32px;
                    height: 18px;
                    border-radius: 10.5px;
                }
                &::after {
                    width: 18px;
                    height: 18px;
                    left: 1px;
                    top: 1px;
                    box-shadow: 0 1.5px 3px 0 v-bind(shadowColor);
                }
                &.ISwitchActiveIcon {
                    &::before {
                        width: 0;
                        height: 0;
                    }
                    &::after {
                        left: 15px;
                    }
                }
            }
        }
    }
</style>