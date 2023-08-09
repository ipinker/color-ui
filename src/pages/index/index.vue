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
        <view v-for="(item,index) in Components" :key="index">

            <view class="i-title"> 基础组件 </view>
            <view class="i-card i-link">
                <view class="i-link-item ActiveGray"
                    v-for="(child, childIndex) in item.components" :key="'-' + childIndex"
                    @click="goDetail(child, item)"
                >
                    <view class="i-link-item-label">{{ child.title }}</view>
                    <view class="i-link-item-icon iconfont icon-xiangyou"></view>
                </view>
            </view>
        </view>
    </c-page>
</template>

<script setup lang="ts" scoped>
import {useThemeStore} from "../../../color-ui/dist"
import {computed, ref} from "vue";
import Components, {ComponentItem, ComponentsItem} from "../../common/config/components";
const useStore = useThemeStore();

const changeTheme = () => {
    const id = useStore.id;
    useStore.change(id === "dark" ? "light" : "dark");

    console.log({...useStore.theme});
}
const goDetail = (child: ComponentItem, parent: ComponentsItem) => {
    const url = `${child.path}?title=${child.title}&parentTitle=${parent.title}`;
    console.log(url)
    uni.navigateTo({
        url
    })
}
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
