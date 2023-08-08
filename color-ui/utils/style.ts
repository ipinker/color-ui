import { isNaN } from "./is";
import { unit } from "../common/config"
import { DefaultStyle } from "../common/default";

/**
 * @description 几何尺寸
 */
export type SizeStyle = { width?: string, height?: string, "line-height"?: string };
export const getSize = (size: string, round?: boolean, genLineHeight?: boolean): SizeStyle  => {
    let sizes = [];
    if (size && size.indexOf(",") > -1) sizes = size.split(",");
    else sizes = isNaN(+size) ? [] : [+size, +size];
    if (!sizes.length) return {};
    const [width, height= width] = sizes;
    if (!width && !height) return {};
    const style: SizeStyle = {
        width: width + unit,
        height: (round ? width : height) + unit
    };
    if(genLineHeight){
        style["line-height"] = style.height;
    }
    return style;
};

/**
 * @description 圆角
 */
export type RadiusStyle = { "border-radius"?: string };
export const getRadius = (radius: string | number): RadiusStyle  => {
    radius = +radius + "";
    if (isNaN(radius)) radius = DefaultStyle.radius;
    return {
        "border-radius": radius + unit
    };
};