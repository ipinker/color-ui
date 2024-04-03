<template>
    <div class="ICardContainer" :style="[styleOption]" :class="{ full }">
        <template v-if="useHeader || title">
            <div class="ICardHeader" :style="[styleOptionForHeader]" v-if="title">{{title}}</div>
            <div class="ICardHeader" :style="[styleOptionForHeader]" v-if="!title"><slot name="header"></slot></div>
        </template>

        <div class="ICardBody" @click="handleEvent">
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
    /** @desc 圆角 **/
    radius: {
        type: [String , Number],
        default: "16"
    },
    /** @desc 加载效果 **/
    loading: Boolean,
    /** @desc 开启后可以使用v-on:click **/
    event: Boolean
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
    if(props.full) style.width = "100%", style.margin = `${store.theme?.margin}px auto`;
    style.boxShadow = `0 2px 6px 0 ${store.theme?.colorShadowBase}`;
    return style;
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
    flex: 1;
    margin: $i-margin-m;
    overflow: hidden;
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
}
</style>