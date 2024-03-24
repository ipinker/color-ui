<template>
	<div role="application" aria-label="ColorPicker color picker"
		:class="['i-color', disableAlpha ? 'i-color__disable-alpha' : '']"
		:style="[containerStyle]"
        v-if="colors.rgb"
	>
		<div class="i-color-saturation-wrap">
			<Saturation v-model="colors" :navbarHeight="navbarHeight" @change="childChange"></Saturation>
		</div>
		<div class="i-color-body">
			<div class="i-color-controls">
				<div class="i-color-color-wrap">
					<div :aria-label="`current color is ${colors.hex}`" class="i-color-active-color"
						:style="[activeColor]"></div>
					<CheckBoard v-if="!disableAlpha"
						:custom-style="{width: '60rpx',height: '60rpx',borderRadius: '30rpx',backgroundSize: 'auto'}">
					</CheckBoard>
				</div>

				<div class="i-color-sliders">
					<div class="i-color-hue-wrap">
						<Hue v-model="colors" @change="childChange"></Hue>
					</div>
					<div class="i-color-alpha-wrap" v-if="!disableAlpha">
						<Alpha v-model="colors" @change="childChange"></Alpha>
					</div>
				</div>
			</div>

			<div class="i-color-fields-wrap" v-if="!disableFields">
				<div class="i-color-fields" v-show="fieldsIndex === 0">
					<!-- hex -->
					<div class="i-color-field">
						<EditableInput v-if="!hasAlpha" :input-content-style="inputContentStyle"
							:input-label-style="inputLabelStyle" label="hex" :value="colors.hex" @change="inputChange">
						</EditableInput>
						<EditableInput v-if="hasAlpha" :input-content-style="inputContentStyle"
							:input-label-style="inputLabelStyle" label="hex" :value="colors.hex8" @change="inputChange">
						</EditableInput>
					</div>
				</div>
				<div class="i-color-fields" v-show="fieldsIndex === 1">
					<!-- rgba -->
					<div class="i-color-field">
						<EditableInput label="r" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.rgba && colors.rgba.r || ''" @change="inputChange"></EditableInput>
					</div>
					<div class="i-color-field">
						<EditableInput label="g" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.rgba && colors.rgba.g || ''" @change="inputChange"></EditableInput>
					</div>
					<div class="i-color-field">
						<EditableInput label="b" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.rgba && colors.rgba.b || ''" @change="inputChange"></EditableInput>
					</div>
					<div class="i-color-field" v-if="!disableAlpha">
						<EditableInput label="a" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></EditableInput>
					</div>
				</div>
				<div class="i-color-fields" v-show="fieldsIndex === 2">
					<!-- hsla -->
					<div class="i-color-field">
						<EditableInput label="h" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="hsl.h" @change="inputChange">
						</EditableInput>
					</div>
					<div class="i-color-field">
						<EditableInput label="s" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="hsl.s" @change="inputChange">
						</EditableInput>
					</div>
					<div class="i-color-field">
						<EditableInput label="l" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="hsl.l" @change="inputChange">
						</EditableInput>
					</div>
					<div class="i-color-field" v-if="!disableAlpha">
						<EditableInput label="a" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></EditableInput>
					</div>
				</div>
				<div class="i-color-toggle-btn" role="button" aria-label="Change another color definition"
					@click="toggleViews">
					<div class="i-color-toggle-icon">
						<div class="i-color-arrow i-color-arrow-up"></div>
						<div class="i-color-arrow i-color-arrow-down"></div>
					</div>
					<div class="i-color-toggle-icon-highlight" v-show="highlight"></div>
				</div>
			</div>
		</div>
		<slot name="bottom"></slot>
		<div class="i-color-button flex-center" v-if="showButton">
			<UIButton class="button-left" @click="cancel">
				取消
			</UIButton>
			<UIButton class="button-right" type="primary" @click="confirm">
				确定
			</UIButton>
		</div>
	</div>
</template>
<script setup lang="ts">
import { Numberify, RGBA, TinyColor, HSLA, HSVA } from "@ctrl/tinycolor"
import { genColorInfo, genPx } from "../../common/style"
import { CANCEL_EVENT, CONFIRM_EVENT, UPDATE_MODEL_EVENT } from "../../common/constants";
import { Ref, StyleValue, WritableComputedRef } from "vue";
import { ColorInfo, ColorInfoKey } from "../../index"
import { colorProps, ColorPropsType } from "./color"
import UIButton from "../Button/index.vue"
import EditableInput from './components/EditableInput.vue'
import Saturation from './components/Saturation.vue'
import Hue from './components/Hue.vue'
import Alpha from './components/Alpha.vue'
import CheckBoard from './components/CheckBoard.vue'

const props: ColorPropsType = defineProps(colorProps);
const emits = defineEmits([UPDATE_MODEL_EVENT, CONFIRM_EVENT, CANCEL_EVENT]);

let val: Ref<ColorInfo> = ref(genColorInfo(props.modelValue as ColorInfo))
let fieldsIndex = ref(0)
let highlight = ref(false)
let oldHue = ref(1);

watch(() => props.modelValue, (newVal : ColorInfo) => {
    val.value = genColorInfo(newVal)
});

const colors: WritableComputedRef<ColorInfo> = computed({
    get(): ColorInfo {
        return val.value as ColorInfo
    },
    set(newVal: ColorInfo) {
        val.value = newVal
        emits(UPDATE_MODEL_EVENT, newVal)
    }
})

const widthNumber = computed(() => {
    return genPx(props.width)
})
const heightNumber = computed(() => {
    return genPx(props.height)
})
const containerStyle = computed(() => {
    const obj: StyleValue = {};
    if(widthNumber.value) obj.width = widthNumber.value
    if(heightNumber.value) obj.height = heightNumber.value
    return obj
})
const inputContentStyle = computed(() => {
    return {
        fontSize: '22rpx',
        color: '#333',
        width: '100%',
        borderRadius: '4rpx',
        border: 'none',
        boxShadow: 'inset 0 0 0 2rpx #dadada',
        height: '42rpx',
        textAlign: 'center'
    }
})

const inputLabelStyle = computed(() => {
    return {
        textTransform: 'uppercase',
        fontSize: '22rpx',
        lineHeight: '22rpx',
        color: '#969696',
        textAlign: 'center',
        display: 'block',
        marginTop: '24rpx'
    }
})
const hsl = computed(() => {
    const {
        h,
        s,
        l
    } = colors.value.hsl as Numberify<HSLA>
    return {
        h: h.toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`
    }
})
const activeColor = computed(() => {
    const rgba: Numberify<RGBA> = colors.value.rgba as Numberify<RGBA>;
    return { background: 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'}
})
const hasAlpha = computed(() => {
    return typeof colors.value.a == "number" ? colors.value.a < 1 : false
})

const confirm = () => {
    emits(CONFIRM_EVENT, colors.value)
}
const cancel = () => {
    emits(CANCEL_EVENT, colors.value)
}


const myColorChange = (data: ColorInfo, _oldHue?: number) =>{
    const hsl: Numberify<HSLA> = colors.value.hsl as Numberify<HSLA>;
    oldHue.value = hsl.h
    colors.value = genColorInfo(data, _oldHue || oldHue.value)
}
const childChange = (data: ColorInfo) => {
    myColorChange(data)
}
const isValidHex = (hex: string) => {
    return new TinyColor(hex).isValid
}

const showHighlight = () =>{
    highlight.value = true
}
const hideHighlight = () =>{
    highlight.value = false
}


const inputChange = (data: ColorInfo) => {
    if (!data) {
        return
    }
    if (data.hex) {
        isValidHex(data.hex) && myColorChange({
            hex: data.hex,
            source: 'hex'
        })
    } else if (data.r || data.g || data.b || data.a) {
        const rgba: Numberify<RGBA> = colors.value.rgba as Numberify<RGBA>;
        myColorChange({
            r: data.r || rgba.r,
            g: data.g || rgba.g,
            b: data.b || rgba.b,
            a: data.a || rgba.a,
            source: 'rgba'
        })
    } else if (data.h || data.s || data.l) {
        const _s: number = (+('' + data.s).replace('%', '')) / 100,
            _l: number = (+('' + data.l).replace('%', '')) / 100;
        const hsl: Numberify<HSLA> = colors.value.hsl as Numberify<HSLA>;
        const s = data.s ? _s : hsl.s
        const l = data.l ? _l : hsl.l

        myColorChange({
            h: data.h || hsl.h,
            s,
            l,
            source: 'hsl'
        })
    }
}

const toggleViews = () => {
    if (fieldsIndex.value >= 2) {
        fieldsIndex.value = 0
        return
    }
    fieldsIndex.value++
}
function simpleCheckForValidColor(data: ColorInfo) {
    let keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
    let checked = 0
    let passed = 0

    for (let i = 0; i < keysToCheck.length; i++) {
        let letter: ColorInfoKey = keysToCheck[i]  as ColorInfoKey
        if (data[letter]) {
            checked++
            if (!isNaN(+ (data[letter] || 0))) {
                passed++
            }
        }
    }

    if (checked === passed) {
        return data
    }
}
function paletteUpperCase(palette: string[]) {
    return palette.map(c => c.toUpperCase())
}
function isTransparent(color: any) {
    return new TinyColor(color).getAlpha() === 0
}
</script>


<style>
	.i-color {
		border-radius: 4rpx;
		box-sizing: initial;
		width: 480rpx;
		font-family: Menlo;
		background-color: #fff;
	}

	.i-color-controls {
		display: flex;
	}

	.i-color-color-wrap {
		position: relative;
		width: 72rpx;
	}

	.i-color-active-color {
		position: relative;
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		overflow: hidden;
		z-index: 1;
	}

	.i-color-sliders {
		flex: 1;
	}

	.i-color-fields-wrap {
		display: flex;
		padding-top: 32rpx;
	}

	.i-color-fields {
		display: flex;
		margin-left: -12rpx;
		flex: 1;
	}

	.i-color-field {
		padding-left: 12rpx;
		width: 100%;
	}

	.i-color-toggle-btn {
		width: 64rpx;
		text-align: right;
		position: relative;
	}

	.i-color-toggle-icon {
		margin-left: 28rpx;
		margin-top: 24rpx;
		position: relative;
		z-index: 2;
	}

	.i-color-toggle-icon-highlight {
		position: absolute;
		width: 48rpx;
		height: 56rpx;
		background: #eee;
		border-radius: 8rpx;
		top: 20rpx;
		left: 24rpx;
	}

	.i-color-arrow {
		border: 2rpx solid black;
		border-width: 0rpx 2rpx 2rpx 0rpx;
		height: 12rpx;
		width: 12rpx;
	}

	.i-color-arrow-down {
		transform: rotate(45deg);
	}

	.i-color-arrow-up {
		transform: rotate(-135deg);
	}

	.i-color-hue-wrap {
		position: relative;
		height: 20rpx;
		margin-bottom: 16rpx;
	}

	.i-color-alpha-wrap {
		position: relative;
		height: 20rpx;
	}

	.i-color-hue-wrap .i-hue {
		border-radius: 4rpx;
	}

	.i-color-alpha-wrap .i-alpha-gradient {
		border-radius: 4rpx;
	}

	.i-color-hue-wrap .i-hue-picker,
	.i-color-alpha-wrap .i-alpha-picker {
		width: 24rpx;
		height: 24rpx;
		border-radius: 12rpx;
		transform: translate(-12rpx, -4rpx);
		background-color: rgb(248, 248, 248);
		box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.37);
	}

	.i-color-body {
		padding: 32rpx 32rpx 24rpx;
		background-color: #fff;
	}

	.i-color-saturation-wrap {
		width: 100%;
		padding-bottom: 55%;
		position: relative;
		border-radius: 4rpx 4rpx 0 0;
		overflow: hidden;
	}

	.i-color-saturation-wrap .i-saturation-circle {
		width: 24rpx;
		height: 24rpx;
	}

	.i-color__disable-alpha .i-color-active-color {
		width: 36rpx;
		height: 36rpx;
	}

	.i-color__disable-alpha .i-color-color-wrap {
		width: 60rpx;
	}

	.i-color__disable-alpha .i-color-hue-wrap {
		margin-top: 8rpx;
		margin-bottom: 8rpx;
	}

	.i-color-button {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 30rpx;
	}

	.button-left {
		margin: 0;
		font-size: 24rpx;
		padding: 0 20rpx;
		line-height: 44rpx;
	}

	.button-right {
		margin: 0;
		margin-left: 20rpx;
		font-size: 24rpx;
		padding: 0 20rpx;
		line-height: 44rpx;
	}
</style>
