<template>
    <IPage title='Date 日期/时间选择器' useBack>

        <ICard title="Preview">
            <IButton primary @click="handleShowDate(1)">默认</IButton>
            <IButton primary @click="handleShowDate(2)">设置开始日期或结束日期</IButton>
            <IButton primary @click="handleShowDate(3)">使用周期</IButton>
            <IButton primary @click="handleShowDate(4)">format=yy-mm-dd hh:ff</IButton>
        </ICard>

        <ICard title="Props">
            <ITitle>modelValue/value 默认值 { string }</ITitle>
            <ITitle>startDate 可选起始日期 { string }</ITitle>
            <ITitle>endDate 可选最后日期 { string }</ITitle>
            <ITitle>show 是否显示 { boolean }</ITitle>
            <ITitle>isMaskClick</ITitle>
            <ITitle>title 标题 { string }</ITitle>
            <ITitle>format 支持的格式 { FormatType }</ITitle>
            <ITitle>stopTop 是否阻止弹窗层打开时滚动到顶部 { boolean }</ITitle>
            <ITitle>week 显示星期选择 { boolean }</ITitle>
            <ITitle>weekList 星期数据 { WeekItem[] }</ITitle>
            <ITitle>multiple 星期选择是否多选</ITitle>
        </ICard>

        <ICard title="Emits">
            <ITitle>update:modelValue (v-model)</ITitle>
            <ITitle>update:show 组件显示/隐藏</ITitle>
            <ITitle>cancel 取消</ITitle>
            <ITitle>change { dateValue, dateValueIndex, weekList }</ITitle>
        </ICard>
        <IDate :show="showDate1" :format="format" :week="useWeek" :startDate="startDate" :endDate="endDate" @update:show="showDate1 = $event" v-model="date1" @change="handleChangeDate1"></IDate>
    </IPage>
</template>

<script setup lang='ts'>
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
const showDate1 = ref(false);
const useWeek = ref(false);
const date1 = ref("2024-03-13");
const startDate = ref();
const endDate = ref();
const format = ref();
const handleShowDate = (type: number) => {
    switch (type) {
        case 1: 
            showDate1.value = false;        
            useWeek.value = false;
            startDate.value = void 0;
            endDate.value = void 0;
            format.value="yy-mm-dd";
            nextTick(() => {
                showDate1.value = true;
            })
            break;
        case 2: 
            showDate1.value = false;            
            useWeek.value = false;
            startDate.value = "2023-10-03";
            endDate.value = "2024-05-01";
            format.value="yy-mm-dd";
            nextTick(() => {
                showDate1.value = true;
            })
            break;
        case 3: 
            showDate1.value = false;
            useWeek.value = true;
            format.value="yy-mm-dd";
            nextTick(() => {
                showDate1.value = true;
            })
            break;
        case 4: 
            showDate1.value = false;
            useWeek.value = false;
            format.value="yy-mm-dd hh:ff";
            date1.value = "2024-03-04 13:14"
            nextTick(() => {
                showDate1.value = true;
            })
            break;
    }
}
const handleChangeDate1 = (e: any) => {
    console.log(e);
    console.log(date1)
}
</script>

<style lang='scss'>
   
</style>