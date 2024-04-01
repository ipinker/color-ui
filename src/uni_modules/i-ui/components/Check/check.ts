import {CheckType} from "../../index";
import {ExtractPropTypes, PropType} from "vue";
import {CHANGE_EVENT, UPDATE_MODEL_EVENT} from "../../common/constants";
import {SizeType} from "../../common/constants";

export const checkProps = {
    modelValue: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: undefined
    },
    /** 绑定key：在使用 CheckGroup 时有效 **/
    value: String,
    /** @desc 激活的值 在使用 CheckGroup 时失效, 仅为true **/
    active: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: true
    },
    /** @desc 未激活的值：在使用 CheckGroup 时失效, 仅为false **/
    inactive: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: false
    },
    /**  @desc 激活色  **/
    activeColor: String,
    /**  @desc 未激活色  **/
    inactiveColor: String,
    /**  @desc Label  **/
    label: String,
    /**  @desc 是否禁用  **/
    disabled: Boolean,
    /**  @desc 尺寸，目前不支持  **/
    size: String as PropType<SizeType>,
    /**  @desc 最小尺寸  **/
    mini: Boolean
} as const;

export type CheckPropsType = ExtractPropTypes<typeof checkProps>;

export type CheckEmitsType = {
    [UPDATE_MODEL_EVENT]: (val: string | number | boolean | undefined) => string | number | boolean,
    [CHANGE_EVENT]: (val: string | number | boolean | undefined) => string | number | boolean
}
