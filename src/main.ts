import { createSSRApp } from "vue";
import App from "./App.vue";
import store, { Pinia } from "./store";
// import ColorUI from "../color-ui/src/index";
import ColorUIV2 from "../node_modules/test-publish";
console.log("ColorUIV2: ", ColorUIV2)
export function createApp() {
    const app = createSSRApp(App);
    app.use(store);
    // 需要放置到
    // ColorUI.install(app, {});
    ColorUIV2.install(app, {});
    return {
        app,
        Pinia // 此处必须将 Pinia 返回
    };
}
