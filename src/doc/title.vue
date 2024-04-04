<template>
    <IPage title="Title (标题)" useBack>
        <ITitle :styleOption="[styleOption]"
            :title="title"
            :color="color"
            :width="width"
            :showSign="showSign"
        />
        <ICard title="Props">
            <ITitle>title <IInput v-model="title" border/></ITitle>
            <ITitle>width <IInput v-model="width" border/></ITitle>
            <ITitle>color <IInput v-model="color" border/></ITitle>
            <ITitle>showSign <ISwitch v-model="showSign"/></ITitle>
            <ITitle>styleOption 扩展样式 { StyleValue }</ITitle>
            <code>{{styleOption}}</code>
        </ICard>
        <ICard title="Slots">
            <ITitle>default</ITitle>
        </ICard>
    </IPage>
</template>

<script setup lang='ts'>
import { ref, computed, Ref, watch, onMounted, nextTick } from "vue"
const title = ref("Title (标题)");
const width = ref("");
const color = ref("");
const showSign = ref(true);
const styleOption = {
    backgroundColor : "rgba(0, 255, 0, 0.3)"
}
</script>

<style lang='scss'>
   
</style>