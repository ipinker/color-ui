<template>
    <c-page class="page">
        <view class="theme-card">
            <view>主题色</view><view :style="genBgStyle(primary)"></view>
        </view>

        <view class="theme-card">
            <view>青色</view>
        </view>
    </c-page>
</template>

<script lang="ts" setup>
import {useThemeStore} from "../../../../color-ui/dist"
import {computed} from "vue";

const useStore = useThemeStore();

const primary = computed(() => useStore.theme?.colorPrimary)

const genBgStyle = (color: string): string => `background-color: ${color}`;
</script>

<style lang="scss">
.page {
    padding-top: 1rpx;
}
.theme-card {
    display: flex;
    margin: 20rpx;
    & :first-child {
        font-size: 32rpx;
        color: #585858;
        margin-right: 20rpx;
        line-height: 50rpx;
    }
    & :last-child {
        width: 100rpx;
        height: 50rpx;
    }
}
</style>
