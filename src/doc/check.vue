<template>
    <IPage title="Check（复选框）" useBack>
        <ICard title="Check component">
            <ITitle title="props：v-model,label"/>
            <ICheck v-model="checkValue" label="复选框1"/>
            <ITitle title="prop：v-model,slot"/>
            <ICheck v-model="checkValue" label="复选框2"/>
            <ITitle title="prop：v-model,mini"/>
            <ICheck v-model="checkValue" mini>复选框3</ICheck>
            <ITitle title="prop：disabled"/>
            <ICheck :modelValue="true" disabled label="复选框3"/><ICheck :modelValue="false" disabled label="复选框"/>
            <ITitle title="prop：active,inactive"/>
            <ICheck v-model="checkValue2" active="1" inactive="0" label="复选框4"/>
        </ICard>
        <ICard title="CheckGroup component">
            <ITitle title="props：modelValue,value,label"/>
            <ICheckGroup v-model="checkValueArr">
                <ICheck value="0" label="开0"/>
                <ICheck value="1" label="关1"/>
                <ICheck value="2" label="关2"/>
                <ICheck value="3" label="关3"/>
                <ICheck value="4" label="关4"/>
                <ICheck value="5" label="关5"/>
                <ICheck value="6" label="关6"/>
                <ICheck value="7" label="关7"/>
            </ICheckGroup>
            <ITitle title="props：disabled"/>
            <ICheckGroup v-model="checkValueArr" disabled>
                <ICheck value="0" label="开始"/>
                <ICheck value="1" label="关闭"/>
            </ICheckGroup>
        </ICard>
    </IPage>
</template>

<script lang="ts" setup>
const checkValue = ref(false);
const checkValue2 = ref("1");
const checkValueArr = reactive([]);
</script>
