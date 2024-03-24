<template>
	<view class="ICheckerboard" :style="[bgStyle]"></view>
</template>

<script lang="ts" setup>
let _checkboardCache: any = {}
const props = defineProps({
    size: {
        type: [Number, String],
        default: 8
    },
    white: {
        type: String,
        default: '#fff'
    },
    grey: {
        type: String,
        default: '#e6e6e6'
    },
    customStyle: {
        type: Object,
        default: () => {
            return {}
        }
    }
});
const bgStyle = computed(() => {
    return {
        'background-image': 'url(' + getCheckboard(props.white, props.grey, props.size) + ')',
        ...props.customStyle
    }
})

function renderCheckboard() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jfPbs2X8GPEBSUhKfNAPjqAHDIgz+//+PNx08f/4cfzoYNYCBceiHAQC5flV5JzgrxQAAAABJRU5ErkJggg=='
}

function getCheckboard(c1: string, c2: string, size: number | string) {
    var key = c1 + ',' + c2 + ',' + size;
    if (_checkboardCache[key]) return _checkboardCache[key]
    else {
        var checkboard = renderCheckboard()
        _checkboardCache[key] = checkboard
        return checkboard
    }
}
</script>

<style>
	.ICheckerboard {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		left: 0rpx;
		background-size: contain;
	}
</style>
