import { StyleValue } from "vue"

export interface DialogOption {
    isMaskClick: boolean
    cancelText: string
    confirmText: string
    title: string
    content: string
    useCancel: boolean
    contentStyle?: StyleValue
    callback: Function
}