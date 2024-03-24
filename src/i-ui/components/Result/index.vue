<template>
    <div class="IResultContainer flex-column-center">
        <UIIcon class="IResultIcon" size="140" :class="[type]" :icon="iconValue"/>
        <div class="IResultTitle"><text>{{title}}</text></div>
        <div class="IResultDesc"><text>{{desc}}</text></div>
        <div class="IResultBtn flex flex-justify-center flex-wrap" v-if="btnList && btnList.length">
            <UIButton class="IResultBtnItem"
                 :size="item.size" :plain="item.plain"
                 :type="item.type || 'primary'"
                 v-for="(item,index) in btnList" :key="index"
            >{{item.label}}</UIButton>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/store/theme"
import {PropType} from "vue";
import {ButtonType} from "../Button/button";
import {SizeType, ResultStatus} from "../../common/constants";
import UIButton from "../Button/index.vue"
import UIIcon from "../Icon/index.vue"
type BtnInfo = {
    label: string
    url: string
    type?: ButtonType
    plain?: boolean
    size?: SizeType
}
const iconTypeMap = {
    "success" : "success",
    "error" : "error",
    "info" : "info",
    "warning" : "warning",
    "E404" : "E404",
    "E403" : "E403",
    "E500": "E500"
};
const props = defineProps({
    type: {
        type: String as PropType<ResultStatus>,
        default: "success"
    },
    icon: String,
    title: String,
    desc: String,
    btnList: Array as PropType<BtnInfo[]>
});
const store = useThemeStore();
const iconValue = computed(() => props.icon || iconTypeMap[props.type]);
const infoDesc = computed(() => store.theme?.colorInfoText);
const errorColor = computed(() => store.theme?.colorErrorText);
const successColor = computed(() => store.theme?.colorSuccessText);
const primaryColor = computed(() => store.theme?.colorPrimaryText);
const warningColor = computed(() => store.theme?.colorWarningText);
</script>

<style lang="scss">
.IResultContainer {
    padding: 80rpx 24rpx 50rpx;
    .IResultIcon {
        font-size: 140rpx;
        color: v-bind(errorColor);
        &.success {
            color: v-bind(successColor);
        }
        &.error {
            color: v-bind(errorColor);
        }
        &.warning {
            color: v-bind(warningColor);
        }
        &.info {
            color: v-bind(primaryColor);
        }
    }
    .IResultTitle {
        margin-top: 48rpx;
        font-size: $i-font-xxxl;
        font-weight: $i-weight-l;
    }
    .IResultDesc {
        margin-top: 16rpx;
        font-size: $i-font-xs;
        color: v-bind(infoDesc);
    }
    .IResultBtn {
        width: 100%;
        margin-top: 48rpx;
        .IResultBtnItem {
            margin: 0;
            margin-left: $i-margin-m;
            margin-bottom: $i-margin-m;
        }
    }
}
</style>
