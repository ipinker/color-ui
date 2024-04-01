<template>
	<IPage style="padding: 0 20rpx" center title="组件预览">
        <ICard useHeader full title="Basic（基础）">
            <ICell label="NavigationBar（导航栏）" url="/doc/navigationBar"/>
            <ICell label="Empty（暂无数据）" url="/doc/empty"/>
            <ICell label="Icon (图标)" url="/doc/icon"/>
            <ICell label="Result（结果页）" url="/doc/result"/>
            <ICell label="Space（空白占位符）" url="/doc/space"/>
            <ICell label="Loading（加载中）" url="/doc/loading"/>
            <ICell label="Title（标题）" url="/doc/title"/>
            <ICell label="Transition（动画）" url="/doc/transition"/>
        </ICard>

        <ICard useHeader full title="Container（容器）">
            <ICell label="Page（页面根结点，推荐每个页面集成）" url="/doc/page"/>
            <ICell label="Card（卡片）" url="/doc/card"/>
            <ICell label="Grid (网格)" url="/doc/grid"/>
            <ICell label="Bg（透明背景）" url="/doc/bg"/>
        </ICard>

        <ICard useHeader full title="Function（功能性组件）">
            <ICell label="ThemeButton（切换主题按钮）" url="/doc/themeButton"/>
            <ICell label="FloatButton（浮动按钮）" url="/doc/floatButton"/>
            <ICell label="Tabbar（底部Tab）" url="/doc/tabbar"/>
            <ICell label="Cell（单元跳转）" url="/doc/cell"/>
        </ICard>

        <ICard useHeader full title="Form">
            <ICell label="Form（表单）" url="/doc/form"/>
            <ICell label="Button（按钮）" url="/doc/button"/>
            <ICell label="Input（输入框）" url="/doc/input"/>
            <ICell label="Check（复选框）" url="/doc/check"/>
            <ICell label="Radio（单选框）" url="/doc/radio"/>
            <ICell label="Switch（开关）" url="/doc/switch"/>
            <ICell label="Number (数字输入框)" url="/doc/number"/>
        </ICard>
        <ICard useHeader full title="Selector（选择器）">
            <ICell label="Calendar（日历）" url="/doc/calendar"/>
            <ICell label="Color (色彩选择)" url="/doc/color"/>
            <ICell label="Cascader（级联选择器）" url="/doc/cascader"/>
            <ICell label="Date（日期时间选择器）" url="/doc/date"/>
            <ICell label="Picker（滚动联选择器）" url="/doc/picker"/>
            <ICell label="Select（选择器）" url="/doc/select"/>
        </ICard>
        <ICard useHeader full title="Popup">
            <ICell label="Popup（遮罩）" url="/doc/popup"/>
            <ICell label="Dialog（交互弹框）" url="/doc/dialog"/>
            <ICell label="Drawer（抽屉）" url="/doc/drawer"/>
            <ICell label="Sheet（操作列表）" url="/doc/sheet"/>
            <ICell label="Tip（状态提示）" url="/doc/tip"/>
        </ICard>
        <ICard useHeader full title="Icon">
            <ICell label="FontIcon（字体图标）" url="/doc/fontIcon"/>
        </ICard>
        <ICard useHeader full title="Flex（布局）">
            <ICell label="Row（横向布局）" url="/doc/row"/>
            <ICell label="Col（纵向布局）" url="/doc/col"/>
        </ICard>

		<view class="IThemeButtonFloat">
			<IThemeButton size="80"/>
		</view>
	</IPage>
</template>

<script setup lang="ts">
    import { useThemeStore } from "@/uni_modules/i-ui/theme"
    const themeStore = useThemeStore();
    const shadowColor = computed(() =>themeStore.theme?.colorInfoShadow);
    const textColor = computed(() => themeStore.theme?.colorText);
    const bgColor = computed(() => themeStore.theme?.colorBgContainer);
    const { font, borderLeft, bg } = useStyle();


    onMounted(() => {
        console.log({... themeStore.theme})
        // #ifdef H5
        document.title = "测试"
        // #endif
    });
</script>

<style lang="scss">

.IThemeButtonFloat {
    position: fixed;
    right: 50rpx;
    bottom: 50rpx;
    background-color: v-bind(bgColor);
    box-shadow: 0 4rpx 12rpx v-bind(shadowColor);
    border-radius: 50%;
}
</style>