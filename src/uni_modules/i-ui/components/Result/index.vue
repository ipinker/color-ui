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
import {PropType, computed} from "vue";
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme"
import UIButton from "../Button/index.vue"
import UIIcon from "../Icon/index.vue"
import { resultProps, ResultPropsType } from "./result"
import { ResultStatus} from "../../common/constants";
const iconTypeMap: { [propName: string]: any } = {
    "success" : "success",
    "error" : "error",
    "info" : "info",
    "warning" : "warning",
    "E404" : "E404",
    "E403" : "E403",
    "E500": "E500"
};
const props: ResultPropsType = defineProps(resultProps);
const store = mapStores(useThemeStore).themeStoreStore();
const iconValue = computed(() => props.icon || iconTypeMap[props.type as unknown as ResultStatus]);
const infoDesc = computed(() => store.theme?.colorInfoText);
const errorColor = computed(() => store.theme?.colorErrorText);
const successColor = computed(() => store.theme?.colorSuccessText);
const primaryColor = computed(() => store.theme?.colorPrimaryText);
const warningColor = computed(() => store.theme?.colorWarningText);
</script>

<style lang="scss">
.IResultContainer {
    padding: 40px 12px 24px;
    .IResultIcon {
        font-size: 70px;
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
        margin-top: 24px;
        font-size: $i-font-xxxl;
        font-weight: $i-weight-l;
    }
    .IResultDesc {
        margin-top: 8px;
        font-size: $i-font-xs;
        color: v-bind(infoDesc);
    }
    .IResultBtn {
        width: 100%;
        margin-top: 24px;
        .IResultBtnItem {
            margin: 0;
            margin-left: $i-margin-m;
            margin-bottom: $i-margin-m;
        }
    }
}
</style>