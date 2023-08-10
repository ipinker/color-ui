<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
* @LastEditors: white_queen
* @LastEditTime: 2023-08-03 11:22:15
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
    <c-page>
        <view class="type flex" data-label="Button`s type">
            <IButton type="default">default</IButton>
            <IButton type="primary">primary</IButton>
            <IButton type="success">success</IButton>
            <IButton type="danger">danger</IButton>
            <IButton type="warning">warning</IButton>
            <IButton type="info">info</IButton>
        </view>
        <view class="type plain flex" data-label="Button`s plain">
            <IButton type="default" plain>default</IButton>
            <IButton type="primary" plain>primary</IButton>
            <IButton type="success" plain>success</IButton>
            <IButton type="danger" plain>danger</IButton>
            <IButton type="warning" plain>warning</IButton>
            <IButton type="info" plain>info</IButton>
        </view>
        <view class="disabled flex" data-label="Button`s disabled">
            <IButton type="disabled">disabled</IButton>
            <IButton type="text" disabled>disabled</IButton>
        </view>
        <view class="size flex" data-label="Button`s size">
            <IButton size="small">small</IButton>
            <IButton size="normal">normal</IButton>
            <IButton size="big">big</IButton>
            <IButton size="120,50">120,50</IButton>
            <IButton size="500,80">500,80-自定义size会自动化隐藏</IButton>
        </view>
        <view class="round flex" data-label="Button`s round">
            <IButton icon="icon-sousuo" round></IButton>
            <IButton type="primary" icon="icon-sousuo" round></IButton>
            <IButton type="primary" plain icon="icon-sousuo" round></IButton>
            <i-button type="success" size="60" round>2</i-button>
        </view>
        <view class="icon flex" data-label="Button`s icon">
            <IButton type="primary" icon="icon-sousuo">搜索</IButton>
            <IButton type="primary" plain icon="icon-sousuo">搜索</IButton>
            <IButton type="primary" icon="icon-shenghuojiaofei">缴费</IButton>
            <IButton type="primary" plain icon="icon-shenghuojiaofei">缴费</IButton>
        </view>
        <view class="func flex" data-label="Button`s text">
            <IButton type="text">普通文本</IButton>
            <IButton type="link">链接文本</IButton>
            <IButton type="text" icon="icon-sousuo">普通文本</IButton>
            <IButton type="link" plain icon="icon-sousuo">链接文本</IButton>
        </view>

        <view class="color flex" data-label="Button`s color">
            <IButton color="red">Red Text</IButton>
            <IButton bg="red">Red Bg</IButton>
            <IButton bg="red" color="white">Red Bg White Text</IButton>
            <IButton bg="red" plain>Red Bg And Plain</IButton>
        </view>

        <view class="radius flex" data-label="Button`s radius">
            <IButton color="red" radius="default">Radius</IButton>
            <IButton color="red" radius="xs">Radius-XS</IButton>
            <IButton color="red" radius="sm">Radius-SM</IButton>
            <IButton color="red" radius="lg">Radius-LG</IButton>
            <IButton color="red" radius="20">Radius-20</IButton>
        </view>
        <view class="block flex" data-label="Button`s block">
            <IButton block>Block - 宽度撑满父元素</IButton>
        </view>
        <view class="loading flex" data-label="Button`s loading">
            <IButton loading>Loading</IButton>
            <IButton type="primary" :loading="loading" @click="getLoadingClick">Loading</IButton>
            <IButton type="primary" :loading="loading" @click="getLoadingClick" icon="icon-sousuo">Loading</IButton>
            <IButton type="primary" @click="loading=!loading">{{loading ? "停止" : "开始"}}</IButton>
        </view>
        <view class="theme flex" data-label="Button`s theme">
            <i-button type="primary" size="big" plain @click="changeTheme"> 切换主题</i-button>
        </view>
    </c-page>
</template>

<script setup lang="ts" scoped>
import {useThemeStore} from "../../../../color-ui/dist"
import {IButton} from "../../../../color-ui/dist";
// import {useThemeStore} from "test-publish"
// import { IButton } from "test-publish";
import {computed, ref} from "vue";

const useStore = useThemeStore();
let pageColor, themeColor;
pageColor = computed(() => useStore.theme?.colorBgLayout);
themeColor = computed(() => useStore.theme?.colorPrimary);
// // // const [ light, dark ] = useStore.themeList;
// // // console.log({...light})
// // // console.log({...dark})
// // // console.log(light.colorWhite)
// // // console.log(light.colorBgBase)
// // // console.log(light.colorError)
// // // console.log(light.colorPrimary)
// // // console.log(dark.colorWhite)
// // // console.log(dark.colorBgBase)
// // // console.log(dark.colorError)
// // // console.log(dark.colorPrimary)
const changeTheme = () => {
    const id = useStore.id;
    useStore.change(id === "dark" ? "light" : "dark");

    console.log({...useStore.theme});
}

let loading = ref(false);
const getLoadingClick = console.log;
</script>

<style lang="scss" scoped>
.content {
    width: 100vw;
    min-height: 100vh;

    view.flex::before {
        width: 100%;
        content: attr(data-label);
        color: v-bind(themeColor);
        line-height: 80rpx;
        margin-top: 20rpx;
        border-top: 1px solid #eee;
    }
}

.flex {
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    & > :nth-child(n) {
        margin: 10rpx 20rpx;
    }

}

</style>
