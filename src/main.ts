import { createSSRApp } from "vue";
import App from "./App.vue";
import store, { Pinia } from "./store";
import ColorUI from "./color-ui/packages/index";
export function createApp() {
    const app = createSSRApp(App);
    app.use(store);
    // 需要放置到
    ColorUI.install(app, {});
    return {
        app,
        Pinia // 此处必须将 Pinia 返回
    };
}
