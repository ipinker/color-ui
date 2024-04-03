/*
 * @Author: Gavin New
 * @Date: 2023-08-25 19:45:55
 * @LastEditors: Gavin New
 * @LastEditTime: 2024-02-20 14:25:48
 * @FilePath: /renovation/src/main.ts
 * @Description: 描述
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import store, { Pinia } from "./store";
import i18n from './locale/index';
import IUI from "@/uni_modules/i-ui/index"
import 'virtual:uno.css';

// 禁止鼠标右键
// #ifdef H5
document.oncontextmenu=(event) => {
    if (document.all) 
        // @ts-ignore
        window.event.returnValue = false;// for IE
    else 
        event.preventDefault();
 } 
// #endif


export function createApp() {
	const app = createSSRApp(App);
    app.use(IUI);
	app.use(store);
    app.use(i18n)
	return {
		app,
		Pinia
	};
}

