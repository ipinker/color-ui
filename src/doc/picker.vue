<template>
    <IPage title="Picker (滚动选择器)" useBack>
        <ICard title="Default">
            <IButton primary @click="handleShowPicker1">显示默认</IButton>
            <ISpace height="20"/>
            <IButton primary @click="handleShowPicker2">展示多列（2～3）</IButton>
            <IPicker :show="isShowPicker1" :list="pickerList1" @update:show="isShowPicker1=$event"></IPicker>
            <IPicker ref="pickerRef" :list="pickerList2"></IPicker>
        </ICard>
        <ICard title="Props">
            <ITitle>keys 数据key { OptionsKeyType } </ITitle>
            <ITitle>level 层级深度 { string | number } </ITitle>
            <ITitle>show 是否展示 { boolean } </ITitle>
            <ITitle>title 标题 { string } </ITitle>
            <ITitle>list 数据列表 { AnyMap[] } </ITitle>
            <ITitle>modelValue 默认 { PickerValueType } </ITitle>
            <ITitle>value 默认值 { PickerValueType } </ITitle>
            <ITitle>isMaskClick 点击遮罩是否关闭 </ITitle>
        </ICard>

        <ICard title="Emits">
            <ITitle>cancel</ITitle>
            <ITitle>change</ITitle>
            <ITitle>update:show</ITitle>
        </ICard>

        <ICard title="显示组件方法1">
            <ICode @click="handleCopyValue1" :code="showCopyValue1"></ICode>
        </ICard>
        <ICard title="显示组件方法2">
            <ICode @click="handleCopyValue2" :code="showCopyValue2"></ICode>
        </ICard>
    </IPage>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
import { copyValue } from "ipink-util"
const pickerRef = ref();
const isShowPicker1 = ref(false);
const showCopyValue1 = (`\< \ IPicker :show="isShowPicker" :list="pickerList" @update:show="isShowPicker=$event" / \>`)
const showCopyValue2 = (`\< \ IPicker ref="pickerRef" :list="pickerList" /> \npickerRef.value?._ref?.open()`)
const pickerList1 = [
    { label: "第一", value: "1" },
    { label: "第二", value: "2" },
    { label: "第三个哦", value: "3" },
    { label: "第四个哦", value: "4" },
    { label: "第五内容", value: "5" },
]
const pickerList2 = [
    { label: "第一1", value: "1", children: [
        { label: "第一一", value: "11" },
        { label: "第一二", value: "12" },
    ] },
    { label: "第二", value: "2", children: [
        { label: "第二一", value: "21" },
        { label: "第二二", value: "22" },
    ] },
    { label: "第三个哦", value: "3", children: [
        { label: "第三一", value: "31" },
        { label: "第三二", value: "32" },
    ] },
    { label: "第四个哦", value: "4", children: [
        { label: "第四一", value: "41" },
        { label: "第四二", value: "42" },
    ] },
    { label: "第五内容", value: "5", children: [
        { label: "第五一", value: "51" },
        { label: "第五二", value: "52" },
    ] },
]
const handleCopyValue1 = () => copyValue(showCopyValue1);
const handleCopyValue2 = () => copyValue(showCopyValue2);
const handleShowPicker1 = () => {
    isShowPicker1.value = !isShowPicker1.value;
}
const handleShowPicker2 = () => {
    pickerRef.value?._ref?.open()
}
</script>

<style lang="scss">

</style>
