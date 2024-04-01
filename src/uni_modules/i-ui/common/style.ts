/**
 * 样式生成工具
 * @Author: Gavin New
 * @Create: 2024/02/27 13:48
 */
import { isNumber, isString } from "ipink-util";
import { UNIT, DEFAULT_STYLE } from "./constants";
import {SeedKey} from "../index";
import { HSLA, HSVA, Numberify, RGBA, TinyColor } from "@ctrl/tinycolor"
import { ColorInfo } from "../index";

/**
 * @description 几何尺寸
 */
export type SizeStyle = { width?: string, height?: string, "line-height"?: string };
/**
 * @description 生成尺寸样式
 * @param size 尺寸信息 { string }
 * @param round 是否设置圆形 { boolean }
 * @return SizeStyle extends StyleValue
 */
export const genSize = (size: string, round?: boolean): SizeStyle  => {
    let sizes = [];
    let unit = size.indexOf('px') > -1 ? '' : UNIT;

    if (size && size.indexOf(",") > -1) sizes = size.split(",");

    else sizes = [ size, size ];

    const [width, height= width] = sizes;

    if (!width && !height) return {};

    return {
        width: width + unit,
        height: (round ? width : height) + unit
    };
};

/**
 * @description 圆角
 */
export type RadiusStyle = { "border-radius"?: string };
/**
 * @description 生成圆角样式
 * @param radius { string | number }
 * @return RadiusStyle extends StyleValue
 */
export const genRadius = (radius: string | number): RadiusStyle  => {
    if (isString(radius)) {
        const _radius = "" + radius;
        radius = (_radius.indexOf("px") > -1 || _radius.indexOf("%") > -1 || _radius.indexOf("em") > -1) ? _radius : (_radius + UNIT)
    } else if(isNumber(radius)) radius = "" + radius + UNIT;
    else radius = DEFAULT_STYLE.radius + UNIT;
    return {
        "border-radius": radius
    };
};

/** @desc ColorKey : 颜色值的类型 SeedKey | string **/
export type ColorKey = SeedKey | string;

/**
 * @desc 生成颜色值， 可添加透明度
 * @param color 颜色值 { string }
 * @param opacity 透明度 { number }
 * @return string
 **/
export const genColorString = (color: string, opacity?: number): string => {
    const colorInstance = new TinyColor(color);
    if(opacity && opacity < 1) colorInstance.setAlpha(opacity);
    return colorInstance.toRgbString();
}
export const genColor = genColorString;

/**
 * @desc 生成目标颜色的暗黑模式
 * @param color 颜色值 { string }
 * @return string
 **/
export const genDarkColor = (color: string): string => {
    return new TinyColor(color).darken().toRgbString();
}
/**
 * @desc 生成目标颜色的白昼模式
 * @param color 颜色值 { string }
 * @return string
 **/
export const genLightColor = (color: string): string => {
    return new TinyColor(color).lighten().toRgbString();
}
export const isLightColor = (color: string): boolean => {
    return new TinyColor(color).isLight();
}
/**
 * @desc 获取一个范围内的值， 不可溢出和下限
 * @param value { number }
 * @Return: number
 * Created by Gavin New on 2024/3/8 08:02
 */
export function clamp(value: number, min: number, max: number): number {
	return min < max ?
		(value < min ? min : value > max ? max : value) :
		(value < max ? max : value > min ? min : value)
}
/**  @desc 颜色扩展  **/
type TinyColorExtend = TinyColor & { _a: number };
/**
 * 将一个「不完全颜色对象」转换为「完全颜色对象」
 * @param data 不完全颜色对象 { ColorInfo }
 * @param oldHue 旧色相/默认色相 { number }
 * @Return: ColorInfo
 * Created by Gavin New on 2024/3/8 08:05
 */
export function genColorInfo(data: ColorInfo, oldHue?: number): ColorInfo {
	let alpha: number = data && data.a || 1
	let color: TinyColorExtend,
        colorStr: string | Numberify<RGBA> | Numberify<HSLA> | Numberify<HSVA>;
	if (data && data.hsl) colorStr = data.hsl;
	else if (data && data.hex && data.hex.length > 0) colorStr = data.hex;
	else if (data && data.hsv) colorStr = data.hsv;
	else if (data && data.rgba) colorStr = data.rgba;
	else if (data && data.rgb) colorStr = data.rgb;
	else colorStr = data as unknown as string;
	color = new TinyColor(colorStr) as TinyColorExtend;
    if(alpha === undefined && color.a !== undefined && color?._a !== null) alpha = color.a;
	if (color && (color?._a === undefined || color?._a === null)) {
		color.setAlpha(alpha || 1)
	}
	let hsl: Numberify<HSLA> = color.toHsl()
	let hsv: Numberify<HSVA> = color.toHsv()
	if (hsl.s === 0) {
		hsv.h = hsl.h = data?.h || (data?.hsl && data.hsl.h) || oldHue || 0
	}

	return {
		hsl: hsl,
		hex: color.toHexString().toUpperCase(),
		hex8: color.toHex8String().toUpperCase(),
		rgba: color.toRgb(),
		rgb: color.toRgbString(),
		hsv: hsv,
		oldHue: data?.h || oldHue || hsl?.h,
		source: data?.source,
		a: data?.a || color.getAlpha()
	}
}

export const genPx = (num: string | number) => {
    if (typeof num === 'string') {
        if (num.indexOf('px') !== -1) {
            if (num.indexOf('rpx') !== -1) {
                num = num.replace('rpx', '');
            } else if (num.indexOf('upx') !== -1) {
                num = num.replace('upx', '');
            } else {
                return num;
            }
        } else if (num.indexOf('%') !== -1) {
            let rate = Number(num.replace('%', '')) / 100;
            return uni.getSystemInfoSync().windowHeight * rate + 'px';
        } else if (num.indexOf("vw") !== -1) {
            let rate = Number(num.replace('vw', '')) / 100;
            return uni.getSystemInfoSync().windowWidth * rate + 'px';
        } else if (num.indexOf("vh") !== -1) {
            let rate = Number(num.replace('vh', '')) / 100;
            return uni.getSystemInfoSync().windowHeight * rate + 'px';
        }
    }
    return num ? uni.upx2px(Number(num)) + 'px' : 0;
}

