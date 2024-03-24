# I-UI

## 适用于 Vue3 + UniApp + Pinia + Typescript 的组件库

## 组件的开发进度与支持， 以【DEV.PLAN.md】文件标记为准

## [在线演示/文档](https://i.ilive.live/component)


#### 直接使用
```json
// page.json
{
    "easycom": {
		"autoscan": true,
		"custom": {
            // 根据自己喜欢，除去 I 其他方式的类型支持可以参考 「i-ui/global.d.ts」
            "^I(.*)": "i-ui/components/$1/index.vue"
		}
	},
    "pages": []
}
```
```json
// tsconfig.json
{
    "compilerOptions": {
        "types": [
            "i-ui/global.d.ts"
        ]
    },
}
```
```js
// store/theme.ts
import { defineStore } from 'pinia';
import { createThemeList } from "ipink-theme";
const themeList: any[] = [
    {"colorPrimary": "#16AD90", id: "gg"},
    {"colorPrimary": "#1677ff", id: "blue"},
    {"colorPrimary": "#2f54eb", id: "geekblue"},
    {"colorPrimary": "#13c2c2", id: "cyan"},
    {"colorPrimary": "#069b81", id: "gossamer"},
    {"colorPrimary": "#73d13d", id: "green"},
    {"colorPrimary": "#fadb14", id: "yellow"},
    {"colorPrimary": "#fa8c16", id: "orange"},
    {"colorPrimary": "#fa541c", id: "volcano"},
    {"colorPrimary": "#ff4d4f", id: "red"},
    {"colorPrimary": "#FC6572", id: "pink"},
    {"colorPrimary": "#818181", id: "gray"}
];
const list = createThemeList({ themeList, useDark: true });

export const useThemeStore = defineStore( 'theme', {
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
        }
    },
    persist: true
})
```
```Vue3
<!-- index.vue -->
<template>
    <IPage title="导航栏标题" useBack center>
        <ICard title="卡片标题">
            Card content
        </ICard>
    </IPage>
</template>
```

#### 涉及工具类
###### ipink-util 
* is.ts calendar.ts date.ts util.ts image.ts ...
###### @ctrl/tinycolor
###### ipink-theme 


#### 主题

#### 国际化

#### 默认提供 [I + ComponentName] 类型声明
* 例如 <IPicker />

#### 另行说明
* 在nvue内的支持未作出测试，预计在下个周期