<template>

    <IPage>
        <INavigationBar title="Popup" useBack/>
        <IButton primary @click="openPopup">打开弹窗</IButton>
        <IPopup ref="popupRef" type="bottom">
            <view class="flex-column DialogComponent" :style="[bg('colorBgContainer')]"></view>
        </IPopup>
    </IPage>
</template>

<script setup lang="ts">
import { useStyle } from "@/uni_modules/i-ui/hooks/useStyle";
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
const { bg } = useStyle();

const popupRef = ref(null);

const openPopup = () => {
    const el: any = popupRef.value as any;
    el?.open && el.open();
}
</script>

<style>

.DialogComponent {
    width: 500rpx;
    height: 550rpx;
}
</style>
