import type { App } from 'vue';
import type {MapToken, SeedMap} from "../theme/interface";
import defaultDerivative from "./themes/default"
import darkDerivative from "./themes/dark"
import {seedColors} from "./themes/colorMap";
import Theme, {ThemeOptions} from "./context"

export const initThemeConfig = (app: App, options : ThemeOptions) => {
    // todo ...
    // 配置到全局
    app.config.globalProperties.$theme = new Theme(options || {});
};
