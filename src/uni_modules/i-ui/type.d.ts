// 全局要用的类型放到这里
import type { ColorToken } from "ipink-theme/dist/theme/interface";
import { HSLA, HSVA, Numberify, RGBA } from "@ctrl/tinycolor";

export type Num = string | number;

export type StrNum = string | number;

export interface StringMap { 
    [propName : string] : string 
};
export interface AnyObject { 
    [propName : string] : any 
};



export type CheckType = boolean | string | number;

export interface ColorInfo {
    hex?: string
    hex8?: string
    rgb?: string
    rgba?: Numberify<RGBA>
    hsl?: Numberify<HSLA>
    hsv?: Numberify<HSVA>
    r?: number
    g?: number
    b?: number
    a?: number
    h?: number
    s?: number
    l?: number
    v?: number
    source?: string
    oldHue?: number
}
export type ColorInfoKey = keyof ColorInfo;

export type SelectOption = {
    label: string
    value: string | number
    children?: SelectOption[]
}

export interface ModalRef {
    _ref?: any
    open?: (AnyObject) => void
    close?: (AnyObject) => void
}

/** @desc 设置主题样式用到的key； ThemeButton **/
export interface ThemeJsonOption {
    /** @desc uni.setNavigationBarColor backgroundColor **/
    navBgColor?: string
    /** @desc uni.setNavigationBarColor frontColor **/
    navTxtStyle?: "black" | "white"
    /** @desc uni.setBackgroundTextStyle textStyle **/
    bgTxtStyle?: "light" | "dark"
    /** @desc uni.setBackgroundColor backgroundColor **/
    bgColor?: string
    /** @desc uni.setBackgroundColor backgroundColorTop **/
    bgColorTop?: string
    /** @desc uni.setBackgroundColor backgroundColorBottom **/
    bgColorBottom?: string
    /** @desc uni.setTabBarStyle backgroundImage **/
    bgImage?: string
    /** @desc uni.setTabBarStyle color **/
    tabFontColor?: string
    /** @desc uni.setTabBarStyle selectedColor **/
    tabSelectedColor?: string
    /** @desc uni.setTabBarStyle backgroundColor **/
    tabBgColor?: string
    /** @desc uni.setTabBarStyle borderStyle **/
    tabBorderStyle?: "white" | "black"
}

export interface ThemeJson {
    dark: ThemeJsonOption
    light: ThemeJsonOption
}

export type {
    ResultStatus,
    PageStatus,
    NavigateType,
    EnumSizeType,
    SizeType,
    RadiusType,
    DirType,
    DefaultStyleType,
    DefaultStyleKeyType,
} from "./common/constants"

export type {
    SizeStyle,
    RadiusStyle,
    ColorKey,
    SeedKey
} from "./common/style"

export type { 
    ThemeModeType,
    ThemeStoreState,
    ThemeStoreGetters,
    ThemeStoreActions
} from "./theme"

export * from "./components/Bg/index"
export * from "./components/Button/index"
export * from "./components/Calendar/index"
export * from "./components/Card/index"
export * from "./components/Cascader/index"
export * from "./components/Cell/index"
export * from "./components/Check/index"
export * from "./components/CheckGroup/index"
export * from "./components/Code/index"
export * from "./components/Col/index"
export * from "./components/Collapse/index"
export * from "./components/Color/index"
export * from "./components/CountDown/index"
export * from "./components/Date/index"
export * from "./components/Dialog/index"
export * from "./components/Drawer/index"
export * from "./components/Editor/index"
export * from "./components/Empty/index"
export * from "./components/FloatButton/index"
export * from "./components/Form/index"
export * from "./components/FormItem/index"
export * from "./components/Grid/index"
export * from "./components/GridItem/index"
export * from "./components/Icon/index"
export * from "./components/Img/index"
export * from "./components/IndexList/index"
export * from "./components/Input/index"
export * from "./components/Loading/index"
export * from "./components/LoadMore/index"
export * from "./components/Longpress/index"
export * from "./components/NavigationBar/index"
export * from "./components/Number/index"
export * from "./components/Page/index"
export * from "./components/Pagination/index"
export * from "./components/Picker/index"
export * from "./components/Popup/index"
export * from "./components/Progress/index"
export * from "./components/Radio/index"
export * from "./components/RadioGroup/index"
export * from "./components/Rate/index"
export * from "./components/Result/index"
export * from "./components/Rich/index"
export * from "./components/Row/index"
export * from "./components/Search/index"
export * from "./components/Select/index"
export * from "./components/Sheet/index"
export * from "./components/Slider/index"
export * from "./components/Slider/index"
export * from "./components/Space/index"
export * from "./components/Steps/index"
export * from "./components/Switch/index"
export * from "./components/Tab/index"
export * from "./components/Tabbar/index"
export * from "./components/table/index"
export * from "./components/ThemeButton/index"
export * from "./components/TimeLine/index"
export * from "./components/Tip/index"
export * from "./components/Title/index"
export * from "./components/Transition/index"
export * from "./components/Upload/index"
export * from "./components/VerifyCode/index"