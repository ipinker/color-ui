<template>
   <IPage title='Theme（主题）' useBack>
        <ICard title="基本使用">
            <view class="code">import {useThemeStore} from "i-uni-ui/theme"</view>
            <view class="code">const themeStore = useThemeStore()</view>
            <view class="code">themeStore.get("blue") // 获取blue主题，如果开启了暗黑则获取主题的指定模式</view>
            <view class="code">themeStore.theme // 当前在使用的主题 ColorToken </view>
            <view class="code">themeStore.mode  // 当前主题所显示模式 dark | light </view>
            <view class="code">themeStore.change(id?: string)  // 切换到指定主题 </view>
            <view class="code">themeStore.changeMode(mode?:dark | light)  // 切换到指定模式 </view>
            <view class="code">themeStore.add(seed: SeedOption)  // 添加主题 </view>
            <view class="code">themeStore.addList(seedList: SeedOption[])  // 添加多个主题 </view>
            <view class="code">themeStore.del(id: string)  // 删除主题 </view>
            <view class="code">themeStore.sort(sortFunction: Function)  // 主题排序 </view>
            <view class="code">themeStore.init(seedList: SeedOption[])  // 初始化默认主题列表 </view>
        </ICard>

        <ICard title="主题操作（Methods）">
            <IForm class="form">
                <IInput class="input" border placeholder="Enter colorPrimary" 
                    :style="{backgroundColor: primaryColor}" v-model="primaryColor" />
                <IInput class="input" border placeholder="Enter colorWarning"
                    :style="{backgroundColor: warningColor}" v-model="warningColor"/>
                <IInput class="input" border placeholder="Enter colorSuccess"
                    :style="{backgroundColor: successColor}" v-model="successColor"/>
                <IInput class="input" border placeholder="Enter colorError"
                    :style="{backgroundColor: errorColor}" v-model="errorColor"/>
                <IInput class="input" border placeholder="Enter colorInfo" 
                    :style="{backgroundColor: infoColor}" v-model="infoColor"/>
                <IRow justify="around" style="margin-bottom: 15px">
                    <IButton primary @click="handleGenTheme('push')">向后添加主题</IButton>
                    <IButton primary plain @click="handleGenTheme('unshift')">向前添加主题</IButton>
                </IRow>

                <IForm class="form">
                    <IInput class="input" type="number" border :placeholder="'输入要删除的索引 0~'+(list.length-1)" :maxlength="list.length-1" v-model="delIndex" />
                    <IButton plain error @click="handleDelByIndex">删除</IButton>
                </IForm>
            </IForm>
        </ICard>
       <ICard title="当前主题列表（点击切换主题）S/W/E/I">
            Primary | Success | Error | Warning | Info
            <ICell @click="handleTheme(item)" :styleOption="styleOption(item)" v-for="item in list" :key="item.id">
                <text>{{item.id}}</text>
                <text class="full"></text>
                <text class="itemColor" :style="{backgroundColor : item.colorSuccess}">S</text>
                <text class="itemColor" :style="{backgroundColor : item.colorError}">E</text>
                <text class="itemColor" :style="{backgroundColor : item.colorWarning}">W</text>
                <text class="itemColor" :style="{backgroundColor : item.colorInfo}">I</text>
            </ICell>
       </ICard>
   </IPage>
   <view class="IThemeButtonFloat">
       <IThemeButton size="80"/>
   </view>
</template>

<script setup lang='ts'>
import { ComputedRef, StyleValue, ref, computed } from 'vue';
import { useThemeStore } from "@/uni_modules/i-ui/theme"
import { ColorToken } from 'ipink-theme';
import { SeedKey } from '@/typings';

const theme = useThemeStore();
const shadowColor = computed(() =>theme.theme?.colorInfoShadow);
const textColor = computed(() => theme.theme?.colorText);
const bgColor = computed(() => theme.theme?.colorBgContainer);
const primaryBg = computed(() => theme.theme?.colorPrimary)
const list = computed(() => {
    const map: any = {};
    theme.themeList.forEach(item => {
        if(item.id.indexOf(theme.mode) > -1){
            const _item = JSON.parse(JSON.stringify(item));
            const key: SeedKey = _item.id.split("-")[0] as SeedKey;
            map[key] = _item
        }
    })
    return Object.values(map) as ColorToken[]
});
const delIndex = ref()

const primaryColor = ref();
const warningColor = ref();
const successColor = ref();
const errorColor = ref();
const infoColor = ref();

function handleGenTheme(dir: "push" | "unshift") {
    theme.add({
        colorPrimary: primaryColor.value,
        colorWarning: warningColor.value,
        colorSuccess: successColor.value,
        colorError: errorColor.value,
        colorInfo: infoColor.value,
        id: Date.now().toString()
    }, dir)
}

function handleDelByIndex() {
    if(delIndex.value >= 0 && list.value[delIndex.value]) theme.del(list.value[delIndex.value].id.split("-")[0])
}

function handleTheme(item: ColorToken) {
    theme.change(item.id);
}

const styleOption = computed(() => {
    return (item: ColorToken): StyleValue => {
        return {
            backgroundColor: item.colorPrimary,
            marginBottom: '10px',
            color: theme.theme?.colorWhiteTextBase
        }
    }
})
</script>

<style lang='scss'>
   

.IThemeButtonFloat {
    position: fixed;
    right: 50rpx;
    bottom: 50rpx;
    background-color: v-bind(bgColor);
    box-shadow: 0 4rpx 12rpx v-bind(shadowColor);
    color: v-bind(textColor);
    border-radius: 50%;
}

.input,
view.input {
    margin-bottom: 8px;
}

.code {
    font-size: $i-font-xxxs;
    line-height: $i-line-s;
}

.itemColor {
    display: inline-block;
    width: 20px;
    height: 100%;
    margin-right: 10px;
    text-align: center;
}
</style>