<template>
    <UIPopup ref="sheetRef" type="bottom" @change="change" :isMaskClick="myIsMaskClick" @onMaskClick="close">
        <view class='ISheetContainer col-center'>
            <view class='ISheetBody radius-xl'>
                <view class='ISheetItem active flex-center' 
                    :style="[container, index === 0 ? {} : borderTop]" 
                    v-for="(item,index) in myList" :key="index"
                    @click="handleChoice(item)"
                >
                    <text :style="[text, myItemStyle]">{{ myIsObject ? item[myLabelKey] : item }}</text>
                </view>
            </view>
            <view class='ISheetItem radius-xl cancel flex-center' :style="[container]" v-if="isShowCancel">
                <text :style="[font('gray2'), myItemStyle]">{{ myCancelText }}</text>
            </view>
        </view>
    </UIPopup>
</template>

<script lang="ts" setup>
import { ref, Ref, ComputedRef, computed } from "vue";
import { sheetProps, SheetPropsType, SheetOption, SheetRef} from "./sheet"
import { PopupRefType } from "../Popup";
import { CANCEL_EVENT, CHANGE_EVENT } from "../../common/constants";
import UIPopup from "../Popup/index.vue";
import { useStyle } from "../../hooks/useStyle";
import i18n from "../../locale";

const props: SheetPropsType = defineProps(sheetProps);
const emits = defineEmits([CHANGE_EVENT, CANCEL_EVENT]);
const { container, borderTop, text, font } = useStyle();
const sheetRef: Ref<PopupRefType | null> = ref(null);
const { t } = i18n.global

const defaultOption: Ref<SheetOption> = ref({
    list: []
});
const isShowCancel = computed((): boolean => {
    if(defaultOption.value.useCancel === void 0) return props.useCancel;
    return defaultOption.value.useCancel; 
});
const myCancelText = computed(() => defaultOption.value.cancelText || props.cancelText || t("common.cancel"));
const myLabelKey = computed(() => defaultOption.value.labelKey || props.labelKey);
const myIsObject = computed(() => {
    if(defaultOption.value.isObject === void 0) return props.isObject;
    return defaultOption.value.isObject; 
});
const myItemStyle = computed(() => defaultOption.value.itemStyle || props.itemStyle);
const myList = computed(() => defaultOption.value.list || props.list || []);
const myIsMaskClick = computed(() => {
    if(defaultOption.value.isMaskClick === void 0) return props.isMaskClick;
    return defaultOption.value.isMaskClick; 
})


const close = () => {
    sheetRef.value?.close && sheetRef.value.close();
    if(defaultOption.value.callback) defaultOption.value.callback(false);
	emits('cancel', false);
}
const open = (options ?: SheetOption) => {
    if(options && Object.keys(options).length){
        defaultOption.value = {
            ... defaultOption.value,
            ... (options || {})
        };
    }
    sheetRef.value?.open && sheetRef.value.open();
}

const change = (e: { show: boolean }) => {
    if(!e?.show) emits(CANCEL_EVENT, e);
}

function handleChoice(v: any) {
    emits(CHANGE_EVENT, v);
    sheetRef.value?.close && sheetRef.value.close();
}

defineExpose({
    _ref: sheetRef,
    open,
    close
} as SheetRef)
</script>

<style lang="scss">
.ISheetContainer {
    width: 100vw;
    .ISheetBody {
        max-height: 88vh;
        overflow-y: auto;
        margin: $i-margin-m auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .ISheetItem {
        width: $i-width-xxxxl;
        padding: $i-padding-s $i-padding-l;
        min-height: $i-height-l;
        &.cancel {
            margin-bottom: $i-margin-m;
        }

        text {

            font-size: $i-font-s;
            line-height: $i-line-l;
            text-align: center;
        }
    }
}
</style>
