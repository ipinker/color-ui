# Color-UI 实现

## 注意事项
#### uniapp环境下仅支持在ts环境开发
#### 组件优先以移动端为基础开发
#### 移动端完成后再进行管理端适配
#### 组件当以 css + html 为主, 少量js或尽量不用js
#### 兼容性不考虑 IE、以及6.0以下安卓、10.0以下苹果
#### 兼容性不考虑 IE、以及6.0以下安卓、10.0以下苹果

## 使用技术
* vue3
* typescript
* pinia

## 目录结构
``` lua
color-ui
├── assets 静态资源 
    ├── image
    └── fonts
├── common 内部部分依赖 
├── utils  内部用到的工具方法 
├── package ui 组件模块包
    ├── button
		├── adapter.vue 兼容适配文件
		├── index.vue   主体文件
		└── index.ts   
    ├── ... 
    └── theme
		├── themes 自带主题
		├── context.ts 
		└── index.ts 
├── index.js
└── package.json
```
## 实现的组件列表 (标记部分优先)
#### Alert      弹框 ✅
#### Audio      音频 
#### Badge      标记
#### Bg         背景 ✅
#### Border     边框 ✅
#### Breadcrumb 面包屑
#### Button     单个按钮 ✅ 
#### ButtonGroup 按钮组 ✅
#### Calculator 计算器 ✅
#### Calendar   日历 ✅
#### Card       卡片 ✅
#### Cascader   级联选择器 ✅
#### Check      复选框 ✅
#### CheckBox   复选框盒子 ✅ 
#### City       城市选择 
#### Col        Flex.Column ✅
#### Collapse   折叠面板 ✅
#### Color      颜色 ✅
#### Darg       拖 ✅
#### Date       日期 ✅
#### DatePicker 日期选择器 ✅
#### DateTimePicker 日期时间选择器 ✅
#### Desc       描述 label: value 布局 ✅
#### Drawer     抽屉 ✅
#### Editor     富文本编辑器 ✅
#### Empty      无数据 ✅
#### Error      错误数据 ✅
#### Form       表单 ✅
#### FormItem   表单子选项 ✅
#### Icon       图标 ✅
#### Image      图片 ✅
#### ImageCode  图形验证码 
#### Counter    计数器 ✅
#### Keyboard   键盘 
#### Link       跳转 ✅
#### Loading    加载 ✅
#### Hr         分割线 ✅
#### NavigationBar  移动端导航栏 ✅
#### Number     数值 ✅
#### Page       公共页面 ✅
#### PageHeader 页头
#### Pagination 分页
#### Picker     选择器 ✅
#### Popup      遮罩 ✅
#### Progress   进度条 
#### Qrcode     验证码 
#### Radio      单选框 ✅
#### RadioBox   单选框盒子 ✅ 
#### Rate       评分 
#### RichView   富文本显示器 ✅
#### Row        Flex.Row ✅
#### Scroll     滑动区域 ✅
#### Skeleton   骨架屏 ✅
#### Slider     滑块 
#### Space      占位 ✅
#### Swiper     轮播图 ✅
#### Switch     开关 ✅
#### Steps      步骤条 
#### Table      表格 
#### Tabbar     应用底部Tabbar ✅
#### Tabs       标签页 ✅
#### Timeline   时间线 
#### TimePicker 时间Picker ✅
#### Tip        提示 
#### Tooltip    文字提示 ✅
#### Transition 过度 ✅
#### Video      视频   
#### Upload     上传 ✅


## 扩展功能
#### 主题

## 如何使用
#### 不涉及到主题
```javascript
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import ColorUI from "color-ui";

const app = createApp(App);
app.use(store);
app.use(ColorUI);
```

#### 外部注入主题
```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import ColorUI from "color-ui";
import SelfTheme from "./commom/theme.js"

const app = createApp(App);
app.use(store);
app.use(ColorUI, {
  theme: SelfTheme,
  themeList: [SelfTheme],
  lang: "ch"
});
```

```javascript
// commom/theme.js
export default {
  primary: "#889900",
  white: "#FEFEFE",
}
```


#### 动态主题切换
```vue
// src/pages/home/index.vue
<script setup>
  
import { useThemeStore } from "color-ui"
const useStore = useThemeStore();
useStore.change("dark")
</script>
```
```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import ColorUI from "color-ui";
import ThemeList from "./commom/theme.js"

const app = createApp(App);
app.use(store);
app.use(ColorUI, {
  themeList: ThemeList, // 不传提供默认的黑白
  id: "id"// 主题的id, 单个主题无需传入, 读取 themeList[0]
});
```
```javascript
// commom/theme.js
export default [
    
]
```
#### 使用主题自带颜色值
```vue
<template>
  <div :style="[primaryBackground, whiteFont]">
    Hello World
  </div>
</template>
<script setup>
import { useThemeStore } from "color-ui"
const useStore = useThemeStore();
console.log(useStore.theme)
console.log(useStore.theme.colorPrimary)
const [ light, dark ] = useStore.themeList;
console.log({...light})
console.log({...dark})
console.log(light.colorWhite)
console.log(light.colorBgBase)
console.log(light.colorError)
console.log(light.colorPrimary)
console.log(dark.colorWhite)
console.log(dark.colorBgBase)
console.log(dark.colorError)
console.log(dark.colorPrimary)
</script>
```
