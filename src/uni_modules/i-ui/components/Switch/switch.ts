import {CHANGE_EVENT, SizeType, UPDATE_MODEL_EVENT} from "../../common/constants";
import {ExtractPropTypes, PropType} from "vue";

export const switchProps = {
    modelValue: {
        type: Boolean,
        default: undefined
    },

    activeColor: String,
    inactiveColor: String,

    // 使用Label
    useLabel: Boolean,
    activeLabel: String,
    inactiveLabel: String,

    disabled: Boolean,
    size: String as PropType<SizeType>,
    mini: Boolean
} as const;

export type SwitchPropsType = ExtractPropTypes<typeof switchProps>;

export type SwitchEmitsType = {
    [UPDATE_MODEL_EVENT]: (val: string | number | boolean | undefined) => string | number | boolean,
    [CHANGE_EVENT]: (val: string | number | boolean | undefined) => string | number | boolean
}
