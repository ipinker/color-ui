<template>
    <IPage title="Radio（单选框）" useBack>
        <ICard title="Radio component">
            <ITitle title="props：modelValue,label"/>
            <IRadio v-model="radioValue" label="单选框1"/>
            <ITitle title="props：disabled"/>
            <IRadio v-model="radioValue2" disabled label="单选框2"/>
            <ITitle title="props：mini,active"/>
            <IRadio v-model="radioValue2" active="1" mini label="单选框3"/>
        </ICard>
        <ICard title="RadioGroup component">
            <ITitle title="radioGroup`props：v-model"/>
            <IRadioGroup v-model="radioValue3">
                <IRadio value="0" label="开始"/>
                <IRadio value="1" label="关闭"/>
            </IRadioGroup>
            <ITitle title="radioGroup`props：disabled"/>
            <IRadioGroup v-model="radioValue3" disabled>
                <IRadio value="0" label="开1"/>
                <IRadio value="1" label="关2"/>
                <IRadio value="2" label="关3"/>
                <IRadio value="3" label="关4"/>
                <IRadio value="4" label="关5"/>
                <IRadio value="5" label="关6"/>
                <IRadio value="6" label="关7"/>
            </IRadioGroup>
            <ITitle title="radioGroup`props：mini"/>
            <IRadioGroup v-model="radioValue4" mini>
                <IRadio value="0" label="开始"/>
                <IRadio value="1" label="关闭"/>
            </IRadioGroup>
        </ICard>

    </IPage>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
const radioValue = ref(false);
const radioValue2 = ref('0');
const radioValue3 = ref('0');
const radioValue4 = ref('');
</script>
