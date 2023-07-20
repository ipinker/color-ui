
export const SIZES = ["mini", "small", "normal", "big", "large"] as const;
export type Size = (typeof SIZES)[number];

export const STATUS = ["success", "warning", "danger"] as const;
export type Status = (typeof STATUS)[number];
