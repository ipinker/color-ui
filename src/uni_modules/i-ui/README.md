# I-UI

## 适用于 Vue3 + UniApp + Pinia + Typescript 的组件库

## 组件的开发进度与支持， 以【DEV.PLAN.md】文件标记为准

## [在线演示/文档](https://i.ilive.live/component)


#### 直接使用
* **使用 uni_modules**
* 1. 将 uni_modules/i-ui 放入项目的 uni_modules 的文件下， 没有则创建
* 2. 在 page.json 写入 easycom 规则
* 3. 在 tsconfig.json 类型加入 global.d.ts 类型声明文件，（根据自己项目的类型， 按照实际文件路径填写）
* 4. 内置主题 uni_modules/i-ui/theme.ts，外部可引用后可直接使用，用到的库 pinia + pinia-plugin-persistedstate

```json
// page.json 编写 easycom 规则
{
    "easycom": {
		"autoscan": true,
		"custom": {
            // 根据自己喜欢，除去 I 其他方式的类型支持可以参考 「i-ui/global.d.ts」
            "^I(.*)": "@/uni_modules/i-ui/components/$1/index.vue"
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
            "src/uni_modules/i-ui/global.d.ts"
        ]
    },
}
```
```Vue3
<!-- index.vue -->
<!-- 页面使用 -->
<template>
    <IPage title="导航栏标题" useBack center>
        <ICard title="卡片标题">
            Card content
        </ICard>
    </IPage>
</template>
```
```js
// store/index.ts
// 持久化，此处仅为实例， 也可使用 ipink-uti/storage.ts
import * as pinia from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

export const Pinia = pinia;

const store = Pinia.createPinia();

store.use(
    createPersistedState({
		storage: {
		    getItem: uni.getStorageSync,
		    setItem: uni.setStorageSync,
		},
    }),
)

export default store;
```
```css
// 以下两个文件引入scs文件
// app.vue 
<style lang="scss">
@import "@/uni_modules/i-ui/components/index.scss";
<style>
// uni.scss 
@import "@/uni_modules/i-ui/components/index.scss";
```

```vue3
<!-- 主题使用Demo -->
<script setup lang="ts">
import { useThemeStore } from "@/uni_modules/i-ui/theme.ts"
import { SeedOption } from "@/uni_modules/i-ui/type"

const themeStore = useThemeStore();
const theme = themeStore.theme; // 当前主题可使用的变量集合
/*
    theme.colorPrimary
    theme.colorSuccess
    ... 
    可使用的主题健值实例， 参考：https://i.ipink.pink/app/#/pages/components/theme/colorful
    实际使用可将 theme 打印出来参阅
*/
/* 内置的 themeList, 每个成员可传对象必须有id，其他的字段参考 SeedMao 类型
    const THEME_LIST: SeedOption[] = [
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
    ]
*/
const changeThemeMode = () => {
    // changeMode();       // 切换模式  light ｜ dark
    // change(id: string); // 切换主题, 内置： 
    // get(id: string);    // 获取指定的主题（模式默认当前模式）
    // init(themeList: ColorOption[]) // 初始化内置主题， 可以将原内置主题覆盖
    // add(theme: ColorOption) // 添加主题
    // del(id: string) // 删除主题
    // sort(sortFunction: Function) // 排序主题
    themeStore.changeMode();
}
</script>
```


* **使用 npm **
* 1. npm install -S i-uni-ui  或者  pnpm add i-uni-ui
* 2. 其他将以上方式 @/uni_modules/ 改为 i-uni-ui/
* 3. 。。。

#### 涉及工具类
###### ipink-util 
* is.ts calendar.ts date.ts util.ts image.ts ...
###### @ctrl/tinycolor
###### ipink-theme 


#### 主题

#### 国际化

#### 默认提供 [I + ComponentName] 类型声明
* 例如 <IPicker />， 自定义可参考 uni_modules/i-ui/global.d.ts在根目录创建一个自己的

#### 另行说明
* 在nvue内的支持未作出测试，预计在下个周期
* uniapp-x, 预计在下下周期启动，i-ui-x