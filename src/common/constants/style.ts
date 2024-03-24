/**
 * 样式常量
 * @Author: Gavin New
 * @Create: 2024/02/27 13:47
 */
export const LIGHT_MODE_ID = "light";
export const THEME_LIST = [
    {"colorPrimary": "#16AD90", id: "gg"},
    {"colorPrimary": "#1677ff", id: "blue"},
    {"colorPrimary": "#2f54eb", id: "geekblue"},
    {"colorPrimary": "#13c2c2", id: "cyan"},
    {"colorPrimary": "#069b81", id: "gossamer"},
    {"colorPrimary": "#73d13d", id: "green"},
    {"colorPrimary": "#fadb14", id: "yellow"},
    {"colorPrimary": "#fa8c16", id: "orange"},
    {"colorPrimary": "#fa541c", id: "volcano"},
    {"colorPrimary": "#ff4d4f", id: "red"},
    {"colorPrimary": "#FC6572", id: "pink"},
    {"colorPrimary": "#818181", id: "gray"}
];
export type THEME_LIST_TYPE = (typeof THEME_LIST)[number];
export const THEME_COLOR_LIST = THEME_LIST.map(theme => theme.colorPrimary);
export type THEME_COLOR_TYPE = (typeof THEME_COLOR_LIST)[number];
export const DEFAULT_THEME_MODE = "light";
