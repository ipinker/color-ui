import type {MapToken, SeedMap} from "../theme/interface";
import defaultDerivative from "./themes/default"
import darkDerivative from "./themes/dark"
import {seedColors} from "./themes/colorMap";
import {computed} from "vue";

export type CurrentType = string | number;

export type ThemeOptions = {
    themeList: SeedMap[],
    current: number | string,
    useDark: boolean
}

class Theme {
    private themeList: MapToken[] = [];
    private theme: MapToken | null = null;
    private current: CurrentType = "light";

    constructor({ themeList = [], current = 0, useDark = false } : ThemeOptions) {
        this.current = current;
        this.init(themeList, useDark);
    }

    init (themeList: SeedMap[], useDark = false) {
        // 使用默认主题
        if (!themeList.length) this.themeList = [
            defaultDerivative(seedColors),
            darkDerivative(seedColors)
        ];
        // 传入一个主题, 且生成对应的暗黑主题
        else if(useDark && themeList.length === 1) this.themeList = [
            defaultDerivative(themeList[0]),
            darkDerivative(themeList[0])
        ];
        // 全部使用自己的主题
        else this.themeList = themeList.map(seed => defaultDerivative(seed));
        console.log("this.themeList : ", this.themeList);
        this.theme = (
            typeof this.current === "number" ?
                this.themeList[this.current] :
                this.themeList.find(theme => theme.id === this.current)
            ) || null;
    }

    change(current: CurrentType) {
        this.theme = (
            typeof current === "number" ?
                this.themeList[current] :
                this.themeList.find(theme => theme.id === current)
            ) || null;
        if (this.theme) this.current = current;
    }

    getTheme() {
        return computed(() => this.theme );
    }

    getCurrent() {
        return computed(() => this.current );
    }
}

export default Theme;
