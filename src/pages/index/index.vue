<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
* @LastEditors: white_queen
* @LastEditTime: 2023-08-02 16:09:53
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
    <view class="content">
        <IButton type="danger" size="mini" open-type="share">222</IButton>
        <IButton size="small">222</IButton>
        <IButton type="dashed" size="small">222</IButton>
        <i-button type="primary" size="normal">222</i-button>
        <i-button type="warning" size="big">222</i-button>
        <i-button type="info" size="large">222</i-button>
        <i-button type="success" size="big">222</i-button>
        <i-button type="success" size="60" round>2</i-button>
        <i-button type="primary" plain @click="changeTheme"> 切换主题</i-button>
    </view>
</template>

<script setup lang="ts">
import {useThemeStore} from "test-publish/index"
import { IButton } from "test-publish/index";
import {computed} from "vue";
const useStore = useThemeStore();
let pageColor;
pageColor = computed(() => useStore.theme?.colorBgLayout);
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

    console.log(useStore.theme?.colorPrimaryShadow);
}
</script>

<style lang="scss" scoped>
@import "test-publish/dist/style.css";
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: v-bind(pageColor);
    min-height: 100vh;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
