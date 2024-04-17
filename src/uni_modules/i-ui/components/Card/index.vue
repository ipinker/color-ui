<template>
    <div class="ICardContainer" :style="[styleOption]" :class="{ full, noPadding }">
        <template v-if="useHeader || title">
            <div class="ICardHeader" :style="[styleOptionForHeader]" v-if="title">{{title}}</div>
            <div class="ICardHeader" :style="[styleOptionForHeader]" v-if="!title"><slot name="header"></slot></div>
        </template>

        <div class="ICardBody" :style="[bodyStyleOption]"@click="handleEvent">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { mapStores } from "pinia";
import { useThemeStore } from "../../theme";
import {ComputedRef, StyleValue, computed} from "vue";
import {genRadius, genPx} from "../../common/style";
import { CLICK_EVENT } from "../../common/constants";

const props = defineProps({
    /** @desc 开启卡片的Header，或者title有值 **/
    useHeader: Boolean,
    /** @desc 卡片标题 **/
    title: String,
    /** @desc 撑满父元素宽度 **/
    full: Boolean,
    /** @desc 宽度，不传则自适应 **/
    width: String,
    /** @desc 高度， 不传则自适应 **/
    height: String,
    /** @desc padding **/
    padding: String,
    /** @desc 圆角 **/
    radius: {
        type: [String , Number],
        default: "16"
    },
    /** @desc 加载效果 **/
    loading: Boolean,
    /** @desc 开启后可以使用v-on:click **/
    event: Boolean,
    noPadding: Boolean
});
const emits = defineEmits([CLICK_EVENT]);
const store = mapStores(useThemeStore).themeStoreStore();

const styleOption: ComputedRef<StyleValue> = computed((): StyleValue => {
    const style: StyleValue = {
        backgroundColor: store.theme?.colorBgContainer
    };
    if(props.width) style.width = genPx(props.width);
    if(props.height) style.height = genPx(props.height);
    if(props.radius) style.borderRadius = genRadius(props.radius)?.["border-radius"];
    if(props.full) style.width = "100%", style.margin = `${store.theme?.margin}px auto 0`;
    style.boxShadow = `0 2px 6px 0 ${store.theme?.colorShadowBase}`;
    return style;
})
const bodyStyleOption: ComputedRef<StyleValue> = computed((): StyleValue => {
    const style: StyleValue = {}
    if(props.padding) style.padding = genPx(props.padding);
    if(props.noPadding) style.padding = 0;
    return style
})
const styleOptionForHeader: ComputedRef<StyleValue> = computed((): StyleValue => {
    return {
        borderBottom: `${store.theme?.borderWidth}px solid ${store.theme?.colorBorder}`
    }
})
const handleEvent = () => {
    if(props.event){
        emits(CLICK_EVENT);
    }
}
</script>

<style lang="scss">
.ICardContainer {
    margin: $i-margin-m auto 0;
    overflow: hidden;
    position: relative;
    .ICardHeader {
        padding: $i-padding-m;
        font-size: $i-font-m;
        font-weight: $i-weight-l;
        line-height: $i-line-l;
    }
    .ICardBody {
        padding: $i-padding-m;
        font-size: $i-font-s;
    }
    &.full {
        margin: 0;
    }
    &.noPadding {
        .ICardBody {
            padding: 0;
        }
    }
}
</style>