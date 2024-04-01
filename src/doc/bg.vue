<template>
    <IPage title="Bg(合成背景容器)" useBack center>
        <div class="w-200px h-200px relative bg-red-300">
            <IBg
                :bgColor="bgColor"
                :color="color"
                :opacity="opacity"
                :width="width"
                :height="height"
                :center="center"
            >
                <text>Content value</text>
            </IBg>
        </div>
        <ICard title="Props" width="690">
            <ITitle>bgColor: <IInput v-model="bgColor" border/></ITitle>
            <ITitle>color: <IInput v-model="color" border/></ITitle>
            <ITitle>opacity: <IInput v-model="opacity" border/></ITitle>
            <ITitle>width : <IInput v-model="width" border/></ITitle>
            <ITitle>height: <IInput v-model="height" border/></ITitle>
            <ITitle>center: <ISwitch v-model="center"/></ITitle>
            <ITitle>bgStyleOption 背景扩展样式 { Object }</ITitle>
            <ITitle>styleOption 内容扩展样式 { Object }</ITitle>
        </ICard>
        <ICard title="Event" width="690">
            <ITitle>click</ITitle>
        </ICard>
        <ICard title="Slots" width="690">
            <ITitle>default</ITitle>
        </ICard>
    </IPage>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, nextTick, onMounted } from "vue"
const bgColor = ref("colorPrimary");
const color = ref("colorPrimaryText");
const opacity = ref(0.3);
const width = ref();
const height = ref();
const center = ref(true);
</script>
