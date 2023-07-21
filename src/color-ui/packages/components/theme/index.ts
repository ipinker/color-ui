import type { App } from 'vue';
import type {MapToken, SeedMap} from "../theme/interface";
import defaultDerivative from "./themes/default"
import darkDerivative from "./themes/dark"
import {seedColors} from "./themes/colorMap";
import ThemeStore from "./theme"
import {Platform} from "../../common/constant";

export type ThemeOptions = {
    themeList: SeedMap[],
    id: string,
    useDark: boolean,
    platform: Platform
}

export const initThemeConfig = (app: App, options : ThemeOptions) => {
    return {
        ThemeStore
    }
};
