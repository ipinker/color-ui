// 全局要用的类型放到这里
import type { ColorToken } from "ipink-theme/dist/theme/interface";

export type Num = string | number;

/**  通用验证效验参数  **/
export interface VerifyCodeDto {
    userId?: string;
    phone: string;
    email: string;
    code: string;
}

/**  通用接口传参  **/
export interface GeneralDto extends VerifyCodeDto {
    id?: number;
	ids?: number[];

    [propName: string]: any
}

/**  通用模型请求接口  **/
export interface RequestDto<T> extends GeneralDto {
    data?: T;
}

// 接口响应数据
export interface ServerResult<T = unknown> {
    code: number;
    msg?: string;
    ok?: boolean,
    data: T
}

export type StringMap = { [propName : string] : string };

export type SeedKey = (keyof ColorToken);

export type CheckType = boolean | string | number;

export interface QueryOption {
    title?: string
    url?: string
    id?: string
}