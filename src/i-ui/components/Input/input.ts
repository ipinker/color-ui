import { ExtractPropTypes, PropType } from "vue";

export type InputModeType = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
export type InputConfirmType = "done" | "send" | "search" | "next" | "go";
export type InputType = "text" | "number" | "digit" | "tel" | "nickname" | "textarea";

export const inputProps = {
    modelValue: String,
    password: Boolean,
    placeholder: String,
    disabled: Boolean,
    focus: Boolean,
    cursor: Number,
    cursorColor: String,
    maxlength: {
        type: [Number, String],
        default: 120
    },
    selectionStart: Number,
    selectionEnd: Number,
    placeholderStyle: String,
    adjustPosition: {
        type: Boolean,
        default: true
    },
    placeholderClass: {
        type: String,
        default: "InputPlaceholderClass"
    },
    type: {
        type: String as PropType<InputType>,
        default: "text"
    },
    confirmType: String as PropType<InputConfirmType>,
    confirmHold: Boolean,
    inputmode: {
        type: String as PropType<InputModeType>,
        default: "text"
    },
    showLimit: Boolean,
    autoHeight: Boolean,
    border: Boolean,

    styleOption: Object,
    width: [String, Number],
    height: [String, Number]
};

export type InputInstanceType = typeof inputProps;

export type InputPropsType = ExtractPropTypes<InputInstanceType>;

export type InputEmitsType = {
    
}