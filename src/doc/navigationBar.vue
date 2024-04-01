<template>
    <IPage>
        <INavigationBar
            :custom="custom"
            :height="height"
            :title="title"
            :titleAlign="titleAlign"
            :color="color"
            :bgColor="bgColor"
            :statusColor="statusColor"
            :gradientType="gradientType"
            :gradientValue="gradientValue"
            :useBack="useBack"
            :backTxt="backTxt"
            :backIcon="backIcon"
            :primary="primary"
        >
            <template v-slot:operate v-if="showOperate">
                <IButton round size="s"><span class="flex flex-center iconfont icon-search"></span></IButton>
            </template>
            <template v-if="showContent || custom">
                {{ custom ? "自定义导航栏的全部内容" : "自定义导航栏的标题内容" }}
            </template>
        </INavigationBar>
        <ICard title="Props">
            <ITitle title="props：primary"/>
            <IButton primary plain @click="primary = !primary">Set primary -> {{primary}}</IButton>
            <ITitle title="props：custom"/>
            <IButton primary plain @click="custom = !custom">Set custom -> {{custom}}</IButton>
            <ITitle title="props：useBack"/>
            <IButton primary plain @click="useBack = !useBack">Set useBack -> {{useBack}}</IButton>
            <ITitle title="props：height"/>
            <IButton primary plain @click="handleSetHeight">Set height -> {{height}}</IButton>
            <ITitle title="props：title"/>
            <IButton primary plain @click="title=title+'.'">Set title -> {{title}}</IButton>
            <ITitle title="props：titleAlign"/>
            <IButton primary plain @click="handleSetAlign">Set titleAlign -> {{titleAlign}}</IButton>
            <ITitle title="props：backTxt, need set backIcon=''"/>
            <IInput v-model="backTxt" placeholder="返回按钮文字"></IInput>
            <ITitle title="props：backIcon"/>
            <IInput v-model="backIcon" placeholder="返回按钮图标"></IInput>
            <ITitle title="props：color"/>
            <IInput v-model="color" placeholder="#F0f0f0 | red | rgb"></IInput>
            <ITitle title="props：bgColor"/>
            <IInput v-model="bgColor" placeholder="#F0f0f0 | red | rgb"></IInput>
            <ITitle title="props：statusColor"/>
            <IInput v-model="statusColor" placeholder="#F0f0f0 | red | rgb"></IInput>
            <ITitle title="props：gradientType"/>
            <IInput v-model="gradientType" placeholder="linear | radial"></IInput>
            <ITitle title="props：gradientValue"/>
            <IInput v-model="gradientValue" placeholder="90deg, red , yellow"></IInput>
        </ICard>
        <ICard title="Slot">
            <ITitle title="props：operate"/>
            <IButton primary plain @click="showOperate = !showOperate">Set showOperate -> {{showOperate}}</IButton>
            <ITitle title="props：default，此时不要设置 title "/>
            <IButton primary plain @click="handleShowContent">Set showContent -> {{showContent}}</IButton>
        </ICard>

    </IPage>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
let custom = ref(false);
let height = ref(100);
let title = ref("NavigationBar （导航栏）");
let titleAlign = ref("center");
let color = ref(undefined);
let bgColor = ref(undefined);
let statusColor = ref(undefined);
let gradientType = ref(undefined);
let gradientValue = ref(undefined);
let useBack = ref(true);
let backTxt = ref(undefined);
let backIcon = ref(undefined);
let primary = ref(true);

let showOperate = ref(false);
let showContent = ref(false);
const handleSetAlign = () => {
    switch (titleAlign.value) {
        case "center": titleAlign.value = "right";break;
        case "right": titleAlign.value = "left";break;
        case "left": titleAlign.value = "center";break;
    }
}
const handleSetHeight = () => {
    if(height.value > 100) height.value -= 50
    height.value += 10
}

const handleShowContent = () => {
    showContent.value = !showContent.value;
    if(showContent.value){
        title.value = ""
    }
    else title.value = "NavigationBar （导航栏）"
}
</script>
