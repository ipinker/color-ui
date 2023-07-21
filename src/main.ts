import { createSSRApp } from "vue";
import App from "./App.vue";
import store, { Pinia } from "./store";

export function createApp() {
    const app = createSSRApp(App);
    app.use(store);
    return {
        app,
        Pinia // 此处必须将 Pinia 返回
    };
}
