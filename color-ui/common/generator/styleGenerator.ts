/*
 * px 转 rpx  px 转 rem 的探索
 * 经过 长时间思索, 决定将 ui 分成三版发布
 * For PC     针对PC进行一套  px转px
 * For Phone  针对移动端的一套 px转rem
 * For UniApp 针对uniapp的一套px转rpx
 *
 */

/*
 * 以下针对颜色生成器的函数
 */
import {BorderDirType} from "../../types/type";
export interface Style {
    string : string
}
export type ColorStyleType = {
    "background-color"?: string,
    "color"?: string
}
/**
 * 生成
 * @param: font {String}
 * @return:  {}
 */
export const bg = (bg: string, font?: string): ColorStyleType => {
    const style: ColorStyleType = { "background-color": bg } ;
    if (font) {
        style.color = font;
    }
    return style;
}

export const color = (font: string): ColorStyleType => {
    const style: ColorStyleType = { "color": font } ;
    return style;
}
export const border = (color: string, width?: number, direction?: BorderDirType) => {
    const key = direction ? `border-${direction}` : "border";
    return { "border" : `${width || 1}px solid ${color}`};
}

export const borderTop = (color: string, width?: number) => border(color, width, "top");
export const borderBottom = (color: string, width?: number) => border(color, width, "bottom");
export const borderLeft = (color: string, width?: number) => border(color, width, "left");
export const borderRight = (color: string, width?: number) => border(color, width, "right");


/*
 * 以下针对字体生成器的函数
 */