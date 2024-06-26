import { PropType } from "vue";
import { EnumSizeType, SizeType } from "../../common/constants";

/**
 * @description  Button的种类
 */
export const buttonTypeList = [
    "default", "",
    "primary", "success", "warning", "info", "error",
    "text", "dashed", "link",
] as const;
export type ButtonType = (typeof buttonTypeList) [number];

/**
 * @description Button`s open-type
 */
export const openTypeList = [
    "feedback", "share", "contact", "getUserInfo", "getPhoneNumber", "launchApp", "openSetting"
];
export type OpenType = (typeof openTypeList) [number];

/**
 * @description Button`s form-type
 */
export const formTypeList = [
    "submit", "reset", ""
];
export type FormType = (typeof formTypeList) [number];

/**
 * @description Button的属性
 */
export const buttonProps = {
    /**
     * @description 尺寸: "small" | "normal" | "big"
     */
    size: {
        type: String as PropType<SizeType>,
        default: "normal"
    },
    width: String,
    height: String,
    /**
     * @description 圆角
     */
    radius: String,
    /**
     * @description 按钮的类型 ButtonTypes
     */
    type: {
        type: String as PropType<ButtonType>,
        default: "default"
    },
    /**
     * @description it`s a dashed border button
     */
    dashed: Boolean,
    /**
     * @description it`s a plain button
     */
    plain: Boolean,
    /**
     * @description it`s a text button
     */
    primary: Boolean,
    success: Boolean,
    warning: Boolean,
    info: Boolean,
    error: Boolean,
    block: Boolean,
    /**
     * @description 跳转能力
     */
    navigateType: {
        type: String,
        default: "default"
    },
    /**
     * @description 开放能力
     */
    openType: {
        type: String as PropType<OpenType>,
        default: "default"
    },
    /**
     * @description 表单类型
     */
    formType: {
        type: String as PropType<FormType>,
        default: "default"
    },
    hoverClass: String,
    /**
     * @description 是否禁用
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /** @desc 文字按钮 **/
    text: Boolean,
    /**
     * @description it`s a link button
     */
    link: Boolean,
    /**
     * @description Button`s background color
     */
    bg: String,
    /**
     * @description Button`s font color
     */
    color: String,
    /**
     * @description it`s a round button
     */
    round: Boolean,
    /**
     * @description it`s a animation button
     */
    animation: {
        type: String,
        default: "default"
    },
    /**
     * @description 是否开启loading功能
     */
    loading: Boolean,
    /**
     * @description 图标
     */
    icon: String,
    /**
     * @description Material 风格
     */
    material: Boolean,

} as const;

export type ButtonPropsType = typeof buttonProps;
