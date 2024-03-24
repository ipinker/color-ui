/*
 * @Author: Gavin New
 * @Date: 2024-02-18 18:00:20
 * @LastEditors: Gavin New
 * @LastEditTime: 2024-02-21 13:44:06
 * @FilePath: /renovation/src/store/global.ts
 * @Description: 描述
 */
// src/store/useCountStore.ts
import { defineStore } from 'pinia'

interface GlobalState {
    login: boolean
    system:  UniApp.GetSystemInfoResult
    config: { [propName:string] : boolean }
    provider: { [propName:string] : string[] }
}

const globalState: GlobalState = {
    login: false,
    system: uni.getSystemInfoSync(),
    config: {
        sound: true,   // 声音
        vibrate: false,// 震动
        push: true,    // 在线推送
        finger: false, // 开启指纹登录

        autoTheme: true,    // 主题跟随系统
        autoUpdate: true,   // 自动更新
        autoLanguage: true, // 语言跟随系统
    },
    provider: {
        oauth: [],
        payment: [],
        share: []
    },
};
type GlobalBooKey = "login";
type GlobalConfigKey = keyof (typeof globalState.config);
type GlobalProviderKey = keyof (typeof globalState.provider);

export const useGlobalStore = defineStore('global',{
    state: (): GlobalState => {
        return globalState;
    },
    getters: {
        isLogin: state => state.login,

        systemInfo: state => state.system,

        sound: state => state.config.sound,
        vibrate: state => state.config.vibrate,
        push: state => state.config.push,
        finger: state => state.config.finger,
        autoTheme: state => state.config.autoTheme,
        autoUpdate: state => state.config.autoUpdate,
        autoLanguage: state => state.config.autoLanguage,

        oauth: state => state.provider.oauth,
        payment: state => state.provider.payment,
        share: state => state.provider.share,
    },
    actions: {
        changeSystem(systemInfo: UniApp.GetSystemInfoResult) {
            this.system = systemInfo;
        },
        changeState(key: GlobalBooKey) {
            this[key] = !this[key];
        },
        changeConfig(key: GlobalConfigKey) {
            this.config[key] = !this.config[key];
        },
        changeProvider(key : GlobalProviderKey, value: any[]) {
            this.provider[key] = value;
        }
    },
    persist: true
})