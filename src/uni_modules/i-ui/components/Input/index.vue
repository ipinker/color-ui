<template>
    <view class="IInputContainer padding-s radius-m" :style="[inputStyle, styleOption]" :class="{'flex-column' : type == 'textarea', border}">
        <textarea class="ITextarea" :value="modelValue"
            :password="password"
            :placeholder="placeholder"
            :placeholder-style="placeholderStyle"
            :placeholder-class="placeholderClass"

            :disabled="disabled"
            :maxlength="+maxlength"

            :focus="focus"
            :cursor="cursor"
            :cursor-color="cursorColor"
            :auto-height="autoHeight"

            :selection-start="selectionStart"
            :selection-end="selectionEnd"

            :adjust-position="adjustPosition"

            :confirm-type="confirmType"
            :confirm-hold="confirmHold"

            :inputmode="inputmode"

            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @confirm="handleConfirm"
            @keyboardheightchange="handleKeyboardheightchange"
            @linechange="handleLinechange"
            v-if="type == 'textarea'"
        />
        <input class="IInput" :value="modelValue" :type="type"

            :password="password"
            :placeholder="placeholder"
            :placeholder-style="placeholderStyle"
            :placeholder-class="placeholderClass"

            :disabled="disabled"
            :maxlength="+maxlength"

            :focus="focus"
            :cursor="cursor"
            :cursor-color="cursorColor"

            :selection-start="selectionStart"
            :selection-end="selectionEnd"

            :adjust-position="adjustPosition"

            :confirm-type="confirmType"
            :confirm-hold="confirmHold"

            :inputmode="inputmode"

            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @confirm="handleConfirm"
            @keyboardheightchange="handleKeyboardheightchange"

            v-else
        />
        <text class="IWordLimit text-xs"
            :class="{'ITextareaWordLimit': type == 'textarea' && autoHeight }"
            :style="[placeHolder]"
            v-if="showLimit"
        >{{modelValue?.length}}/{{maxlength}}</text>
    </view>
</template>

<script setup lang="ts">
    import { StyleValue } from "vue";
    import { useThemeStore } from "../../theme";
    import { useStyle } from '../../hooks/useStyle';
    import { CHANGE_EVENT, UPDATE_MODEL_EVENT, CONFIRM_EVENT } from "../../common/constants";
    import { genPx } from '../../common/style';
    import { InputPropsType, inputProps } from "./input"
    const props: InputPropsType = defineProps(inputProps);

    const emits = defineEmits([UPDATE_MODEL_EVENT, CHANGE_EVENT, CONFIRM_EVENT, "blur", "focus", "keyboardheightchange", "linechange"]);
    const { placeHolder } = useStyle();
    const theme = useThemeStore().theme;
    const placeholderColor = computed(() => theme?.colorTextQuaternary);
    const borderColor = computed(() => theme?.colorBorder);
    const textareaHeight = props.autoHeight ? "auto" : "100%";

    const inputStyle = computed(() => {
        const style: StyleValue = {};
        if(props.width) style.width = genPx(props.width);
        if(props.height) style.height = genPx(props.height);
        return style;
    })

    const handleInput = (e: any): void => {
        const value: string = e.detail.value || "";
        emits(UPDATE_MODEL_EVENT, value);
        emits(CHANGE_EVENT, value);
    }

    const handleConfirm = (e: any): void => {
        const value: string = e.detail.value || "";
        emits(CONFIRM_EVENT, value);
    }

    const handleBlur = (e: any): void => {
        const value: string = e.detail.value || "";
        emits('blur', value);
    }

    const handleFocus = (e: any): void => {
        const value: string = e.detail.value || "";
        emits('focus', value);
    }

    const handleKeyboardheightchange = (e: any): void => {
        const value: string = e.detail.value || "";
        emits('keyboardheightchange', value);
    }

    const handleLinechange = (e: any): void => {
        const value: string = e.detail.value || "";
        emits('linechange', value);
    }

</script>

<style lang="scss">
.InputPlaceholderClass {
    color: v-bind(placeholderColor);
}
.IInputContainer {
    display: inline-flex;
    position: relation;
    height: inherit;
    &.border {
        border: 1px solid v-bind(borderColor);
    }
    &.flex-column {
        align-items: flex-end;
    }
    .IInput {
        height: 100%;
        flex: 1;
    }
    .IWordLimit {
        margin: auto 0;
        line-height: $i-line-xs;
        &.ITextareaWordLimit {
            margin: 0;
        }
    }
    .ITextarea {
        width: 100%;
        flex: 1;
        min-height: $i-line-l;
        line-height: $i-line-l;
        height: v-bind(textareaHeight);
    }
}
</style>