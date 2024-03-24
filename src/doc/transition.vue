<template>

    <IPage>
        <INavigationBar title="Transition" useBack/>
        <IButton @click="changeIndex">{{!show ? "显示" : "隐藏"}}</IButton>
        <ISpace height="30rpx"/>
        <ITransition key="1" name="mask"
             mode-class="fade"
             :styles="{'width':'100px','height':'100px','backgroundColor':'red'}"
             :show="show" :duration="700"
        >
            <view :style="styleOptions">2211</view>
        </ITransition>
    </IPage>
</template>

<script lang="ts" setup>

    import {TinyColor} from "@ctrl/tinycolor";

    let index = ref(0.1);
    let show = ref(false);
    const styleOptions = computed(() => {
        return {
            background : new TinyColor("red").setAlpha(index.value ).toRgbString()
        }
    })
    const changeIndex = () => {
        show.value = !show.value;
        index.value += 0.1;
        if(index.value <= 0){
            index.value = 0.1;
        }
    }
</script>
