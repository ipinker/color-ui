// store/theme.ts
import { defineStore, DefineStoreOptions, StoreDefinition } from 'pinia';
import { THEME_LIST } from "./common/constants";
import { createThemeList } from "ipink-theme";
import type { SeedOption, ColorToken } from 'ipink-theme';
import { Config }from "./index"


let updateThemeList = Config.getOption()?.themeList || []
let updateThemeOption = Config.getOption().themeOption;
if(updateThemeOption && Object.keys(updateThemeOption).length && !updateThemeList.length){
	updateThemeList = [updateThemeOption];
}
const themeList: SeedOption[] = updateThemeList.length ? updateThemeList : THEME_LIST;
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
    add: (seed: SeedOption, dir?: "push" | "unshift" | undefined) => number
    /** @desc 添加一个主题集合 **/
    addList: (seed: SeedOption[], dir?: "push" | "unshift" | undefined) => number
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
        theme: (state: ThemeStoreState) => {
            return state.themeList.find((theme) => `${state.id}-${state.modeId}` === theme.id || state.id === theme.id)
        },
        mode: (state: ThemeStoreState) => state.modeId
    },
    actions: {
        /** @desc 切换主题暗黑模式 **/
        changeMode(id?: ThemeModeType) {
            if (id) this.modeId = id
            else this.modeId = this.modeId === "light" ? "dark" : "light";
        },
        /** @desc 切换主题 **/
        change(id: string) {
            if(!id) return;
            if(id.includes("-light")) id = id.split("-light")[0];
            if(id.includes("-dark")) id = id.split("-dark")[0];
            this.id = id;
        },
        /** @desc 获取主题 **/
        get(id: string): any {
            let theme = this.themeList.find((theme) => theme.id === `${id}-${this.modeId}` || theme.id === id);
            if (!theme) theme = this.themeList.find((theme) => theme.id === `${id}-${this.modeId === "light" ? "light" : "dark"}`)
            return theme;
        },
        /**
         * @desc 添加单个主题
         * @param seed { SeedOption }
         * @param dir 添加的方向 { "push" | "unshift" }
         * @return: -1 | 1
         */
        add(seed: SeedOption, dir?: "push" | "unshift" | undefined) {
            return this.addList([seed], dir);
        },
        /**
         * @desc 添加多个主题
         * @param seedList { SeedOption[] }
         * @param dir 添加的方向 { "push" | "unshift" }
         * @return: -1 | 1
         */
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
        /**
         * @desc 删除指定主题， 不可删除当前使用的主题
         * @param id { string }
         * @return: -1 | 1
         */
        del(id: string) {
            if(id == this.modeId) return -1;
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
        /**
         * @desc 初始化主题列表， 会覆盖原有的
         * @param seedList { SeedOption[] }
         * @return: -1 | 1
         */
        init(seedList: SeedOption[]) {
            const newList = createThemeList({ themeList: seedList, useDark: true }) || [];
            if(!newList.length) return -1
            this.themeList = newList;
            this.change(this.themeList[0].id);
            return 1;
        }
    },
    persist: true
}

export const useThemeStore: StoreDefinition<ThemeStoreId, ThemeStoreState, ThemeStoreGetters, ThemeStoreActions> = defineStore( 'themeStore', themeStoreOptions);

