// store/theme.ts
import { defineStore, DefineStoreOptions, StoreDefinition } from 'pinia';
import { THEME_LIST } from "./common/constants";
import { createThemeList } from "ipink-theme";
import { MapToken, SeedMap } from 'ipink-theme/dist/theme/interface';

const themeList = THEME_LIST as any;
const list = createThemeList({ themeList, useDark: true }) || [];
export type ThemeModeType = "light" | "dark";
export type ThemeStoreId = "themeStore";
export type ThemeStoreState = {
    /** @desc 主题ID **/
    id: string  
    /** @desc 模式ID light ｜ dark **/
    modeId: ThemeModeType
    /** @desc 生成后的主题列表： createThemeList({ themeList, useDark: true }) => MapToken[], useDark: boolean 默认不生成暗黑模式， 需要手动开启 **/
    themeList: MapToken[]
}
export type ThemeStoreGetters = {
    /** @desc 主题内容： MapToken **/
    theme: (state: ThemeStoreState) => MapToken | undefined,
    /** @desc 主题模式： Dark ｜ Light **/
    mode: (state: ThemeStoreState) => ThemeModeType
}
export type ThemeStoreActions = {
    /** @desc 切换主题模式 **/
    changeMode: () => void
    /** @desc 切换主题 **/
    change: (id: string) => void
    /** @desc 根据 ID 获取指定的主题 **/
    get: (id: string) => MapToken | undefined
    /** @desc 添加一个主题 **/
    add: (seed: SeedMap | any) => number
    /** @desc 添加一个主题集合 **/
    addList: (seed: SeedMap[] | any[]) => number
    /** @desc 根据 ID 删除指定主题 **/
    del: (id: string) => number
    /** @desc 传入一个排序函数对主题进行排序 **/
    sort: (func: Function) => MapToken[]
    /** @desc 初始化默认的主题列表， 会覆盖掉内置主题 **/
    init: (tList: SeedMap[] | any[]) => number
}
export type ThemeStoreOptions = {
    state: () => ThemeStoreState
    getters: ThemeStoreGetters
    actions: ThemeStoreActions
    persist?: boolean
}
const themeStoreOptions: Omit<DefineStoreOptions<ThemeStoreId, ThemeStoreState, ThemeStoreGetters, ThemeStoreActions>, 'id'> = {
    state: (): ThemeStoreState => {
        return {
            id: "gg",    // 当前主题
            modeId: "light", // 当前模式 light | dark
            themeList: list
        };
    },
    getters: {
        theme: (state: ThemeStoreState) => state.themeList.find((theme) => `${state.id}-${state.modeId}` === theme.id),
        mode: (state: ThemeStoreState) => state.modeId
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
            return -1
        },
        addList(seed: any) {
            return -1
        },
        del(id: string) {
            return -1
        },
        sort(func: Function) {
            return []
        },
        init(tList: any[]) {
            return -1
        }
    }
}

export const useThemeStore: StoreDefinition<ThemeStoreId, ThemeStoreState, ThemeStoreGetters, ThemeStoreActions> = defineStore( 'themeStore', themeStoreOptions);

