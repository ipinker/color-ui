<template>
    <IPage title="Dialog（弹框）" useBack>
        <IButton primary @click="handleOpenDefault">Open default dialog</IButton>
        <IDialog ref="IDialogRef"/>
    </IPage>
</template>

<script lang="ts" setup>
import { nextTick } from "vue"
const IDialogRef = ref(null);

const handleOpenDefault = () => {
    nextTick(() => {

        console.log(IDialogRef.value)
        console.log(IDialogRef.value?.open)
        if(IDialogRef.value && IDialogRef.value?.open){
            IDialogRef.value?.open();
        }
    })
}
</script>