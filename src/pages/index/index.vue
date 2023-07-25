<!--
 * @Author: error: git config user.name & please set dead value or install git
 * @Date: 2023-03-20 15:48:19
 * @LastEditors: 牛洪法 1242849166@qq.com
 * @LastEditTime: 2023-05-12 14:53:30
 * @FilePath: /Lib/src/pages/index/index.vue
 * @Description: 描述
-->
<template>
  <view class="content">
      <i-button type="danger" size="mini" open-type="share">222</i-button>
      <i-button round size="small">222</i-button>
      <i-button type="primary" size="normal">222</i-button>
      <i-button type="warning" size="big">222</i-button>
      <i-button type="info" size="large">222</i-button>
      <i-button type="success" size="big">222</i-button>
      <i-button type="success" size="60" round>2</i-button>
  </view>
</template>

<script setup lang="ts">
import IButton from "../../color-ui/packages/components/button/src/button.vue";
// import { useThemeStore } from "../../store/theme";
import { useThemeStore } from "../../color-ui/packages"
const useStore = useThemeStore();
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

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
