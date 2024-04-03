import {CheckType} from "../../index.d";
import {ExtractPropTypes, PropType} from "vue";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "../../common/constants";
import {SizeType} from "../../common/constants";

export const radioProps = {
    modelValue: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: undefined
    },
    // 功能同 active
    value: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: true
    },
    active: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: true
    },
    activeColor: String,
    label: String,
    disabled: Boolean,
    size: String as PropType<SizeType>,
    mini: Boolean
} as const;

export type RadioPropsType = ExtractPropTypes<typeof radioProps>;

export type RadioEmitsType = {
    [UPDATE_MODEL_EVENT]: (val: string | number | boolean | undefined) => string | number | boolean,
    [CHANGE_EVENT]: (val: string | number | boolean | undefined) => string | number | boolean
}
