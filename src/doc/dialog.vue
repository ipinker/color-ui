<template>
    <IPage title="Dialog（弹框）" useBack>
        <IButton primary @click="handleOpenDefault">Open default dialog</IButton>
        <IDialog ref="IDialogRef"/>
    </IPage>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
const IDialogRef = ref(null);

const handleOpenDefault = () => {
    nextTick(() => {

        if(IDialogRef.value && IDialogRef.value?.open){
            IDialogRef.value?.open();
        }
    })
}
</script>