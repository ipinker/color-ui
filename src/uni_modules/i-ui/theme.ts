// store/theme.ts
import { defineStore, DefineStoreOptions, StoreDefinition } from 'pinia';
import { THEME_LIST } from "./common/constants";
import { createThemeList } from "ipink-theme";
import type { SeedOption, ColorToken } from 'ipink-theme';

const themeList: SeedOption[] = THEME_LIST;
const list: ColorToken[] = createThemeList({ themeList, useDark: true }) || [];
export type ThemeModeType = "light" | "dark";
export type ThemeStoreId = "themeStore";
export type ThemeStoreState = {
    /** @desc 主题ID **/
    id: string  
    /** @desc 模式ID light ｜ dark **/
    modeId: ThemeModeType
    /** @desc 生成后的主题列表： createThemeList({ themeList, useDark: true }) => MapToken[], useDark: boolean 默认不生成暗黑模式， 需要手动开启 **/
    themeList: ColorToken[]
}
export type ThemeStoreGetters = {
    /** @desc 主题内容： MapToken **/
    theme: (state: ThemeStoreState) => ColorToken | undefined,
    /** @desc 主题模式： Dark ｜ Light **/
    mode: (state: ThemeStoreState) => ThemeModeType
}
export type ThemeStoreActions = {
    /** @desc 切换主题模式 **/
    changeMode: () => void
    /** @desc 切换主题 **/
    change: (id: string) => void
    /** @desc 根据 ID 获取指定的主题 **/
    get: (id: string) => ColorToken | undefined
    /** @desc 添加一个主题 **/
    add: (seed: SeedOption) => number
    /** @desc 添加一个主题集合 **/
    addList: (seed: SeedOption[]) => number
    /** @desc 根据 ID 删除指定主题 **/
    del: (id: string) => number
    /** @desc 传入一个排序函数对主题进行排序 **/
    sort: (func: Function) => ColorToken[]
    /** @desc 初始化默认的主题列表， 会覆盖掉内置主题 **/
    init: (tList: SeedOption[]) => number
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
        // 切换主题暗黑模式
        changeMode(id?: ThemeModeType) {
            if (id && id === this.modeId) return;
            if (id) this.modeId = id
            else this.modeId = this.modeId === "light" ? "dark" : "light";
        },
        // 切换主题
        change(id: string) {
            this.id = id;
        },
        // 获取主题
        get(id: string): any {
            let theme = this.themeList.find((theme) => theme.id === `${id}-${this.modeId}`);
            if (!theme) theme = this.themeList.find((theme) => theme.id === `${id}-${this.modeId === "light" ? "light" : "dark"}`)
            return theme;
        },
        add(seed: SeedOption, dir?: "push" | "unshift" | undefined) {
            return this.addList([seed], dir);
        },
        addList(seedList: SeedOption[], dir?: "push" | "unshift" | undefined) {
            type SeedKeyType = keyof SeedOption
            (seedList || []).forEach((item: SeedOption) => {
                Object.keys(item).forEach((key) => {
                    if(!item[key as unknown as SeedKeyType]) delete item[key as unknown as SeedKeyType];
                })
            })
            const newList: ColorToken[] = createThemeList({ themeList: seedList, useDark: true }) || [];
            if(!newList.length) return -1;
            if(dir == "unshift") this.themeList = newList.concat(this.themeList)
            else this.themeList = this.themeList.concat(newList);
            return 1
        },
        del(id: string) {
            const newList: ColorToken[] = [];
            this.themeList.forEach((theme: ColorToken) => {
                if (theme.id != id && theme.id != `${id}-dark` && theme.id != `${id}-light`) newList.push(theme);
            })
            const status = newList.length === this.themeList.length ? -1 : 1;
            if(status == 1) this.themeList = newList;
            return status;
        },
        sort(func: Function) {
            return this.themeList = this.themeList.sort(func as any);
        },
        init(seedList: SeedOption[]) {
            const newList = createThemeList({ themeList: seedList, useDark: true }) || [];
            if(!newList.length) return -1
            this.themeList = newList;
            return 1;
        }
    }
}

export const useThemeStore: StoreDefinition<ThemeStoreId, ThemeStoreState, ThemeStoreGetters, ThemeStoreActions> = defineStore( 'themeStore', themeStoreOptions);

