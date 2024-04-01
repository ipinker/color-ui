<template>
    <IPage title="Color (颜色选择器)" useBack center>
        <ISpace height="20rpx"/>
        <IColor v-model="color"
                :width="width"
                :height="height"
                :disableFields="disableFields"
                :showButton="showButton"
                :disableAlpha="disableAlpha"

        ></IColor>
        <ISpace height="20rpx"/>
        <ICard title="Props" width="690rpx">
            <ITitle>width：<IInput v-model="width" placeholder="480" border/></ITitle>
            <ITitle>height：<IInput v-model="height" placeholder="auto" border/></ITitle>
            <ITitle>showButton：<ISwitch v-model="showButton"/></ITitle>
            <ITitle>disableAlpha：<ISwitch v-model="disableAlpha"/></ITitle>
            <ITitle>disableFields：<ISwitch v-model="disableFields"/></ITitle>
        </ICard>
        <ICard title="Emits" width="690rpx">
            <ITitle>confirm</ITitle>
            <ITitle>cancel</ITitle>
        </ICard>
    </IPage>
</template>

<script lang="ts" setup>
import {Ref} from "vue";
import {ColorInfo} from "@/i-ui";

const color: Ref<ColorInfo> = ref({
    hex: '#7ED321'
})

const width = ref("600");
const height = ref("");
const showButton = ref(false);
const disableAlpha = ref(false);
const disableFields = ref(false);
</script>

<style lang="scss">

.IColComponent {
    width: 400rpx;
    height: 400rpx;
}
</style>
@/uni_modules/i-ui