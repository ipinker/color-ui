import { ExtractPropTypes, PropType } from "vue";
import { OptionsKeyType, AnyObject } from "../../type"
export type PickerValueType = string | number | string[] | number[];
export const pickerProps = {
    /** @desc 通过keys值，支持数据各种名称，必传项； **/
    keys: {
        type: Object as PropType<OptionsKeyType>,
        default: () => ({value: 'value', label: 'label', children: "children"})
    },
    /** @desc 需要联动级数 1、2、3（可选 **/
    level: {
        type: [Number, String] as PropType<1 | 2 | 3>,
        default: 1
    },
    /** @desc 组件标题，默认「请选择」 **/
    title: String,
    /** @desc 默认选中值 **/
    modelValue: {
        type: [String, Number, Array] as PropType<PickerValueType>,
        default: null
    },
    /** @desc 默认选中值 **/
    value: {
        type: [String, Array] as PropType<PickerValueType>,
        default () {
            return null
        }
    },
    /** @desc 数据集合 string[] object[] **/
    list: {
        type: Array as PropType<AnyObject[]>,
        require: true,
        default () {
            return []
        }
    },
    /** @desc 通过此项展示组件， 与@update:show配合 **/
    show:{
        type:Boolean,
        default:false
    },
    /** @desc 点击遮罩是否关闭 **/
    isMaskClick: {
        type: Boolean,
        default: true
    }
};

export type PickerPropsType = ExtractPropTypes< typeof pickerProps >;

export type PickerEmitsType = {
    
}