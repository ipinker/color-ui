<template>
    <UIPopup ref="dateRef" type="bottom" @change="handlePopupChange" :isMaskClick="isMaskClick" :stopTop="stopTop">
        <view class="IDateBody" :style="[text, container]">
            <view class="IDateHeader row" :style="[borderBottom]" @touchmove.stop.prevent catchtouchmove="true">
                <view class="IDateHeaderBtn" :style="[infoText]" @tap="handleCancel">{{t("common.cancel")}}</view>
                <view class="">{{title || t("common.selectPlaceholder")}}</view>
                <view class="IDateHeaderBtn" :style="[primaryText]" @tap="handleConfirm">{{t("common.ok")}}</view>
            </view>
            <view class="IDateContent" :style="[container]" :class="{'max':week}">
                <view class="IDateWeek" :style="[borderBottom]" v-if="week">
                    <scroll-view scroll-x class="IDateWeekScroller">
                        <view class="IDateWeekBody">
                            <view class="IDateWeekitem"
                                :style="[
                                    bg('colorBgLayout'), 
                                    item.check?primaryText:infoText, 
                                    { 
                                        border : '1px solid ' + (item.check?primaryColor:LayoutColor) 
                                    }
                                ]"
                                v-for="(item,index) in myWeekList" :key="index"
                                @click="selectWeek(item,index)"
                            >
                                {{item.week}}
                                <view class="IDateWeekitemIcon" 
                                    :class="{'active': item.check}"
                                ><UIIcon icon="jiaobiao" /></view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
                <picker-view indicator-style="height: 40px" :value="selectedValue" @change="wrapperChange">
                    <picker-view-column v-if="format.indexOf('yy')>=0">
                        <view class="item" v-for="(item,index) in years" :key="index">
                            {{item}}{{t("calender.year")}}</view>
                    </picker-view-column>
                    <picker-view-column v-if="format.indexOf('mm')>=0">
                        <view class="item" v-for="(item,index) in months" :key="index">
                            {{dateFormate(''+item)}}{{t("calender.month")}}</view>
                    </picker-view-column>
                    <picker-view-column v-if="format.indexOf('dd')>=0">
                        <view class="item" v-for="(item,index) in days" :key="index">
                            {{dateFormate(''+item)}}{{t("calender.day")}}</view>
                    </picker-view-column>
                    <picker-view-column v-if="format.indexOf('hh')>=0">
                        <view class="item" v-for="(item,index) in hours" :key="index">
                            {{dateFormate(''+item)}}{{t("calender.hour")}}</view>
                    </picker-view-column>
                    <picker-view-column v-if="format.indexOf('ff')>=0">
                        <view class="item" v-for="(item,index) in minutes" :key="index">
                            {{dateFormate(''+item)}}{{t("calender.minute")}}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </UIPopup>
</template>
<script setup lang='ts'>
import { computed, watch, nextTick } from "vue"
import { mapStores } from "pinia";
import { CANCEL_EVENT, CHANGE_EVENT, UPDATE_MODEL_EVENT, UPDATE_SHOW_EVENT } from "../../common/constants";
import { dateProps, DatePropsType, WeekItem } from "./date";
import { useDate } from "./useDate";
import UIPopup from "../Popup/index.vue";
import UIIcon from "../Icon/index.vue"
import { useStyle } from "../../hooks/useStyle";
import { useThemeStore } from "../../theme";
import i18n from "../../locale"

const props: DatePropsType = defineProps(dateProps);
const emits = defineEmits([UPDATE_MODEL_EVENT, UPDATE_SHOW_EVENT, CANCEL_EVENT, CHANGE_EVENT]);
const {
    selectedValue,
    years, months, days, hours, minutes,
    weekBackup, myWeekList,
    getMonths,  getDays,
    init,
    dateRef
} = useDate(props);
const { container, bg, font, text, primaryText, borderBottom, infoText } = useStyle();
const { t } = i18n.global;
const store = mapStores(useThemeStore).themeStoreStore();
const primaryColor = computed(() => store.theme?.colorPrimary)
const LayoutColor = computed(() => store.theme?.colorBgLayout)

watch(() => props.weekList, (v) => {
    weekBackup.value = JSON.parse(JSON.stringify(v));
}, { immediate: true })

watch(() => props.format, (v) => {
    init.value();
}, { immediate: true })
watch(() => props.modelValue, (v) => {
    init.value();
})
watch(() => props.value, (v) => {
    init.value();
})
watch(() => props.startDate, (v) => {
    init.value();
})
watch(() => props.endDate, (v) => {
    init.value();
})

watch(() => props.show, (v) => {
    if (v) nextTick(() => open())
        
    else nextTick(() => close())
})

function selectWeek(item: WeekItem, index: number) {
    if(props.multiple) item.check = !item.check;
    else myWeekList.value.forEach((_: WeekItem, i: number) => myWeekList.value[i].check = i === index);
}
function handlePopupChange(val: { show: boolean }){
    emits(UPDATE_SHOW_EVENT,val.show);
}
function handleCancel() {
    if(props.week && myWeekList.value?.length){
        myWeekList.value.forEach((item: WeekItem,index: number) => {
            item.check = weekBackup.value[index].check;
        })
    }
    emits(CANCEL_EVENT, {
        dateValue: getDateValue(selectedValue.value),
        dateValueIndex: selectedValue.value
    });
    nextTick(() => close());
}
function handleConfirm() {
    if(props.week){
        weekBackup.value = JSON.parse(JSON.stringify(myWeekList.value));
    }
    const _value = getDateValue(selectedValue.value);
    emits(CHANGE_EVENT, {
        dateValue: _value,
        dateValueIndex: selectedValue.value,
        weekList: myWeekList.value?.length ? myWeekList.value.filter((item : WeekItem) => item.check) : []
    });
    emits(UPDATE_MODEL_EVENT, _value);
    nextTick(() => close())
}
function getDateValue(pikerValue: number[] = []) {
    const _pikerValue: string[] = pikerValue.map(item => ("" + item));
    let str: string = "";
    if(props.format == "hh:ff"){
        str = dateFormate('' + hours.value[ _pikerValue[0] as unknown as number]) + ":" + 
            dateFormate('' + minutes.value[_pikerValue[1] as unknown as number]);
    } else {
        const sign = props.format.indexOf("-") > -1 ? "-" : "/";
        str = years.value[_pikerValue[0] as unknown as number]
            + sign + dateFormate('' + months.value[(_pikerValue[1]  as unknown as number) || 0]) 
            + (+_pikerValue[2]>=0 ? sign + dateFormate('' + days.value[_pikerValue[2]  as unknown as number]):"")
            + (_pikerValue[3] ? " " + dateFormate('' + hours.value[_pikerValue[3] as unknown as number]):"")
            + (_pikerValue[4] ? ":" + dateFormate('' + minutes.value[_pikerValue[4] as unknown as number]):"");
    }
    return str
}
function dateFormate(val: string): string {
    if (+val > 9) {
        return val;
    }
    return "0" + val;
}
function wrapperChange(e: any) {
    let detailValue = e.detail.value;
    let selectedDate = years.value[detailValue[0]] + "/" + months.value[detailValue[1]] + "/" + days.value[detailValue[2]];
    if (selectedValue.value[0] != detailValue[0]) {
        getMonths.value(selectedDate);
        selectedDate = years.value[detailValue[0]] + "/" + months.value[detailValue[1]] + "/" + days.value[detailValue[2]];
        getDays.value(selectedDate);
    }
    if (selectedValue.value[1] != detailValue[1]) {
        getDays.value(selectedDate);
    }
    selectedValue.value = detailValue;
}

function open() {
    dateRef.value?.open && dateRef.value?.open();
}

function close() {
    dateRef.value?.close && dateRef.value?.close();
}
defineExpose({
    _ref: dateRef,
    open,
    close
})
</script>


<style lang="scss" scoped>
    .IDateBody {
        width: 100%;
    }
    .IDateWeek {
        width: 100%;
        height: 48px;
        overflow: hidden;
        padding: 0 $i-padding-m;
    }
    .IDateWeekScroller {
        width: 100%;
        height: 100%;
        white-space: nowrap;
    }
    .IDateWeekBody {
        height: 48px;
        padding-right: $i-padding-m;
        @include verCenter;
        flex-wrap: nowrap;
        
    }
    .IDateWeekitem {
        position: relative;
        min-width: 60px;
        max-width: 60px;
        height: 28px;
        border-radius: $i-radius-m;
        line-height: 28px;
        box-sizing: border-box;
        margin-left: $i-margin-m;
        white-space: nowrap;
        overflow: hidden;
        .IDateWeekitemIcon {
            position: absolute;
            right: -1px;
            top: -1px;
            opacity: 0;
            font-size: $i-font-m;
            line-height: 1;
            &.active {
                opacity: 1;
            }
        }
    }
    
    .IDateHeader {
        align-items: center;
        padding: 0 $i-padding-l;
        height: 50px;
        position: relative;
        text-align: center;
        font-size: $i-font-s;
        justify-content: space-between;
        border-radius: 8px 8px 0px 0px;

        .IDateHeaderBtn {
            font-size: $i-font-s;
        }
    }

    .item {
        text-align: center;
        width: 100%;
        line-height: 44px;
        font-size: $i-font-s;
    }

    .IDateContent {
        width: 100%;
        height: 186px;
        overflow: hidden;
        text-align: center;
        line-height: 44px;
        font-size: $i-font-s;
        &.max {
            height: 234px;
        }
    }

    picker-view {
        height: 100%;
    }
</style>