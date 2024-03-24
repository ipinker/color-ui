<template>
    <IPage useBack center title="Input">
        <div>Default</div>
        <IInput class="IInputComponent" v-model="inputValue" placeholder="请输入证件号码"/>
        <div>Add showLimit</div>
        <IInput class="IInputComponent" showLimit v-model="inputValue" placeholder="请输入证件号码"/>
        <div>Add border</div>
        <IInput border class="IInputComponent" v-model="inputValue" placeholder="请输入证件号码"/>
        <div>Type = Textarea</div>
        <IInput  border class="ITextareaComponent" type="textarea" v-model="inputValue" placeholder="请输入证件号码"/>
        <div>Type = Textarea & add autoHeight</div>
        <IInput border class="ITextareaComponent autoHeight" autoHeight type="textarea" showLimit v-model="inputValue" placeholder="请输入证件号码" />
        <ISpace height="100rpx"/>
    </IPage>
</template>

<script lang="ts" setup>
    import { useThemeStore } from "@/store/theme"
    const store = useThemeStore();
    const inputValue = ref("");

    const borderColor = store.theme?.colorBorder
</script>


<style lang="scss">
.IInputComponent {
    width: 500rpx;
    height: 80rpx;
    input:active {
        border-color: red;
    }
}

.ITextareaComponent {
    width: 500rpx;
    &.autoHeight {
        min-height: 140rpx;
    }
}
</style>
