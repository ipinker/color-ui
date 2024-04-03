<template>
    <div class="INavigatorItem flex flex-align-center" @click="handleNavigate">
        <div class="INavigatorItemIcon" v-if="icon">
            <img class="img" :src="icon" v-if="icon.indexOf('/') > -1"/>
            <UIIcon :color="primaryColor" :icon="arrow" size="40" v-else/>
        </div>
        <div class="INavigatorItemLabel">{{label}}</div>
        <IIcon class="INavigatorItemIcon margin-r0" :color="primaryColor" :icon="arrow" size="32"/>
    </div>
</template>

<script lang="ts" setup>
import { PropType, StyleValue, computed, ref } from "vue"
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme";
import {NavigateType} from "../../common/constants";
import { genColorString } from "../../common/style";
import UIIcon from "../Icon/index.vue"

const props = defineProps({
    icon: String,
    iconStyle: Object,
    label: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String as PropType<NavigateType>,
        default: "navigateTo"
    },
    arrow: {
        type: String,
        default: "forward-new"
    },
    arrowColor: {
        type: String
    }
});
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