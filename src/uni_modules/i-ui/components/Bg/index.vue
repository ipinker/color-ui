<template>
	<div class="IBgContainer" :class="{ 'flex-center' : center, absolute }" :style="[backgroundStyle, bgStyleOption]" @click="handleClickEvent">
		<div class="IBgContent"
			:style="[fontStyle,styleOption]"
		>
			<slot />
		</div>
	</div>
</template>
<script setup lang="ts">
import { useThemeStore } from "../../theme";
import {CLICK_EVENT} from "../../common/constants";
import { useStyle } from "../../hooks/useStyle"
import {ColorKey, genPx, genColorString} from "../../common/style";

const props = defineProps({
    bgStyleOption: {
        type: Object,
        default: () => ({})
    },
    styleOption: {
        type: Object,
        default: () => ({})
    },
    width: [String,Number],
    height: [String,Number],
    center: Boolean,
    bgColor: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    opacity: {
        type: [String,Number],
        default: 1
    },
    absolute: Boolean
});
const emits = defineEmits([CLICK_EVENT]);
const store = useThemeStore();
const { colorValue } = useStyle();
const backgroundStyle = computed(() => {
    const style = {
        backgroundColor: props.bgColor || store.theme?.colorPrimaryBg,
        width: props.width ? genPx(props.width) : "100%",
        height: props.height ? genPx(props.height) : "100%"
    };
    style.backgroundColor = colorValue.value(style.backgroundColor as ColorKey);
    if(+props.opacity < 1){
        style.backgroundColor = genColorString(style.backgroundColor, +props.opacity);
    }
    return style;
})

const fontStyle = computed(() => {
    const style = {
        color: props.color || store.theme?.colorPrimaryText
    };
    style.color = colorValue.value(style.color as ColorKey);
    return style;
});

const handleClickEvent = () => {
    emits(CLICK_EVENT);
}
</script>
<style lang="scss" scoped>
	.IBgContainer {
        &.absolute {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
	}
</style>