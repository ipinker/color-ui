<template>
    <div class="ICheckGroupContainer">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import {CheckType} from "../../index.d";
import {PropType, nextTick} from "vue";
import {CHANGE_EVENT, SizeType, UPDATE_MODEL_EVENT} from "../../common/constants";

const props = defineProps({
    modelValue: {
        type: Array as PropType<CheckType[]>,
        default: () => []
    },
    activeColor: String,
    disabled: Boolean,
    size: String as PropType<SizeType>,
    mini: Boolean,
    id: String
});
const emits = defineEmits([UPDATE_MODEL_EVENT, CHANGE_EVENT]);
const handleCheckItemChange = (value: CheckType) => {
    const targetIndex: number = props.modelValue?.findIndex(item => item === value);
    if(targetIndex == -1) props.modelValue.push(value);
    if(targetIndex > -1) props.modelValue?.splice(targetIndex, 1);
    const targetArr: CheckType[] = [... props.modelValue];
    emits(UPDATE_MODEL_EVENT, targetArr);
    nextTick(() => emits(CHANGE_EVENT, targetArr));
}
provide(
    "CheckGroupKey",
    reactive({
        ...toRefs(props),
        handleCheckItemChange,
    })
)
</script>

<style lang="scss" scoped>
.ICheckGroupContainer {
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
}
</style>
