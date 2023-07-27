
export const SIZES = ["mini", "small", "normal", "big", "large"] as const;
export type Size = (typeof SIZES)[number];

export const STATUS = ["success", "warning", "danger"] as const;
export type Status = (typeof STATUS)[number];

/**
 * @description 两个平台  pc 未使用uniapp的vue3 , uniapp环境
 */
export const PLATFORMS = [ "pc", "uniapp" ] as const;
export type Platform = (typeof PLATFORMS)[number];