<template>
    <IPage useBack title="Icon (图标)">
        <ITitle style="margin: 10rpx 30rpx;">
            搜索：<IInput v-model="keyword" placeholder="请输入" border @change="handleInputChange"/>
        </ITitle>
        <view class="GridContainer w-100vw" :style="[container]">
            <IGrid :column="column" square active >
                <IGridItem v-for="(item,index) in genSearchList" :key="index" :index="index">
                    <div class="IconBox flex-column-center" @click="handleCopy(item)">
                        <IIcon :icon="item.fontClass" size="50"/>
                        <div class="ellipsis">{{ item.fontClass }}</div>
                    </div>
                </IGridItem>
            </IGrid>
            <text class="full" style="text-align:center" @click="handleLoadmore">{{ loadmoreText }}</text>
        </view>
    </IPage>
</template>

<script setup lang='ts'>
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
import { copyValue } from "ipink-util";
import { iconList, IconType } from '@/uni_modules/i-ui/components/Icon/static/liveicon'; 
import { useStyle } from '@/uni_modules/i-ui/hooks/useStyle';
import { onReachBottom } from "@dcloudio/uni-app";

const sortedList = [... iconList].sort((a,b) => a.fontClass.charCodeAt(0) - b.fontClass.charCodeAt(0));
const { container } = useStyle();
const keyword = ref("");

const column = computed(() => Math.floor(uni.getSystemInfoSync().windowWidth / 90));

const page = ref(1), size = ref(50);
const genSearchList = computed((): IconType[] => 
    sortedList.filter(icon => icon.fontClass.includes(keyword.value)).slice(0, page.value * size.value)
)

const loadmoreText = computed(() => {
    if(genSearchList.value.length >= sortedList.length){
        return "已全部加载完毕"
    }
    return "点击加载更多"
})

onReachBottom(() => {
    page.value ++
})
const handleInputChange = () => {
    page.value = 1
}
const handleCopy = (item: IconType) => {
    copyValue(item.fontClass, {
        tip: "复制成功！"
    })
}
const handleLoadmore = () => {
    page.value ++
}
</script>

<style lang='scss'>
    .GridContainer {
        margin: 0 auto;
    }
   .IconBox {
        width: 100%;
        height: 100%;
        text-align: center;
        .ellipsis {
            max-width: 100%;
            padding: 0 6rpx;
        }
   }
</style>@/uni_modules/i-ui/components/Icon/static/liveicon@/uni_modules/i-ui/hooks/useStyle