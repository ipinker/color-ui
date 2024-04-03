<template>
    <view class="FormContainer">
        <slot />
    </view>
</template>

<script setup lang='ts'>
import { provide, defineEmits, defineExpose, defineProps, ref, reactive, watch, toRefs } from "vue"

const props = defineProps();
const formRef = ref();

function handleValidation() {

}

provide(
    "formKey",
    reactive({
        ...toRefs(props),
        handleValidation
    })
);

defineExpose({
    _ref: formRef
})
</script>

<style lang='scss'>
.FormContainer {

}
</style>