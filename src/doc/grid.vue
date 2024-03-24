<template>
    <IPage title="Grid" useBack>
        <ICard title="Props">
            <ITitle>column：<IInput v-model="column" border @change="handleChange"/></ITitle>
            <ITitle>borderColor：<IInput v-model="borderColor" border @change="handleChange"/></ITitle>
            <ITitle>useBorder：<ISwitch v-model="useBorder" @change="handleChange"/></ITitle>
            <ITitle>square：<ISwitch v-model="square" @change="handleChange"/></ITitle>
            <ITitle>active：<ISwitch v-model="active" @change="handleChange"/></ITitle>
        </ICard>
        <ICard title="GridItem`s props">
            <ITitle>index 索引必传</ITitle>
        </ICard>
        <div class="w-690rpx GridContainer" v-if="showCard">
            <IGrid 
                :column="column"
                :borderColor="borderColor"
                :useBorder="useBorder"
                :square="square"
                :active="active"
            >
                <IGridItem v-for="(item,index) in list" :key="index" :index="index">
                    <text>{{ item.title }}</text>
                </IGridItem>
            </IGrid>
        </div>
    </IPage>
</template>

<script setup lang='ts'>
import { useThemeStore } from '@/store/theme';
const store = useThemeStore();
const column = ref(2);
const borderColor = ref('colorBorderSecondary');
const useBorder = ref(true);
const square = ref(true);
const active = ref(true);
const colorBgContainer = computed(() => store.theme?.colorBgContainer);

const showCard = ref(true);

const list = reactive([
    { title: "第一个" },
    { title: "第二个\n第二个的描述" },
    { title: "第三个\n第二个的描述" },
    { title: "第四个" },
    { title: "第五个\n第二个的描述\n第二个的描述\n第二个的描述" },
])
const handleChange = () => {
    showCard.value = false;
    setTimeout(() => {
        showCard.value = true;
    })
}
</script>

<style lang='scss'>
    .GridContainer {
        margin: 20rpx;
        background-color: v-bind(colorBgContainer);
    }
</style>