import { ExtractPropTypes, PropType, StyleValue } from "vue"
import { ModalRef } from "../../type"


export interface SheetOption {
    list?: any[]
    labelKey?: string
    isObject?: boolean
    isMaskClick?: boolean
    useCancel?: boolean
    cancelText?: string
    itemStyle?: StyleValue[] | StyleValue | string
    callback?: Function
}

export interface SheetRef extends ModalRef {
    open: (option?: SheetOption) => void
}

export const sheetProps = {
    /** @desc 使用取消按钮 **/
    useCancel: {
        type: Boolean,
        default: true
    },
    /** @desc 取消按钮文字 **/
    cancelText: String,
    /** @desc 显示的名称对应的key， 如果设置了isObject：false则无效直接取item **/
    labelKey: {
        type: String,
        default: "label"
    },
    /** @desc 传入的数组是否为对象 **/
    isObject: {
        type: Boolean,
        default: true
    },
    /** @desc 每个item的样式 **/
    itemStyle: [Object, String, Array] as PropType<StyleValue | StyleValue[] | string>,
    /** @desc 数据集合 **/
    list: {
        type: Array,
        default: () => []
    },
    /** @desc 点击遮罩是否关闭 **/
    isMaskClick: {
        type: Boolean,
        default: null
    },
};

export type SheetPropsType = ExtractPropTypes<typeof sheetProps>;