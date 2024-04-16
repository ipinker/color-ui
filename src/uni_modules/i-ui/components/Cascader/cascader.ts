import { ExtractPropTypes, PropType } from "vue"
import { AnyObject, OptionsKeyType } from "../../type"

export type ItemOptionType = {
    /** @desc 下一步按钮名称 **/
    label?: string
    /** @desc 下一步图标 **/
    icon?: string
}
export const cascadeProps = {
    /** @desc 通过keys值，支持数据各种名称，必传项； **/
    keys: {
        type: Object as PropType<OptionsKeyType>,
        default: () => ({value: 'value', label: 'label', children: "children"})
    },
    /** @desc 扩展的底部按钮 { ItemOptionType } **/
    option: {
        type: Object as PropType<ItemOptionType>
    },
    /** @desc 点击遮罩是否关闭 **/
    isMaskClick: {
        type: Boolean,
        default: Boolean
    },
    /** @desc 确认按钮文字 **/
	confirmText: String,
    /** @desc 是否显示确认按钮，不显示选择最后一级触发确认事件 **/
	confirm: {
        type: Boolean,
        default: true
    },
    /** @desc 组件标题 **/
	title: String,
    /** @desc 组件数据源 object[] **/
	list: {
        type: Array as PropType<AnyObject[]>,
        default: () => []
    },
    /** @desc 是否主题化 **/
	primary: Boolean,
    show: Boolean
} as const;

export type CascadePropsType = ExtractPropTypes< typeof cascadeProps >;

export type CascadeEmitsType = {

}