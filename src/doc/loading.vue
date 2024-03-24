<template>

    <IPage  center>
        <INavigationBar title="Loading" useBack/>
        红色的loading
        <ILoading type="0" color="red"/>
        原色的loading
        <ILoading type="3"/>
        不支持颜色
        <ILoading type="1"/>
        不支持颜色
        <ILoading type="2"/>
        Loading显示与关闭， 完全由v-if控制
        <IButton primary plain @click="openGlobalMskLoading">开启顶级Loading(3s后关闭)</IButton>
        <ILoading type="3" useMask v-if="isMaskLoading"/>
        <IButton primary plain @click="openPartMskLoading">开启/关闭一个局部Loading</IButton>
        <div style="height:400rpx; width: 400rpx;position: relative">
            <ILoading type="3" v-if="isPartLoading" usePartMask/>
        </div>
    </IPage>
</template>

<script lang="ts" setup>

const isMaskLoading = ref(false);
const openGlobalMskLoading = () => {
    isMaskLoading.value = true;
    setTimeout(() => {
        isMaskLoading.value = false;
    }, 3000)
}

const isPartLoading = ref(false);
const openPartMskLoading = () => {
    isPartLoading.value = !isPartLoading.value;
}
</script>
