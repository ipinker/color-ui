<!--  开发指南 (Developer`s Guide)  -->

# Color-UI 开发指北

## 注意事项
* 以移动端尺寸为基准
* 移动端以设计图 375 为基准
* 全局 CSS 单位使用px (后期打包将使用第三方工具将px 转为rem/rpx/px)
* 兼容性不考虑 IE、以及6.0以下安卓、10.0以下苹果
* 涉及到的颜色, 字体均以js插入, 即 css使用 v-bind()
* 涉及到的颜色取用需要使用内部支持的颜色为主, 不可使用非组件内提供的颜色值
* 设计 Layout 布局待定

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
## 布局 (Layout)
* 考虑使用slot实现该功能
#### Layout 布局壳子
#### Header 导航头部
#### Sider 侧边栏
#### Content 内容区域
#### Footer 网页底部
* PC 考虑以下几种布局
```html
<!-- 1. 上中下 -->
<Layout>
    <Header />
    <Content />
    <Footer />
</Layout>
<!-- 1. 上中(左右)下 -->
<Layout row>
    <Header />
    <Layout row>
        <Sider />
        <Content />
    </Layout>
    <Footer />
</Layout>

<!-- 1. 左右 -->
<Layout row>
    <Sider />
    <Content />
</Layout>

<!-- 1. 左右(上中下) -->
<Layout row>
    <Sider />
    <Layout>
        <Header />
        <Content />
        <Footer />
    </Layout>
</Layout>
```
* Phone 做以下适配处理
```html
<!-- 以下两种情况 sider 做抽屉化处理, 存在可控制的导航栏或者存在Header时 -->
<!-- 1. 上中(左右)下 -->
<Layout row>
    <Header />
    <Layout row>
        <Sider />
        <Content />
    </Layout>
    <Footer />
</Layout>

<!-- 1. 左右(上中下) -->
<Layout row>
    <Sider />
    <Layout>
        <Header />
        <Content />
        <Footer />
    </Layout>
</Layout>
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
```ts
import { useThemeStore } from "color-ui";
import type { TokenMap, PresetColorType, SeedMap } from "color-ui";
const store = useThemeStore();
// 此种丧失响应
// const { theme, id, themeList } = store;
// 推荐
const theme: TokenMap = computed(() => store.theme);

// 内置预设的颜色变量
const defaultPresetColors: PresetColorType = {
  blue: '#1677ff',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#F5222D',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
}
// 整个完整配置
const seedColors: SeedMap = {
  // 主题对应的唯一ID
  id: "light",
  // preset color palettes
  ...defaultPresetColors,
  // Color
  "colorPrimary": "#1677ff",
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1677ff',
  colorLink: '',
  colorTextBase: '',
  colorBgBase: '',
  colorShadowBase: '',

  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  // 默认基准字体大小 
  fontSize: 14,

  // Radius
  borderRadius: 6,

  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,

  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1000,
}

// 注传入的 SeedMap 并不是最终的配置, 内部会对 基准单位和基准颜色进行衍生
// 最终生成 TokenMap 类型

```