<template>
	<div class="IEditableInput">
		<input class="IInput__input" :style="[inputContentStyle]" v-model="val" @input="handleUpdate">
		<view class="IInput__label" :style="[inputLabelStyle]">{{labelSpanText}}</view>
		<view class="IInput__desc" :style="[inputDescStyle]">{{desc}}</view>
	</div>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {CHANGE_EVENT} from "../../../common/constants";

const props = defineProps({
    label: String,
    labelText: String,
    desc: String,
    value: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
        type: Number,
        default: 1
    },
    inputContentStyle: {
        type: Object,
        default: () => {}
    },
    inputLabelStyle: {
        type: Object,
        default: () => {}
    },
    inputDescStyle: {
        type: Object,
        default: () => {}
    },
});
const emits = defineEmits([CHANGE_EVENT]);
const val = computed({
    get(): string | number {
        return props.value as string | number
    },
    set(v: string | number) {
        // TODO: min
        if (!(props.max === undefined) && +v > props.max) {
            val.value = props.max
        } else {
            return v
        }
    }
});

const labelSpanText = computed(() => {
    return props.labelText || props.label
})

const handleChange = (newVal: string): void => {
    let data: any = {}
    data[props.label as string] = newVal
    if (data.hex === undefined && data['#'] === undefined) {
        emits(CHANGE_EVENT, data)
    } else if (newVal.length > 5) {
        emits(CHANGE_EVENT, data)
    }
}

const handleUpdate = (e: any) => {
    handleChange(e.detail.value)
};
</script>

<style lang="scss" scoped>
	.IEditableInput {
		position: relative;
	}

	.IInput__input {
		padding: 0;
		border: 0;
		outline: none;
		font-size: $i-font-xxxs;
	}

	.IInput__label {
		font-size: $i-font-xxxs;
		text-transform: capitalize;
	}
</style>
