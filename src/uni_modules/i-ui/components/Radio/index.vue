<template>
	<div ref="radioRef" class="IRadioContainer" @click="handleChangeCheck">
		<span class="IRadioIcon"
			:class="{
                'disabled': isDisabled,
                'IRadioActive' : defaultValue === activeValue,
                'mini': isMini
            }"
			:style="[ checkIconStyle ]"
		>
            <div class="IRadioIconCheck"></div>
        </span>
		<span class="IRadioLabel">
            <template v-if="label">{{label}}</template>
			<slot v-else/>
		</span>
	</div>
</template>
<script lang="ts" setup>
import { mapStores } from "pinia";
import { CheckType } from "../../type.d"
import { ComputedRef, StyleValue, nextTick, ref, computed } from "vue";
import { useThemeStore } from "../../theme";
import { radioProps, RadioPropsType } from "./radio";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "../../common/constants";
import useRadio from "./useRadio";

const props: RadioPropsType = defineProps(radioProps);
const emits = defineEmits([UPDATE_MODEL_EVENT, CHANGE_EVENT]);
const store = mapStores(useThemeStore).themeStoreStore();
const { radioRef, isGroup, radioGroup, size, mini, disabled, modelValue, activeColor } = useRadio(props, emits);

let _default = ref(true);
let defaultValue: ComputedRef<CheckType> = computed(() => {
    if(!isGroup.value && props.modelValue !== undefined) return props.modelValue;
    if(isGroup.value && modelValue.value !== undefined) return modelValue.value;
    return _default.value;
});

const isDisabled = computed(() => props.disabled || disabled.value);
const isMini = computed(() => props.mini || mini.value);

const activeValue = computed(() => props.value || props.active);

const checkColor = computed(() => props.activeColor || activeColor.value || store.theme?.colorPrimaryText);
const checkIconStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
    const style: StyleValue = {
        borderColor: (
            defaultValue.value === activeValue.value ?
                checkColor.value :
                store.theme?.colorTextTertiary
        ) as string
    };
    if(defaultValue.value === activeValue.value) style.backgroundColor = checkColor.value || "";
    if(isDisabled.value) style.backgroundColor = defaultValue.value === activeValue.value ? store.theme?.colorPrimaryBg : store.theme?.colorInfoBg;
    return style;
})
const handleChangeCheck = () => {
    if(isDisabled.value) return;

    if(defaultValue.value === activeValue.value) return;
    if(defaultValue.value !== activeValue.value) {
        if (isGroup.value) {
            radioGroup?.handleRadioItemChange && radioGroup.handleRadioItemChange(activeValue.value);
        }
        else {
            emits(UPDATE_MODEL_EVENT, activeValue.value);
            nextTick( () => emits(CHANGE_EVENT, activeValue.value));
        }
        _default.value = true;
    }
}

const checkCenterColor = computed(() => store.theme?.colorWhite);
defineExpose({
    _ref: radioRef
});
</script>

<style lang="scss">
	.IRadioContainer {
        display: inline-flex;
        min-height: $i-font-xl;
        margin-right: $i-margin-m;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
		.IRadioIcon {
            display: inline-block;
			font-size: $i-font-m;
            width: $i-font-xl;
            height: $i-font-xl;
            border: 1px solid $i-color-border;
            border-radius: 50%;
			transition: all .3s;
            box-sizing: border-box;
            overflow-y: hidden;
            text-align: center;
            line-height: calc($i-font-xl - 2px);
            position: relative;
            text-align: center;
            &.mini {
                transform: scale(0.75);
            }
            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                content: " ";
                width: 0;
                height: 0;
                border-radius: 50%;
                transition: all .3s;
                display: inline-block;
                background-color: v-bind(checkCenterColor);
                z-index: $i-index-xxs;
            }

            &.IRadioActive {
                 &::after {
                     width: 6px;
                     height: 6px;
                 }
            }
            &:active {
                opacity: $i-opacity-l;
            }
            &.disabled {
                opacity: $i-opacity-s;
                &:active {
                    opacity: $i-opacity-s;
                }
            }
		}
		.IRadioLabel {
			margin-left: $i-margin-s;
			font-size: $i-font-xs;
            line-height: $i-font-xl;
		}
	}
</style>