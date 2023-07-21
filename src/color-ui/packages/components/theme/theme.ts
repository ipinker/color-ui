import { defineStore } from "pinia";
import type {MapToken, SeedMap} from "../theme/interface";

export type ThemeStateType = {
    id: string,
    themeList: MapToken[]
}

export type ThemeType = MapToken | null;

const themeStore = defineStore("theme", {
    state: (): ThemeStateType => {
        return {
            id: "light",
            themeList: []
        };
    },
    getters: {
        theme: (state: ThemeStateType): ThemeType => {
            return state.themeList.find((theme: MapToken) => theme.id === state.id) || null;
        }
    },
    actions: {
        // 切换主题
        change(id: string): ThemeType {
            const theme: ThemeType = this.themeList.find((theme: MapToken) => theme.id === id) || null;
            if (!theme) {
                console.error("The theme id is not exits!");
                return null;
            }
            this.id = id;
            return this.theme;
        },
        // 插入主题
        insert(theme: SeedMap): ThemeType {
            // todo ...
            return null;
        },
        // 删除主题
        delete(id: string): number {
            const themeIndex = this.themeList.findIndex((theme: MapToken) => theme.id === id);
            if(themeIndex === -1) return -1;
            this.themeList.splice(themeIndex, 1);
            return themeIndex;
        },
        // 更新主题
        update(id: string, theme: SeedMap): number {
            const themeIndex = this.themeList.findIndex((theme: MapToken) => theme.id === id);
            if (themeIndex === -1) return -1;
            // todo ...
            return themeIndex;
        },
        // 获取主题
        get(id?: string): ThemeType {
            if (!id) return this.theme;
            return this.themeList.find((theme: MapToken) => theme.id === id) || null;
        }
    }
});

export default themeStore;






// import type {MapToken, SeedMap} from "../theme/interface";
// import defaultDerivative from "./themes/default"
// import darkDerivative from "./themes/dark"
// import {seedColors} from "./themes/colorMap";
// import {computed} from "vue";
//
// export type CurrentType = string | number;
//
// export type ThemeOptions = {
//     themeList: SeedMap[],
//     current: number | string,
//     useDark: boolean
// }
//
// class Theme {
//     private themeList: MapToken[] = [];
//     private theme: MapToken | null = null;
//     private current: CurrentType = "light";
//
//     constructor({ themeList = [], current = 0, useDark = false } : ThemeOptions) {
//         this.current = current;
//         this.init(themeList, useDark);
//     }
//
//     init (themeList: SeedMap[], useDark = false) {
//         // 使用默认主题
//         if (!themeList.length) this.themeList = [
//             defaultDerivative(seedColors),
//             darkDerivative(seedColors)
//         ];
//         // 传入一个主题, 且生成对应的暗黑主题
//         else if(useDark && themeList.length === 1) this.themeList = [
//             defaultDerivative(themeList[0]),
//             darkDerivative(themeList[0])
//         ];
//         // 全部使用自己的主题
//         else this.themeList = themeList.map(seed => defaultDerivative(seed));
//         console.log("this.themeList : ", this.themeList);
//         this.theme = (
//             typeof this.current === "number" ?
//                 this.themeList[this.current] :
//                 this.themeList.find(theme => theme.id === this.current)
//             ) || null;
//     }
//
//     change(current: CurrentType) {
//         this.theme = (
//             typeof current === "number" ?
//                 this.themeList[current] :
//                 this.themeList.find(theme => theme.id === current)
//             ) || null;
//         if (this.theme) this.current = current;
//     }
//
//     getTheme() {
//         return computed(() => this.theme );
//     }
//
//     getCurrent() {
//         return computed(() => this.current );
//     }
// }
//
// export default Theme;
