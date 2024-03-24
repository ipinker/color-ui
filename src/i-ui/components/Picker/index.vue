<template>
    <UIPopup ref="pickerRef" type="bottom" @change="handlePopupChange" :isMaskClick="isMaskClick">
        <view class="IPickerBody" :style="[container]">
            <view class="IPickerHeader" :style="[borderBottom]" @touchmove.stop.prevent catchtouchmove="true">
                <view class="IPickerBtn" :style="[font('colorTextQuaternary')]" @tap="handleCancel">{{t("common.cancel")}}</view>
                <view class="IPickerHeaderTitle">{{title || t("common.selectPlaceholder")}}</view>
                <view class="IPickerBtn confirm" :style="[primaryText]" @tap="handleConfirm">{{t("common.ok")}}</view>
            </view>
            <!--  :style="[bg('gray1')]" -->
            <view class="IPickerContent">
                <picker-view 
                    :mask-style="'background-image:'+maskBgImage"
                    :indicator-style="itemHeight" 
                    :value="pickerIndexList"
                    @change="handlePickerChange" 
                    @touchstart="touchStart"
                    @touchend="touchEnd" 
                >
                    <picker-view-column v-for="(col,colIndex) in dataList" :key="colIndex">
                        <view class="IPickerItem" v-for="(item,index) in col" :key="index">{{item[keyLabel]}}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </UIPopup>
</template>
<script setup lang='ts'>
import { CANCEL_EVENT, CHANGE_EVENT, LIGHT_MODE_ID, UPDATE_SHOW_EVENT } from "../../common/constants";
import { pickerProps, PickerPropsType } from "./picker";
import { usePicker } from "./usePicker";
import { useStyle } from "../../hooks/useStyle";
import UIPopup from "../Popup/index.vue"
import i18n from "../../locale"
import { useThemeStore } from "@/store/theme";
const props: PickerPropsType = defineProps(pickerProps);
const emits = defineEmits([UPDATE_SHOW_EVENT, CANCEL_EVENT, CHANGE_EVENT]);
const store = useThemeStore();
const { font, container, bg, borderBottom, primaryText } = useStyle();
const { 
    pickerRef, 

    dataList, deepLength,
    checkLabelArr, checkValueArr, resultStr, pickerIndexList,
    confirmFlag,
    keyValue, keyLabel, keyChildren,
   
    initData,
} = usePicker(props);
const { t } = i18n.global;
const itemHeight = `height: 88rpx`;
const maskBgImage = computed(() => {
    if(store.modeId == LIGHT_MODE_ID) return `linear-gradient(180deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6)), 
        linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6))`
    return `linear-gradient(180deg, rgba(35, 35, 35, 0.95), rgba(35, 35, 35, 0.6) ),
        linear-gradient(0deg, rgba(35, 35, 35, 0.95), rgba(35, 35, 35, 0.6))`
})

let timeout: Ref<null | number> = ref(null);

watch(() => props.modelValue, () => {
    initData.value()
})
watch(() => props.value, () => {
    initData.value()
})
watch(() => props.list, () => {
    initData.value()
}, { immediate: true })
watch(() => props.show, (v: boolean) => {
    if (v) nextTick(() => open())    
    else nextTick(() => close())
}, { immediate: true })

function handlePopupChange(val: { show: boolean }) {
    emits(UPDATE_SHOW_EVENT,val.show)
}

//取消选择
function handleCancel() {
    close(), emits(CANCEL_EVENT);
}
//确定选择
function handleConfirm() {
    if (!confirmFlag.value) return;
    let dataValue = '';
    let dataCode = '';
    for (var i = 0; i < checkLabelArr.value.length; i++) {
        if (i == 0) dataValue += checkLabelArr.value[i];
        else dataValue += " " + checkLabelArr.value[i];
    }
    for (var i = 0; i < checkValueArr.value.length; i++) {
        if (i == 0) dataCode += checkValueArr.value[i];
        else dataCode += "," + checkValueArr.value[i];
    }
    emits(CHANGE_EVENT, {
        label: dataValue, 
        value: dataCode,
    });
    close();
}

function handlePickerChange(val: any) {
    let arr: number[] = val.detail.value as number[]; //当前索引值
    let c1, c2, c3;
    let list = props.list as any[]; //原始数据
    c1 = dataList.value[0][arr[0]] || dataList.value[0][0];
    if (deepLength.value == 3) {
        c2 = dataList.value[1][arr[1]] || dataList.value[1][0];
        c3 = dataList.value[2][arr[2]] || dataList.value[2][0];
        if (c1[keyLabel.value] != checkLabelArr.value[0]) {
            arr[1] = 0;
            arr[2] = 0;
            dataList.value[1] = list[arr[0]][keyChildren.value];
            dataList.value[2] = list[arr[0]][keyChildren.value][arr[1]][keyChildren.value];
            c2 = dataList.value[1][arr[1]] || dataList.value[1][0];
            c3 = dataList.value[2][arr[2]] || dataList.value[2][0];
        };
        if (c2[keyLabel.value] != checkLabelArr.value[1]) {
            arr[2] = 0;
            dataList.value[2] = list[arr[0]][keyChildren.value][arr[1]][keyChildren.value];
            c3 = dataList.value[2][arr[2]] || dataList.value[2][0];
        };

        //存储数据
        checkLabelArr.value = [c1[keyLabel.value], c2[keyLabel.value], c3[keyLabel.value]];
        checkValueArr.value = [
            dataList.value[0][arr[0]] ? 
                dataList.value[0][arr[0]][keyValue.value] : 
                dataList.value[0][0][keyValue.value],
            dataList.value[1][arr[1]] ? 
                dataList.value[1][arr[1]][keyValue.value] : 
                dataList.value[1][0][keyValue.value],
            dataList.value[2][arr[2]] ? 
                dataList.value[2][arr[2]][keyValue.value] : 
                dataList.value[2][0][keyValue.value]
        ];
        resultStr.value = c1[keyLabel.value] + c2[keyLabel.value] + c3[keyLabel.value];
    } else if (deepLength.value == 2) {
        c2 = dataList.value[1][arr[1]] || dataList.value[1][0];
        if (c1[keyLabel.value] != checkLabelArr.value[0]) {
            dataList.value[1] = list[arr[0]][keyChildren.value];
            arr[1] = 0;
            c2 = dataList.value[1][arr[1]] || dataList.value[1][0];
        };
        //存储数据
        checkLabelArr.value = [c1[keyLabel.value], c2[keyLabel.value]];
        checkValueArr.value = [
            dataList.value[0][arr[0]] ? 
                dataList.value[0][arr[0]][keyValue.value] : 
                dataList.value[0][0][keyValue.value],
            dataList.value[1][arr[1]] ? 
                dataList.value[1][arr[1]][keyValue.value] : 
                dataList.value[1][0][keyValue.value]
        ];
        resultStr.value = c1[keyLabel.value] + c2[keyLabel.value];
    } else { //数据深度为1
        //存储数据
        checkLabelArr.value = [c1[keyLabel.value]];
        checkValueArr.value = [
            dataList.value[0][arr[0]] ? 
            dataList.value[0][arr[0]][keyValue.value] : 
            dataList.value[0][0][keyValue.value]
        ];
        resultStr.value = c1[keyLabel.value];
    }
    nextTick(() => pickerIndexList.value = arr);
}

// 滚动中 confirmFlag = false
function touchStart() {
    if (timeout.value) confirmFlag.value = false; //确认选择按钮，如果==false 不能点击
}
//picker 滚动结束  confirmFlag == true   确认选择按钮可点击
function touchEnd() {
    if (timeout.value) setTimeout(() => confirmFlag.value = true, 500)
}
function close () {
    pickerRef.value?.close && pickerRef.value?.close();
}
function open () {
    pickerRef.value?.open && pickerRef.value?.open();
}

defineExpose({
    _ref: pickerRef
})
</script>

<style lang="scss" scoped>
    .IPickerBody {
        width: 100%;
    }
    .IPickerHeader {
        display: flex;
        align-items: center;
        padding: 0 $i-padding-l;
        height: $i-height-l;
        position: relative;
        text-align: center;
        font-size: $i-font-m;
        justify-content: space-between;
        border-radius: $i-radius-xxl $i-radius-xxl 0 0;

        .IPickerBtn {
            font-size: $i-font-m;
        }
    }
    .IPickerHeaderTitle {
        font-weight: $i-weight-l;
    }

    .IPickerHeader::after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }


    .IPickerContent {
        width: 100%;
        height: 372rpx;
        overflow: hidden;
        text-align: center;
        line-height: 88rpx;
        font-size: $i-font-m;
    }

    picker-view {
        height: 100%;
    }
    :deep(.uni-picker-view-mask) {
        background-image: none
    }
</style>
