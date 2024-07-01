<template>
	<!-- #ifdef APP-NVUE -->
	<div :style="[fontIconStyle]" class="IFontIconContainer LiveIcon" @click="handleClick">{{unicode}}</div>
    <!-- #endif -->
	<!-- #ifndef APP-NVUE -->
    <div class="IFontIconContainer" :class="[genIconType, genIconValue]" :style="[fontIconStyle]" @click="handleClick"><slot></slot></div>
    <!-- #endif -->
</template>

<script lang="ts" setup>
import {iconProps, IconPropsType, IconEmitsType} from "./icon";
import {ComputedRef, StyleValue, ref, computed } from "vue";
import {CLICK_EVENT} from "../../common/constants";
import { useStyle } from "../../hooks/useStyle"
import {genPx, genSize} from "../../common/style";
import {iconList} from "./static/liveicon"
const props: IconPropsType = defineProps(iconProps);
const emits = defineEmits([CLICK_EVENT]);
const { colorValue } = useStyle();


// #ifdef APP-NVUE
// @ts-ignore
var domModule = weex.requireModule('dom');
import iconUrl from './static/liveicon.ttf'
domModule.addRule('fontFace', {
    'fontFamily': "liveicon",
    'src': "url('" + iconUrl + "')"
});
// #endif

const unicode = computed(() => {
    let code = iconList.find(v => v.fontClass === props.icon);
    if (code) {
		return unescape(`%u${code.unicode}`)
    }
    return ''
})

const genIconType = computed(() => props.icon.indexOf("icon-") > -1 ? 'iconfont' : 'LiveIcon');
const genIconValue = computed(() => props.icon.indexOf("icon-") > -1 ? props.icon : ('live-' + props.icon))

const fontIconStyle: ComputedRef<StyleValue> = computed((): StyleValue => {
    const style: StyleValue = {};
    const color = props.color || (props.primary ? 'colorPrimaryText' : '') || '';
    if(color) style.color = colorValue.value(color);
    if(props.bgColor){
        style.backgroundColor = colorValue.value(props.bgColor);
    }
    if(props.size) {
        const { width, height } = genSize(props.size);
        style.width = width;
        style.height = height;
        style.lineHeight = height;
        style.fontSize = width;
    }
    if(props.radius){
        style.borderRadius = props.radius.indexOf("%") > -1 ? props.radius : genPx(props.radius);
        style.overflow = "hidden";
    }
    return style;
})

const handleClick = () => emits(CLICK_EVENT);
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import "./static/liveicon.css";
/* #endif */ 

.LiveIcon {
    font-family: liveicon !important;
    text-decoration: none;
    text-align: center;
    &::before {
        display: inline !important;
    }
}
.IFontIconContainer {
    display: inline-block;
    text-align: center;
    color: inherit;
    font-size: inherit;
}
</style>
