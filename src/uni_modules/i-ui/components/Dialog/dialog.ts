import { ExtractPropTypes, PropType, StyleValue } from "vue"
import { ModalRef } from "../../type"

export interface DialogOption {
    isMaskClick?: boolean
    cancelText?: string
    confirmText?: string
    title?: string
    content?: string
    useCancel?: boolean
    contentStyle?: StyleValue
    callback?: Function
}

export interface DialogRef extends ModalRef {
    open: (option: DialogOption) => void
}

export const dialogProps = {
    option: {
        type: Object as PropType<DialogOption>,
        default: () => ({})
    },
    show: Boolean
};

export type DialogPropsType = ExtractPropTypes<typeof dialogProps>;