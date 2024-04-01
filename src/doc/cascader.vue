<template>
   <IPage title='Cascader（级联选择器）' useBack>
       <ICard title="Preview">
            <IButton primary @click="handleShowCascade"> 显示 </IButton>
       </ICard>

       <ICascader :list="list" :show="showCascade" @change="handleChange" @update:show="showCascade = $event"/>
   </IPage>
</template>

<script setup lang='ts'>
import { computed, ref, Ref, nextTick, onMounted } from "vue"
const showCascade = ref(false);
const list = [
    { label: "第一列", value: "1", 
        children: [
            { label: "第一-一列", value: "1-1",children: [
            { label: "第一-一-仨列", value: "1-1-3" },
            { label: "第一-一-死列", value: "1-1-4" },
            { label: "第一-一-五列", value: "1-1-5" },
        ] } ,
        { label: "第一-二列", value: "1-2",children: [
            { label: "第一-二-仨列", value: "1-2-3" },
            { label: "第一-二-死列", value: "1-2-4" },
            { label: "第一-二-五列", value: "1-2-5" },
        ] }
        ] 
    },
    { label: "第二列", value: "2" },
    { label: "第三列", value: "3",children: [
            { label: "第三-一列", value: "3-1" },
            { label: "第三-而列", value: "3-2" },
            { label: "第三-三列", value: "3-3" },
        ] },
]
const handleShowCascade = (type: number) => {
    showCascade.value = !showCascade.value;
}
const handleChange = (e: any) => {
    console.log(e)
}
</script>

<style lang='scss'>
   
</style>