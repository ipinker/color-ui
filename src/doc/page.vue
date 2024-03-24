<template>
    <IPage
        :center="center"
        :title="title"
        :titleAlign="titleAlign"
        :useBack="useBack"
        :isLoading="isLoading"
        :loadingType="loadingType"
        :usePrimary="usePrimary"
        :status="status"
    >
        <ICard title="Props">
            内部导航栏专有属性
            <ITitle>title 页面标题，同 NavigationBar</ITitle>
            <ITitle>titleAlign 标题位置 同 NavigationBar</ITitle>
            <ITitle>usePrimary 导航栏主题化<ISwitch v-model="usePrimary"/></ITitle>
            <ITitle>useBack 显示返回按钮<ISwitch v-model="useBack"/></ITitle>
            页面组件属性
            <ITitle>status 页面状态 { PageStatus }</ITitle>
            <ITitle>center 页面居中 <ISwitch v-model="center"/></ITitle>
            加载
            <ITitle>isLoading 加载中 <ISwitch v-model="isLoading"/></ITitle>
            <ITitle>loadingType  同 Loading 组件</ITitle>
        </ICard>
        <ICard title="Slots">
            <ITitle>operate</ITitle>
        </ICard>
    </IPage>
</template>

<script setup lang="ts">
const title = ref("Page (统一根页面容器)");
const titleAlign = ref("center");
const usePrimary = ref(true);
const useBack = ref(true);
const center = ref(false);
const isLoading = ref(false);
const loadingType = ref();
const status = ref("default");
</script>

<style lang="scss" scoped>
</style>
