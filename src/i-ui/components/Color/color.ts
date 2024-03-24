import {ColorInfo} from "../../index";
import {ExtractPropTypes, PropType} from "vue";

export const colorProps = {
    modelValue: {
        type: Object as PropType<ColorInfo>,
        default: () => ({})
    },
    disableAlpha: {
        type: Boolean,
        default: false
    },
    disableFields: {
        type: Boolean,
        default: false
    },
    width: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    height: {
        type: [String, Number] as PropType<string | number>,
        default: ''
    },
    navbarHeight: {
        type: Number,
        default: 0
    },
    showButton: {
        type: Boolean,
        default: false
    }
} as const;

export type ColorPropsType = ExtractPropTypes<typeof colorProps>;

export type ColorEmitsType = {
    UPDATE_MODEL_EVENT: (colorInfo: ColorInfo) => void,
    CONFIRM_EVENT: (colorInfo: ColorInfo) => void,
    CANCEL_EVENT: (colorInfo: ColorInfo) => void
}
