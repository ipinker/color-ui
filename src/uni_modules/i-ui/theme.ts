// store/theme.ts
import { defineStore } from 'pinia';
import { THEME_LIST } from "./common/constants";
import { createThemeList } from "ipink-theme";
import { SeedMap } from 'ipink-theme/dist/theme/interface';

const themeList = THEME_LIST as any;
const list = createThemeList({ themeList, useDark: true });

export const useThemeStore = defineStore( 'themeStore', {
    state: () => {
        return {
            id: "gg",    // 当前主题
            modeId: "light", // 当前模式 light | dark
            themeList: list
        };
    },
    getters: {
        theme: (state) => state.themeList.find((theme) => `${state.id}-${state.modeId}` === theme.id) || null,
        mode: state => state.modeId
    },
    actions: {
        // 切换主题
        changeMode() {
            this.modeId = this.modeId === "light" ? "dark" : "light";
        },
        change(id: string) {
            this.id = id;
        },
        // 获取主题
        get(id: string): any {
            let theme = this.themeList.find((theme) => theme.id === `${id}-${this.modeId}`);
            if (!theme) theme = this.themeList.find((theme) => theme.id === `${id}-${this.modeId === "light" ? "light" : "dark"}`)
            return theme;
        },
        add(seed: any) {
            
        },
        del(id: string) {

        },
        sort(func: Function) {

        },
        init(tList: any[]) {

        }
    },
    persist: true
})

