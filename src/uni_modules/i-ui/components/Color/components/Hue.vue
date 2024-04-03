<template>
	<!-- #ifdef MP-WEIXIN -->
	<view ref="hueRef"
		:class="['i-hue',direction === 'horizontal'?'i-hue--horizontal':'',direction === 'vertical'?'i-hue--vertical':'']">
		<view class="i-hue-container" @touchmove="hueWxs.touchmove" @touchstart="hueWxs.touchstart"
			:prop="direction" :change:prop="hueWxs.changeProp" :propPullDirection="pullDirection"
			:change:propPullDirection="hueWxs.changePropPullDirection">
			<view class="i-hue-pointer" :style="[{top: pointerTop, left: pointerLeft}]" role="presentation">
				<view class="i-hue-picker"></view>
			</view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<view ref="hueRef"
		:class="['i-hue',direction === 'horizontal'?'i-hue--horizontal':'',direction === 'vertical'?'i-hue--vertical':'']">
		<view class="i-hue-container" @touchmove.stop="handleChange" @touchstart.stop="handleChange"
			@mousedown="handleMouseDown">
			<view class="i-hue-pointer" :style="[{top: pointerTop, left: pointerLeft}]" role="presentation">
				<view class="i-hue-picker"></view>
			</view>
		</view>
	</view>
	<!-- #endif -->

</template>

<!-- #ifdef MP-WEIXIN -->
<script module="hueWxs" lang="wxs">
    // @ts-ignore
	var lastTime = null
	var direction = 'horizontal'
	var pullDirection = ''
	var lastTime = null
    // @ts-ignore
	function changeProp(newValue, oldValue, ownerInstance, instance) {
		direction = newValue
	}
    // @ts-ignore
	function changePropPullDirection(newValue, oldValue, ownerInstance, instance) {
		pullDirection = newValue
	}
    // @ts-ignore
	function touchstart(e, ins) {
		hueMethod(e, ins)
		return false
	}
    // @ts-ignore
	function touchmove(e, ins) {
		hueMethod(e, ins)
		return false
	}
    // @ts-ignore
	function hueMethod(e, ins) {
		var containerWidth = ins.selectComponent('.i-hue-container').getBoundingClientRect().width
		var containerHeight = ins.selectComponent('.i-hue-container').getBoundingClientRect().height

		var xOffset = ins.selectComponent('.i-hue-container').getBoundingClientRect().left
		var yOffset = ins.selectComponent('.i-hue-container').getBoundingClientRect().top
		var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
		var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
		var left = pageX - xOffset
		var top = pageY - yOffset

		var h
		var percent

		if (direction === 'vertical') {
			if (top < 0) {
				h = 360
			} else if (top > containerHeight) {
				h = 0
			} else {
				percent = -(top * 100 / containerHeight) + 100
				h = (360 * percent / 100)
			}
            // @ts-ignore
			var top
			if (h === 0 && pullDirection === 'right') {
				top = 0
			} else {
                // @ts-ignore
				top = -((h * 100) / 360) + 100 + '%'
			}

			ins.selectComponent('.i-hue-pointer').setStyle({
				left: 0,
				top: top
			})
			var currentTime = Date.now()
            // @ts-ignore
			if (currentTime - lastTime >= 50) {
				ins.callMethod("onChangeWxs", {
					h
				})
				lastTime = currentTime
			}
		} else {
			if (left < 0) {
				h = 0
			} else if (left > containerWidth) {
				h = 360
			} else {
				percent = left * 100 / containerWidth
				h = (360 * percent / 100)
			}
            // @ts-ignore
			var left
			if (h === 0 && pullDirection === 'right') {
            // @ts-ignore
				left = '100%'
			} else {
            // @ts-ignore
				left = (h * 100) / 360 + '%'
			}

			ins.selectComponent('.i-hue-pointer').setStyle({
				left: left,
				top: 0
			})
			var currentTime = Date.now()
        // @ts-ignore
			if (currentTime - lastTime >= 50) {
				ins.callMethod("onChangeWxs", {
					h
				})
				lastTime = currentTime
			}
		}
	}

	module.exports = {
		touchstart: touchstart,
		touchmove: touchmove,
		changeProp: changeProp,
		changePropPullDirection: changePropPullDirection
	}
</script>
<!-- #endif -->

<script lang="ts" setup>
import {CHANGE_EVENT} from "../../../common/constants";
import {ColorInfo} from "../../../index.d"
import { Numberify, HSLA, RGBA } from "@ctrl/tinycolor"
import {ComputedRef, PropType, computed, ref} from "vue";

// #ifndef MP-WEIXIN
const hueWxs : any = {}
// #endif
const props = defineProps({
    modelValue: {
        type: Object as PropType<ColorInfo>,
        default: () => ({})
    },
    direction: {
        type: String,
        default: 'horizontal'
    }
});
const emits = defineEmits([CHANGE_EVENT]);
const hueRef = ref(null);
let oldHue = ref(0),
    pullDirection = ref('');

const colors: ComputedRef<ColorInfo> = computed((): ColorInfo => {
    const hsl: Numberify<HSLA> = props.modelValue?.hsl as Numberify<HSLA>
    const h = hsl.h
    if (h !== 0 && h - oldHue.value > 0) pullDirection.value = 'right'
    if (h !== 0 && h - oldHue.value < 0) pullDirection.value = 'left'
    oldHue.value = h

    return props.modelValue
})

const directionClass = computed(() => {
    return {
        'i-hue--horizontal': props.direction === 'horizontal',
        'i-hue--vertical': props.direction === 'vertical'
    }
})

const pointerTop = computed(() => {

    const hsl: Numberify<HSLA> = colors.value?.hsl as Numberify<HSLA>
    if (props.direction === 'vertical') {
        if (hsl.h === 0 && pullDirection.value === 'right') return 0
        return -((hsl.h * 100) / 360) + 100 + '%'
    } else {
        return 0
    }
})

const pointerLeft = computed(() => {
    if (props.direction === 'vertical') {
        return 0
    } else {
        const hsl: Numberify<HSLA> = colors.value?.hsl as Numberify<HSLA>
        if (hsl.h === 0 && pullDirection.value === 'right') return '100%'
        return (hsl.h * 100) / 360 + '%'
    }
})

const onChangeWxs = (data: any) => {
    const hsl: Numberify<HSLA> = colors.value?.hsl as Numberify<HSLA>
    emits(CHANGE_EVENT, {
        h: data.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: 'hsl'
    })
}
const handleChange = (e: any, skip?: boolean) => {
    const query = uni.createSelectorQuery().in(hueRef.value);
    query.select('.i-hue-container').boundingClientRect((data: any)  => {
        if (!data) {
            return
        }
        let containerWidth = data.width
        let containerHeight = data.height

        let xOffset = data.left
        let yOffset = data.top
        let pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        let pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
        let left = pageX - xOffset
        let top = pageY - yOffset

        let h
        let percent

        const hsl: Numberify<HSLA> = colors.value?.hsl as Numberify<HSLA>
        if (props.direction === 'vertical') {
            if (top < 0) {
                h = 360
            } else if (top > containerHeight) {
                h = 0
            } else {
                percent = -(top * 100 / containerHeight) + 100
                h = (360 * percent / 100)
            }

            if (hsl.h !== h) {
                emits(CHANGE_EVENT, {
                    h: h,
                    s: hsl.s,
                    l: hsl.l,
                    a: hsl.a,
                    source: 'hsl'
                })
            }
        } else {
            if (left < 0) {
                h = 0
            } else if (left > containerWidth) {
                h = 360
            } else {
                percent = left * 100 / containerWidth
                h = (360 * percent / 100)
            }

            if (hsl.h !== h) {
                emits(CHANGE_EVENT, {
                    h: h,
                    s: hsl.s,
                    l: hsl.l,
                    a: hsl.a,
                    source: 'hsl'
                })
            }
        }
    }).exec();
}

const handleMouseDown = (e: any) => {
    handleChange(e, true)
    // #ifdef H5
    window.addEventListener('mousemove', handleChange)
    window.addEventListener('mouseup', handleMouseUp)
    // #endif
}
const unbindEventListeners = () => {
    // #ifdef H5
    window.removeEventListener('mousemove', handleChange)
    window.removeEventListener('mouseup', handleMouseUp)
    // #endif
}
const handleMouseUp = (e: any) => {
    unbindEventListeners()
}
</script>


<style>
	.i-hue {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		left: 0rpx;
		border-radius: 4rpx;
	}

	.i-hue--horizontal {
		background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
	}

	.i-hue--vertical {
		background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
	}

	.i-hue-container {
		cursor: pointer;
		margin: 0 4rpx;
		position: relative;
		height: 100%;
	}

	.i-hue-pointer {
		z-index: 2;
		position: absolute;
	}

	.i-hue-picker {
		cursor: pointer;
		margin-top: 2rpx;
		width: 8rpx;
		border-radius: 2rpx;
		height: 16rpx;
		box-shadow: 0 0 4rpx rgba(0, 0, 0, .6);
		background: #fff;
		transform: translateX(-4rpx);
	}
</style>
