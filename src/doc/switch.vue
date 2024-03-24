<template>
    <IPage title="Switch" useBack>
        <ICard title="Default">
            <ITitle title="props：modelValue"/>
            <ISwitch v-model="switchValue"/>
            <ITitle title="props：mini"/>
            <ISwitch mini v-model="switchValue"/>
            <ITitle title="props：disabled"/>
            <ISwitch disabled/><ISwitch v-model="switchValue2" disabled/>
        </ICard>
        <ICard title="More">
            <ITitle title="props：activeLabel,inactiveLabel"/>
            <ISwitch activeLabel="开启" inactiveLabel="关闭" v-model="switchValue"/>
            <ITitle title="props：activeColor,inactiveColor"/>
            <ISwitch activeLabel="开启" activeColor="green" inactiveLabel="关闭" inactiveColor="red" v-model="switchValue"/>
        </ICard>
    </IPage>
</template>

<script lang="ts" setup>
const switchValue = ref(false);
const switchValue2 = ref(true);
</script>

<style lang="scss">

.IRowComponent {
    width: 500rpx;
}
</style>
