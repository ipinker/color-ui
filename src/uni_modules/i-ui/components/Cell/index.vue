<template>
    <view class="INavigatorItem flex flex-align-center" :style="[styleOption]" @click="handleNavigate">
        <view class="INavigatorItemIcon" v-if="icon">
            <img class="img" :src="icon" v-if="icon.indexOf('/') > -1"/>
            <UIIcon :color="primaryColor" :icon="arrow" size="40" v-else/>
        </view>
        <view class="INavigatorItemLabel" v-if="label">{{label}}</view>
        <view class="INavigatorItemLabel row" v-else>
            <slot />
        </view>
        <UIIcon class="INavigatorItemIcon margin-r0" :color="primaryColor" :icon="arrow" size="32"/>
    </view>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue"
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme";
import {CLICK_EVENT, NavigateType} from "../../common/constants";
import { genColorString } from "../../common/style";
import { cellProps , CellPropsType } from "./cell"
import UIIcon from "../Icon/index.vue"

const props: CellPropsType = defineProps(cellProps);
const emits = defineEmits([CLICK_EVENT]);
const store = mapStores(useThemeStore).themeStoreStore();
const containerColor = computed(() => store.theme?.colorBgContainer);
const activeColor = computed(() => genColorString(store.theme?.colorInfo as string, 0.15));
const primaryColor = computed(() => props.arrowColor || store.theme?.colorPrimaryText);

const handleNavigate = () => {
    if(props.url){
        const _uni = uni as any;
        _uni[props.type] && _uni[props.type]({
            url: props.url
        })
    }
    emits(CLICK_EVENT);
}
</script>

<style lang="scss">
.INavigatorItem {
    width: 100%;
    height: $i-height-m;
    padding: $i-padding-s;
    background-color: v-bind(containerColor);
    border-radius: $i-radius-l;
    transition: all .3s;
    &:active {
        background-color: v-bind(activeColor);
    }
}
.INavigatorItemIcon {
    width: 22px;
    height: 22px;
    margin-right: $i-margin-s;
    line-height: 22px;
    text-align: center;
    .img {
        width: 100%;
        height: 100%;
    }
}
.INavigatorItemLabel {
    font-size: $i-font-s;
    flex: 1;
}
</style>