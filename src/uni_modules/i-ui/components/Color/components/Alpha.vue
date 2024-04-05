<template>
	<view class="i-alpha" ref="alphaRef">
		<view class="i-alpha-checkboard-wrap">
			<CheckBoard></CheckBoard>
		</view>
		<view class="i-alpha-gradient" :style="[bg(gradientColor)]"></view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="i-alpha-container" @touchmove="alphaWxs.touchmove" @touchstart="alphaWxs.touchstart">
			<view class="i-alpha-pointer" :style="[{left: (colors.a || 1) * 100 + '%'}]">
				<view class="i-alpha-picker"></view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="i-alpha-container" @touchmove.stop="handleChange" @touchstart.stop="handleChange"
			@mousedown="handleMouseDown">
			<view class="i-alpha-pointer" :style="[{left: (colors.a || 1) * 100 + '%'}]">
				<view class="i-alpha-picker"></view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<!-- #ifdef MP-WEIXIN -->
<script module="alphaWxs" lang="wxs">
    // @ts-ignore
	var lastTime = null

    // @ts-ignore
	function touchstart(e, ins) {
		alphaMethod(e, ins)
		return false
	}

    // @ts-ignore
	function touchmove(e, ins) {
		alphaMethod(e, ins)
		return false
	}

    // @ts-ignore
	function alphaMethod(e, ins) {
		var containerWidth = ins.selectComponent('.i-alpha-container').getBoundingClientRect().width
		var xOffset = ins.selectComponent('.i-alpha-container').getBoundingClientRect().left
		var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
		var left = pageX - xOffset

		var a
		if (left < 0) {
			a = 0
		} else if (left > containerWidth) {
			a = 1
		} else {
			a = Math.round(left * 100 / containerWidth) / 100
		}
		ins.selectComponent('.i-alpha-pointer').setStyle({
			left: a * 100 + '%'
		})
		var currentTime = Date.now()
        // @ts-ignore
		if (currentTime - lastTime >= 50) {
			ins.callMethod("onChangeWxs", {
				a
			})
			lastTime = currentTime
		}
	}

	module.exports = {
		touchstart: touchstart,
		touchmove: touchmove
	}
</script>
<!-- #endif -->

<script lang="ts" setup>
import CheckBoard from './CheckBoard.vue'
import {CHANGE_EVENT} from "../../../common/constants";
import {ColorInfo} from "../../../type.d"
import { Numberify, HSLA, RGBA } from "@ctrl/tinycolor"
import {ComputedRef, PropType, computed, ref} from "vue";
import {useStyle} from "../../../hooks/useStyle"

// #ifndef MP-WEIXIN
const alphaWxs : any = {}
// #endif

const props = defineProps({
    modelValue: {
        type: Object as PropType<ColorInfo>,
        default: () => ({})
    },
    onChange: Function
});
const emits = defineEmits([CHANGE_EVENT]);
const { bg } = useStyle();
const alphaRef = ref(null);
const colors: ComputedRef<ColorInfo> = computed((): ColorInfo => props.modelValue as ColorInfo);
const gradientColor = computed(() => {
    const rgba: Numberify<RGBA> = colors.value.rgba as Numberify<RGBA>
    const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
    return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
})
const onChangeWxs = (data: any) => {
    const hsl: Numberify<HSLA> = colors.value.hsl as Numberify<HSLA>;
    emits(CHANGE_EVENT, {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: 'rgba'
    })
}

const handleChange = (e: any, skip?: boolean) => {
    const query = uni.createSelectorQuery().in(alphaRef.value);
    query.select('.i-alpha-container').boundingClientRect((data : any) => {
        if (!data) {
            return
        }
        let containerWidth = data.width

        let xOffset = data.left
        let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        let left = pageX - xOffset

        let a
        if (left < 0) {
            a = 0
        } else if (left > containerWidth) {
            a = 1
        } else {
            a = Math.round(left * 100 / containerWidth) / 100
        }

        const hsl: Numberify<HSLA> = colors.value.hsl as Numberify<HSLA>;
        if (colors.value.a !== a) {
            emits(CHANGE_EVENT, {
                h: hsl.h,
                s: hsl.s,
                l: hsl.l,
                a: a,
                source: 'rgba'
            })
        }
    }).exec();
}
const handleMouseDown = (e: any) => {
    handleChange(e, true)
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
}
const unbindEventListeners = () => {
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
}
const handleMouseUp = () => {
    unbindEventListeners()
}
</script>


<style>
	.i-alpha {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.i-alpha-checkboard-wrap {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}

	.i-alpha-gradient {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.i-alpha-container {
		cursor: pointer;
		position: relative;
		z-index: 2;
		height: 100%;
		margin: 0 3px;
	}

	.i-alpha-pointer {
		z-index: 2;
		position: absolute;
	}

	.i-alpha-picker {
		cursor: pointer;
		width:4px;
		border-radius: 1px;
		height: 8px;
		box-shadow: 0 0 2px rgba(0, 0, 0, .6);
		background: #fff;
		margin-top: 1px;
		transform: translateX(-2px);
	}
</style>
../../../type