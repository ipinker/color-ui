<template>
	<!-- #ifdef MP-WEIXIN -->
	<view class="i-saturation" ref="satureRef" :style="[bg(bgColor)]" @touchmove="saturationWxs.touchmove"
		@touchstart="saturationWxs.touchstart">
		<view class="i-saturation--white"></view>
		<view class="i-saturation--black"></view>
		<view class="i-saturation-pointer" :style="[{top: pointerTop, left: pointerLeft}]">
			<view class="i-saturation-circle"></view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef MP-ALIPAY -->
	<view class="i-saturation" ref="satureRef" :style="[bg(bgColor)]" @touchmove="saturationSjs.touchmove"
		@touchstart="saturationSjs.touchstart">
		<view class="i-saturation--white"></view>
		<view class="i-saturation--black"></view>
		<view class="i-saturation-pointer" :style="[{top: pointerTop, left: pointerLeft}]">
			<view class="i-saturation-circle"></view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef MP-TOUTIAO || MP-BAIDU || APP-VUE || MP-QQ || MP-KUAISHOU || MP-LARK || MP-JD || MP-360 || QUICKAPP-WEBVIEW || QUICKAPP-WEBVIEW-UNION || QUICKAPP-WEBVIEW-HUAWEI -->
	<view class="i-saturation" ref="satureRef" :style="[bg(bgColor)]" @touchmove.stop.prevent="handleChange"
		@touchstart="handleChange">
		<view class="i-saturation--white"></view>
		<view class="i-saturation--black"></view>
		<view class="i-saturation-pointer" :style="[{top: pointerTop, left: pointerLeft}]">
			<view class="i-saturation-circle"></view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<view class="i-saturation" ref="satureRef" :style="[bg(bgColor)]" @touchmove.stop.prevent="handleChange"
		@touchstart="handleChange" @mousedown="handleMouseDown">
		<view class="i-saturation--white"></view>
		<view class="i-saturation--black"></view>
		<view class="i-saturation-pointer" :style="[{top: pointerTop, left: pointerLeft}]">
			<view class="i-saturation-circle"></view>
		</view>
	</view>
	<!-- #endif -->
</template>

<!-- #ifdef MP-WEIXIN  -->
<script module="saturationWxs" lang="wxs" src="./SaturationWxs.wxs"></script>
<!-- #endif -->
<!-- #ifdef MP-ALIPAY -->
<script module="saturationSjs" lang="sjs" src="./SaturationSjs.sjs"></script>
<!-- #endif -->

<script lang="ts" setup>
import { clamp } from '../../../common/style';
import {CHANGE_EVENT} from "../../../common/constants";
import { useStyle } from "../../../hooks/useStyle";
import { Numberify, HSLA, HSVA, RGBA } from "@ctrl/tinycolor"
import {ComputedRef, PropType, computed, ref} from "vue";
import {ColorInfo} from "../../../type.d"

// #ifndef MP-WEIXIN
const saturationWxs : any = {}
// #endif
// #ifndef MP-ALIPAY
const saturationSjs : any = {}
// #endif
const props = defineProps({
    modelValue: {
        type: Object as PropType<ColorInfo>,
        default: () => ({})
    },
    navbarHeight: {
        type: Number,
        default: 0
    }
});
const emits = defineEmits([CHANGE_EVENT]);
const satureRef = ref(null);
const { bg } = useStyle();
const colors: ComputedRef<ColorInfo> = computed((): ColorInfo => props.modelValue as ColorInfo)
const bgColor = computed(() => {
    if(!colors.value) return `hsl(0, 100%, 50%)`
    const hsv: Numberify<HSVA> = colors.value.hsv as Numberify<HSVA>
    return `hsl(${hsv.h}, 100%, 50%)`
})
const pointerTop = computed(() => {
    if(!colors.value) return `100%`
    const hsv: Numberify<HSVA> = colors.value.hsv as Numberify<HSVA>
    return (-(hsv.v * 100) + 1) + 100 + '%'
})
const pointerLeft = computed(() => {
    if(!colors.value) return `100%`
    const hsv: Numberify<HSVA> = colors.value.hsv as Numberify<HSVA>
    return hsv.s * 100 + '%'
})

const onChange = (param: any) => {
    emits(CHANGE_EVENT, param)
}

const onChangeWxs = (data: any) => {
    const hsv: Numberify<HSVA> = colors.value.hsv as Numberify<HSVA>
    onChange({
        h: hsv.h,
        s: data.saturation,
        v: data.bright,
        a: hsv.a,
        source: 'hsva'
    })
}
const handleChange = (e: any, skip?: boolean) => {
    const query = uni.createSelectorQuery().in(satureRef.value);
    query.select('.i-saturation').boundingClientRect((data : any) => {
        if (!data) {
            return
        }
        let containerWidth = data.width
        let containerHeight = data.height

        let xOffset = data.left
        let yOffset = data.top
        let pageX = e.clientX || (e.touches ? e.touches[0].clientX : 0)
        let pageY = e.clientY || (e.touches ? e.touches[0].clientY : 0)
        let left = clamp(pageX - xOffset, 0, containerWidth)
        let top = clamp(pageY - yOffset, 0, containerHeight)
        let saturation = left / containerWidth
        let bright = clamp(-(top / containerHeight) + 1, 0, 1)

        const hsv: Numberify<HSVA> = colors.value.hsv as Numberify<HSVA>
        onChange({
            h: hsv.h,
            s: saturation,
            v: bright,
            a: hsv.a,
            source: 'hsva'
        })
    }).exec();
}
const handleChangeMouse = (e: any, skip?: boolean) => {
    const query = uni.createSelectorQuery().in(satureRef.value);
    query.select('.i-saturation').boundingClientRect((data : any) => {
        if (!data) {
            return
        }
        let containerWidth = data.width
        let containerHeight = data.height
        let xOffset = data.left + window.pageXOffset
        let yOffset = data.top + props.navbarHeight + window.pageYOffset
        let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        let pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
        let left = clamp(pageX - xOffset, 0, containerWidth)
        let top = clamp(pageY - yOffset, 0, containerHeight)
        let saturation = left / containerWidth
        let bright = clamp(-(top / containerHeight) + 1, 0, 1)

        const hsv: Numberify<HSVA> = colors.value.hsv as Numberify<HSVA>
        onChange({
            h: hsv.h,
            s: saturation,
            v: bright,
            a: hsv.a,
            source: 'hsva'
        })
    }).exec();
}
const handleMouseDown = (e: any) => {
    if (navigator.userAgent.indexOf('Mobile') === -1) {
        window.addEventListener('mousemove', handleChangeMouse)
        window.addEventListener('mouseup', handleChangeMouse)
        window.addEventListener('mouseup', handleMouseUp)
    }
}

const unbindEventListeners = () => {
    if (navigator.userAgent.indexOf('Mobile') === -1) {
        window.removeEventListener('mousemove', handleChangeMouse)
        window.removeEventListener('mouseup', handleChangeMouse)
        window.removeEventListener('mouseup', handleMouseUp)
    }
}
const handleMouseUp = (e: any) => {
    unbindEventListeners()
}
</script>


<style>
	.i-saturation,
	.i-saturation--white,
	.i-saturation--black {
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
	}

	.i-saturation--white {
		background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
	}

	.i-saturation--black {
		background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
	}

	.i-saturation-pointer {
		cursor: pointer;
		position: absolute;
	}

	.i-saturation-circle {
		cursor: head;
		width: 4px;
		height: 4px;
		box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4);
		border-radius: 50%;
		transform: translate(-2px, -2px);
	}
</style>
../../../common/style.js../../../common/constants.js../../../hooks/useStyle.js../../../type.js