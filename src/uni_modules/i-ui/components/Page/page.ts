import { ExtractPropTypes, PropType } from "vue";
import { PageStatus } from "../../common/constants"

export const pageProps = {
    /** @desc 状态栏占位符 **/
    nav: {
        type: Boolean,
        default: false
    },
    tabHeight: {
        type: [Number, String],
        default: 0
    },
    /** @desc 页面内容是否水平居中 **/
    center: Boolean,
    /** @desc 导航栏透明度 **/
    opacity: [Number, String],
    gradientType: String,
    gradientValue: String,
    color: String,
    bgColor: String,
    statusColor: String,
    statusBarInBody: {
        type: Boolean,
        default: undefined
    },
    /** @desc 导航栏文字, 有值则显示导航栏 **/
    title: String,
    /** @desc 导航栏文字横向布局 **/
    titleAlign: String,
    /** @desc 导航栏支持返回 **/
    useBack: Boolean,
    /** @desc Loading 开启 **/
    isLoading: Boolean,
    /** @desc 使用的loading类型 **/
    loadingType: {
        type: String as PropType<"0" | "1" | "2" | "3">,
        default: "0"
    },
    usePrimary: {
        type: Boolean,
        default: true
    },
    // 页面状态
    status: {
        type: String as PropType<PageStatus>,
        default: "default"
    }
}

export type PagePropsType = ExtractPropTypes< typeof pageProps >;