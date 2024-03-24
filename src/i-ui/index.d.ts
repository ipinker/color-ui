// 全局要用的类型放到这里
import type { SeedMap as SeedMapType } from "ipink-theme/dist/theme/interface";
import { HSLA, HSVA, Numberify, RGBA } from "@ctrl/tinycolor";

export type Num = string | number;

export type StrNum = string | number;

export type StringMap = { [propName : string] : string };
export type AnyMap = { [propName : string] : any };

export type SeedMap = SeedMapType;

export type SeedKey = (keyof SeedMapType);

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

export type OptionsKeyType = {
    label: string
    value: string
    children: string
}
