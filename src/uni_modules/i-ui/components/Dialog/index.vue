<template>
    <UIPopup ref="dialogRef" type="center" @change="change" :isMaskClick="dialogOption.isMaskClick" @onMaskClick="cancel">
        <div class="IDialogContainer" :style="[container, shadow]">
            <div class="IDialogTitle">
                {{dialogOption.title || $t('common.alertTitle')}}
            </div>

            <div class="IDialogContent" :style="[dialogOption.contentStyle]">
                <UIRich :node="dialogOption.content" v-if="dialogOption.content"/>
                <slot></slot>
            </div>
            <div class="hr" :style="[borderBottom]"></div>
            <div class="IDialogFooter flex-center" v-if="dialogOption.useCancel || dialogOption.cancelText">
                <div :style="[borderRight, font('colorTextQuaternary')]" class="IDialogFooterItem IDialogCancel active-lightgray " @click="cancel">
                    {{dialogOption.cancelText || $t("common.cancel")}}
                </div>
                <div :style="[primaryText]" class="IDialogFooterItem IDialogConfirm active-lightgray " @click="confirm">
                    {{dialogOption.confirmText || $t("common.confirm")}}
                </div>
            </div>
            <div class="IDialogFooter" v-else>
                <div :style="[primaryText]" class="IDialogFooterItem IDialogConfirm active-lightgray " @click="confirm">
                    {{dialogOption.confirmText || $t("common.confirm")}}
                </div>
            </div>
        </div>
    </UIPopup>
</template>
<script lang="ts" setup>
import { PropType, ref, Ref, computed, ComputedRef, watch } from 'vue';
import { useStyle } from '../../hooks/useStyle';
import { DialogOption, DialogRef, dialogProps, DialogPropsType } from "./dialog";
import UIPopup from "../Popup/index.vue";
import UIRich from "../Rich/index.vue"
import { CANCEL_EVENT } from '../../common/constants';
import { PopupRefType } from '../Popup';
const emits = defineEmits([CANCEL_EVENT, "confirm", "change"]);
const props: DialogPropsType = defineProps(dialogProps)
const defaultOption: Ref<DialogOption> = ref({
    isMaskClick: true,
    cancelText: "",
    confirmText: "",
    title: "",
    content: "",
    useCancel: false,
    contentStyle: {},
    callback: () => {}
});
const dialogRef: Ref<PopupRefType | null> = ref(null);
const { shadow, container, borderBottom, borderRight, font, primaryText } = useStyle();
const dialogOption: ComputedRef<DialogOption> = computed((): DialogOption => {
    const _option: DialogOption = {
        ... defaultOption.value,
        ... (props.option || {})
    }
    return _option;
})
const cancel = () => {
    dialogRef.value?.close && dialogRef.value.close();
    if(dialogOption.value.callback) dialogOption.value.callback(false);
	emits(CANCEL_EVENT, false);
}
const open = (options ?: DialogOption) => {
    if(options && Object.keys(options).length){
        defaultOption.value = {
            ... defaultOption.value,
            ... (options || {})
        };
    }
    dialogRef.value?.open && dialogRef.value.open();
}
const confirm = () => {
    if(dialogOption.value.callback) dialogOption.value.callback(true);
    emits('confirm', true);
    dialogRef.value?.close && dialogRef.value.close();
}
const change = (e: { show: boolean }) => {
	emits('change', e);
}
watch(() => props.show, (val, oldVal) => {
    if(oldVal === val && val === true) return;
    if(oldVal === val && val === false) return;
    if(oldVal === void 0 && val === false) return;
    if(val) open();
    else cancel();
})

defineExpose({
    _ref: dialogRef,
    close: cancel,
    open
} as DialogRef)
</script>

<style lang="scss" scoped>
    .IDialogContainer {
        width: 330px;
        border-radius: $i-radius-xxl;
        .IDialogTitle {
            width: 100%;
            font-size: $i-font-l;
            font-weight: $i-weight-l;
            line-height: $i-line-xl;
            text-align: center;
            padding-top: $i-padding-m;
        }
        .IDialogContent {
            width: 100%;
            min-height: 100px;
            padding: $i-padding-s $i-padding-l;
            font-size: $i-font-s;
            line-height: $i-line-xl;
            text-align: center;
            @include center;
        }

        .IDialogFooter {
            width: 100%;
            height: 45px;
            .IDialogFooterItem {
                height: 100%;
                line-height: 45px;
                text-align: center;
                flex: 1;
            }
        }
    }
</style>
