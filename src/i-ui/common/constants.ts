export const LIGHT_MODE_ID = "light";
export const UNIT = "rpx";

export type ResultStatus = "success" | "error" | "warning" | "info" | "E404" | "E403" | "E500";
/** @desc 页面级的状态分类 ：正常页面 | 无数据页面 ｜ 错误页 ｜ 成功页 ｜ 警告 ｜ 信息页 ｜ 403 ｜ 404 ｜ 500 **/
export type PageStatus = ResultStatus | "default" | "empty";

export const NAVIGATE_LIST = [ "navigateTo", "reLaunch", "redirectTo", "switchTab" ] as const;
/** @desc 页面级的跳转类型 **/
export type NavigateType = (typeof NAVIGATE_LIST)[number];

/** @desc Event **/
export const UPDATE_MODEL_EVENT = "update:modelValue";
export const UPDATE_SHOW_EVENT = "update:show";
export const CHANGE_EVENT = "change";
export const CLICK_EVENT = "click";
export const CONFIRM_EVENT = "confirm";
export const CANCEL_EVENT = "cancel";
export const CLOSE_EVENT = "close";
export const OPEN_EVENT = "open";
export const CUSTOM_EVENT = "custom";

export const LABEL_KEY = "label";
export const VALUE_KEY = "value";
export const CHILDREN_KEY = "children";

/** @desc Common border width : 2  **/
export const BORDER_WIDTH: number = 2;
/** @desc Theme mode : light | dark  **/
export const DEFAULT_THEME_MODE = "light";
/** @desc 枚举 尺寸集合 ： "mini", "small", "normal", "big", "large"  **/
export const ENUM_SIZE_LIST = ["mini", "small", "normal", "big", "large"] as const;
/** @desc 枚举 尺寸类型 ： "mini" ｜ "small" ｜ "normal" ｜ "big" ｜ "large"  **/
export type EnumSizeType = (typeof ENUM_SIZE_LIST)[number];
/** @desc 可食用的所有尺寸类型集合  **/
export const SIZE_LIST = [
    "mini", "small", "normal", "big", "large",  "full",
    "xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl", "xxxxl",
] as const;
/** @desc 可食用的所有尺寸的类型  **/
export type SizeType = (typeof SIZE_LIST)[number];

/** @desc 可食用的圆角尺寸的集合  **/
export const RADIUS_LIST = [ "xs", "s", "m", "l" ] as const;
/** @desc 可食用的圆角尺寸的类型  **/
export type RadiusType = (typeof RADIUS_LIST)[number];
/** @desc 圆角尺寸 与 theme 共同的Key转化Map  **/
export const RadiusToSeedKey = {
    'xs': "borderRadius",
    's': "borderRadiusXS",
    'm': "borderRadiusSM",
    'l': "borderRadiusLG"
}

/** @desc 可食用的动画集合  **/
export const ANIMATION_LIST = [ "", "opacity", "default", "ripple", "color" ] as const;
/** @desc 可食用的动画类型  **/
export type Animation = (typeof ANIMATION_LIST)[number];

/** @desc 方向 ： "top", "right", "bottom", "left"  **/
export const DIR_LIST = [ "top", "right", "bottom", "left" ] as const;
/** @desc 方向的类型  **/
export type DirType = (typeof DIR_LIST)[number];


/** @desc 默认样式  **/
export const DEFAULT_STYLE = {
    radius: 8
} as const;
/** @desc 默认样式的类型  **/
export type DefaultStyleType = typeof DEFAULT_STYLE;
/** @desc 默认样式的 key 类型  **/
export type DefaultStyleKeyType = keyof DefaultStyleType;
