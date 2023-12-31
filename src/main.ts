// import "test-publish-colorui/dist/style.css";
// import ColorUI from "test-publish-colorui";
import { createSSRApp } from "vue";
import App from "./App.vue";
import ColorUI from "../color-ui/dist";
import "./static/icon/iconfont.css";
import "../color-ui/dist/style.css";
import store, { Pinia } from "./store";
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
