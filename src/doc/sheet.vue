<template>
   <IPage title='操作列表' useBack>
       <ICard title="Preview">
            <IButton @click="handleOpen">打开</IButton>

       </ICard>
   </IPage>
   <ISheet ref="sheetRef"/>
</template>

<script setup lang='ts'>
import { PopupRefType, SheetRef } from "@/uni_modules/i-ui/type";
import { Ref, ref } from "vue";
const sheetRef: Ref<SheetRef | null>= ref(null);

function handleOpen() {
    sheetRef.value?.open({
        list: [{ label: "第一个" },{ label: "第一个" },{ label: "第一个" }]
    });
}
</script>

<style lang='scss'>
   
</style>