<template>
	<div ref="checkRef" class="ICheckContainer" @click="handleChangeCheck">
		<span class="ICheckIcon"
			:class="{
                'disabled': isDisabled,
                'inactive' : !isActive,
                'mini': isMini
            }"
			:style="[ checkIconStyle ]"
		></span>
		<span class="ICheckLabel">
            <template v-if="label">{{label}}</template>
			<slot v-else/>
		</span>
	</div>
</template>
<script lang="ts" setup>
import { mapStores } from "pinia";
import {CheckType} from "../../index.d"
import {ComputedRef, StyleValue, ref, computed, nextTick} from "vue";
import {useThemeStore} from "../../theme";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "../../common/constants";
import {checkProps, CheckPropsType} from "./check";
import useCheck from "./useCheck";

const props: CheckPropsType = defineProps(checkProps);
const emits = defineEmits([UPDATE_MODEL_EVENT, CHANGE_EVENT]);
const store = mapStores(useThemeStore).themeStoreStore();
const { checkRef, isGroup, checkGroup, size, mini, disabled, modelValue, activeColor, inactiveColor } = useCheck(props, emits);

let _default = ref(false);
let defaultValue: ComputedRef<CheckType> = computed(() => {
    if(isGroup.value) return modelValue.value as boolean;
    if(props.modelValue !== undefined) return props.modelValue;
    return _default.value;
});

const activeColorValue = computed(() => props.activeColor || activeColor.value);
const inactiveColorValue = computed(() => props.inactiveColor || inactiveColor.value);
const isDisabled = computed(() => props.disabled || disabled.value);
const isMini = computed(() => props.mini || mini.value);
const isActive = computed(() => {
    if (isGroup.value) return modelValue.value === true;
    return defaultValue.value === props.active;
});

const checkColor = computed(() => store.theme?.colorPrimaryText);
const checkIconStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
    const _activeColor = activeColorValue.value;
    const _inactiveColor = inactiveColorValue.value;
    const style: StyleValue = {
        borderColor: ( isActive.value ? _activeColor || store.theme?.colorPrimaryText : _inactiveColor || store.theme?.colorTextTertiary ) as string
    };
    if(isDisabled.value){
        style.backgroundColor = isActive.value ?
            (_activeColor ? '' :  store.theme?.colorPrimaryBg) :
            (_inactiveColor ? '' : store.theme?.colorInfoBg) ;
    }
    return style;
})
const handleChangeCheck = () => {
    if (isDisabled.value) return;
    if (isGroup.value) return checkGroup?.handleCheckItemChange && checkGroup.handleCheckItemChange(props.value);
    emits(UPDATE_MODEL_EVENT, defaultValue.value === props.active ? props.inactive : props.active);
    nextTick(() => emits(CHANGE_EVENT, defaultValue.value === props.active ? props.inactive : props.active));
    _default.value = !_default.value;
}
defineExpose({
    _ref: checkRef
});
</script>

<style lang="scss">
	.ICheckContainer {
        display: inline-flex;
        min-height: $i-font-xl;
        margin-right: $i-margin-m;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		.ICheckIcon {
			display: inline-block;
			font-size: $i-font-m;
			transition: all .3s;
            width: $i-font-xl;
            height: $i-font-xl;
            position: relative;
            border: 1px solid $i-color-border;
            border-radius: $i-radius-xs;
            &.mini {
                transform: scale(0.75);
            }
            &::after {
                content: "";
                background-color: v-bind(checkColor);
                width: 7.5px;
                height: 2px;
                position: absolute;
                top: 9.5px;
                left: 1.5px;
                transform: rotate(40deg);
                border-radius: $i-radius-xs;
            }
            &::before {
                content: "";
                background-color: v-bind(checkColor);
                width: 12px;
                height: 2px;
                position: absolute;
                top: 7.5px;
                left: 5.5px;
                transform: rotate(-45deg);
                border-radius: $i-radius-xs;
            }
            &.inactive {
                &::before {
                    opacity: 0;
                }
                &::after {
                    opacity: 0;
                }
            }
            &:active {
                opacity: $i-opacity-m;
            }
            &.disabled {
                opacity: $i-opacity-s;
                &:active {
                    opacity: $i-opacity-s;
                }
            }
		}
		.ICheckLabel {
			margin-left: $i-margin-s;
			font-size: $i-font-xs;
            line-height: $i-font-xl;
		}
	}
</style>