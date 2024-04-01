<template>
    <div class="IRadioGroupContainer">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import {CheckType} from "../../index";
import {PropType, nextTick, reactive, provide, toRefs} from "vue";
import {CHANGE_EVENT, SizeType, UPDATE_MODEL_EVENT} from "../../common/constants";

const props = defineProps({
    modelValue: {
        type: [Boolean, String, Number] as PropType<CheckType>,
        default: undefined
    },
    activeColor: String,
    disabled: Boolean,
    size: String as PropType<SizeType>,
    mini: Boolean,
    id: String
});
const emits = defineEmits([UPDATE_MODEL_EVENT, CHANGE_EVENT]);
const handleRadioItemChange = (value: CheckType) => {
    emits(UPDATE_MODEL_EVENT, value);
    nextTick(() => emits(CHANGE_EVENT, value));
}
provide(
    "RadioGroupKey",
    reactive({
        ...toRefs(props),
        handleRadioItemChange,
    })
)
</script>

<style lang="scss" scoped>
.IRadioGroupContainer {

}
</style>
