<template>
	<div role="application" aria-label="ColorPicker color picker" class="IColorContainer"
		:class="[ disableAlpha ? 'IColor__disable-alpha' : '']"
		:style="[containerStyle]"
        v-if="colors.rgb"
	>
		<div class="IColor-saturation-wrap">
			<Saturation v-model="colors" :navbarHeight="navbarHeight" @change="childChange"></Saturation>
		</div>
		<div class="IColor-body">
			<div class="IColor-controls row">
				<div class="IColor-color-wrap">
					<div :aria-label="`current color is ${colors.hex}`" class="IColor-active-color"
						:style="[activeColor]"></div>
					<CheckBoard v-if="!disableAlpha"
						:custom-style="{width: '30px',height: '30px',borderRadius: '15px',backgroundSize: 'auto'}">
					</CheckBoard>
				</div>

				<div class="IColor-sliders">
					<div class="IColor-hue-wrap">
						<Hue v-model="colors" @change="childChange"></Hue>
					</div>
					<div class="IColor-alpha-wrap" v-if="!disableAlpha">
						<Alpha v-model="colors" @change="childChange"></Alpha>
					</div>
				</div>
			</div>

			<div class="IColor-fields-wrap row" v-if="!disableFields">
				<div class="IColor-fields" v-show="fieldsIndex === 0">
					<!-- hex -->
					<div class="IColor-field">
						<EditableInput v-if="!hasAlpha" :input-content-style="inputContentStyle"
							:input-label-style="inputLabelStyle" label="hex" :value="colors.hex" @change="inputChange">
						</EditableInput>
						<EditableInput v-if="hasAlpha" :input-content-style="inputContentStyle"
							:input-label-style="inputLabelStyle" label="hex" :value="colors.hex8" @change="inputChange">
						</EditableInput>
					</div>
				</div>
				<div class="IColor-fields row" v-show="fieldsIndex === 1">
					<!-- rgba -->
					<div class="IColor-field">
						<EditableInput label="r" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.rgba && colors.rgba.r || ''" @change="inputChange"></EditableInput>
					</div>
					<div class="IColor-field">
						<EditableInput label="g" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.rgba && colors.rgba.g || ''" @change="inputChange"></EditableInput>
					</div>
					<div class="IColor-field">
						<EditableInput label="b" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.rgba && colors.rgba.b || ''" @change="inputChange"></EditableInput>
					</div>
					<div class="IColor-field" v-if="!disableAlpha">
						<EditableInput label="a" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></EditableInput>
					</div>
				</div>
				<div class="IColor-fields" v-show="fieldsIndex === 2">
					<!-- hsla -->
					<div class="IColor-field">
						<EditableInput label="h" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="hsl.h" @change="inputChange">
						</EditableInput>
					</div>
					<div class="IColor-field">
						<EditableInput label="s" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="hsl.s" @change="inputChange">
						</EditableInput>
					</div>
					<div class="IColor-field">
						<EditableInput label="l" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="hsl.l" @change="inputChange">
						</EditableInput>
					</div>
					<div class="IColor-field" v-if="!disableAlpha">
						<EditableInput label="a" :input-content-style="inputContentStyle" :input-label-style="inputLabelStyle"
							:value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></EditableInput>
					</div>
				</div>
				<div class="IColor-toggle-btn" role="button" aria-label="Change another color definition"
					@click="toggleViews">
					<div class="IColor-toggle-icon">
						<div class="IColor-arrow IColor-arrow-up"></div>
						<div class="IColor-arrow IColor-arrow-down"></div>
					</div>
					<div class="IColor-toggle-icon-highlight" v-show="highlight"></div>
				</div>
			</div>
		</div>
		<slot name="bottom"></slot>
		<div class="IColor-button flex-center" v-if="showButton">
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
import { Ref, StyleValue, WritableComputedRef, computed, ref, watch } from "vue";
import { ColorInfo, ColorInfoKey } from "../../index.d"
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
    return props.width && genPx(props.width) || ""
})
const heightNumber = computed(() => {
    return props.height && genPx(props.height) || ""
})
const containerStyle = computed(() => {
    const obj: StyleValue = {};
    if(widthNumber.value) obj.width = widthNumber.value
    if(heightNumber.value) obj.height = heightNumber.value
    return obj
})
const inputContentStyle = computed(() => {
    return {
        fontSize: '11px',
        color: '#333',
        width: '100%',
        borderRadius: '2px',
        border: 'none',
        boxShadow: 'inset 0 0 0 1px #dadada',
        height: '21px',
        textAlign: 'center'
    }
})

const inputLabelStyle = computed(() => {
    return {
        textTransform: 'uppercase',
        fontSize: '11px',
        lineHeight: '11px',
        color: '#969696',
        textAlign: 'center',
        display: 'block',
        marginTop: '12px'
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


<style lang="scss" scoped>
	.IColorContainer {
		border-radius: 2px;
		box-sizing: initial;
		width: 240px;
		font-family: Menlo;
		background-color: #fff;
	}

	.IColor-controls {
	}

	.IColor-color-wrap {
		position: relative;
		width: 36px;
	}

	.IColor-active-color {
		position: relative;
		width: 30px;
		height: 30px;
		border-radius: 15px;
		overflow: hidden;
		z-index: 1;
	}

	.IColor-sliders {
		flex: 1;
	}

	.IColor-fields-wrap {
		padding-top: 16px;
	}

	.IColor-fields {
		margin-left: -6px;
		flex: 1;
	}

	.IColor-field {
		padding-left: 6px;
		width: 100%;
	}

	.IColor-toggle-btn {
		width: 32px;
		text-align: right;
		position: relative;
	}

	.IColor-toggle-icon {
		margin-left: 14px;
		margin-top: 12px;
		position: relative;
		z-index: 2;
	}

	.IColor-toggle-icon-highlight {
		position: absolute;
		width: 24px;
		height: 28px;
		background: #eee;
		border-radius:4px;
		top: 10px;
		left: 12px;
	}

	.IColor-arrow {
		border: 1px solid black;
		border-width: 0 1px 1px 0;
		height: 6px;
		width: 6px;
	}

	.IColor-arrow-down {
		transform: rotate(45deg);
	}

	.IColor-arrow-up {
		transform: rotate(-135deg);
	}

	.IColor-hue-wrap {
		position: relative;
		height: 10px;
		margin-bottom: 8px;
	}

	.IColor-alpha-wrap {
		position: relative;
		height: 10px;
	}

	.IColor-hue-wrap .i-hue {
		border-radius: 2px;
	}

	.IColor-alpha-wrap .i-alpha-gradient {
		border-radius: 2px;
	}

	.IColor-hue-wrap .i-hue-picker,
	.IColor-alpha-wrap .i-alpha-picker {
		width: 12px;
		height: 12px;
		border-radius: 6px;
		transform: translate(-6px, -2px);
		background-color: rgb(248, 248, 248);
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
	}

	.IColor-body {
		padding: 16px 16px 12px;
		background-color: #fff;
	}

	.IColor-saturation-wrap {
		width: 100%;
		padding-bottom: 55%;
		position: relative;
		border-radius: 2px 2px 0 0;
		overflow: hidden;
	}

	.IColor-saturation-wrap .i-saturation-circle {
		width: 12px;
		height: 12px;
	}

	.IColor__disable-alpha .IColor-active-color {
		width: 18px;
		height: 18px;
	}

	.IColor__disable-alpha .IColor-color-wrap {
		width: 30px;
	}

	.IColor__disable-alpha .IColor-hue-wrap {
		margin-top: 4px;
		margin-bottom:4px;
	}

	.IColor-button {
		padding: 15px;
	}

	.button-left {
		margin: 0;
		font-size: $i-font-xxs;
		padding: 0 $i-padding-s;
		line-height: $i-line-xl;
	}

	.button-right {
		margin: 0;
		margin-left: $i-margin-s;
		font-size: $i-font-xxs;
		padding: 0 $i-padding-s;
		line-height: $i-line-xl;
	}
</style>
