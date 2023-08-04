import { isNaN } from "./is";
import { unit } from "../common/config"
import { DefaultStyle } from "../common/default";

/**
 * @description 几何尺寸
 */
export type SizeStyle = { width?: string, height?: string };
export const getSize = (size: string): SizeStyle  => {
    let sizes = [];
    if (size && size.indexOf(",") > -1) sizes = size.split(",");
    else sizes = isNaN(+size) ? [] : [+size, +size];
    if (!sizes.length) return {};
    const [width, height= width] = sizes;
    if (!width && !height) return {};
    return {
        width: width + unit,
        height: height + unit
    };
};

export type RadiusStyle = { radius: string };
export const getRadius = (radius: string | number): RadiusStyle  => {
    radius = +radius + "";
    if (isNaN(radius)) radius = DefaultStyle.radius;
    return {
        radius: radius + unit
    };
};