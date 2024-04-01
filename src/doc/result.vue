<template>
    <IPage title="Result（结果页）" useBack>
        <IResult :type="resultType" title="Success title" desc="This is a title for success`s desc" :btnList="btnList">
            If has any element to show, can add default slot in here!
        </IResult>
        <ICol>
            <IButton primary @click="resultType='success'"> Set success</IButton>
            <IButton primary plain @click="resultType='warning'"> Set warning</IButton>
            <IButton primary @click="resultType='error'"> Set error</IButton>
            <IButton primary plain @click="resultType='info'"> Set info</IButton>
        </ICol>
    </IPage>
</template>

<script lang="ts" setup>
import { ResultStatus } from "@/uni_modules/i-ui/common/constants";
import { BtnInfo } from "@/uni_modules/i-ui/components/Result/result";
import { computed, ref, Ref, reactive, nextTick, onMounted } from "vue"
const resultType: Ref<ResultStatus> = ref("success");
const btnList: BtnInfo[] = [
    { label: "返回首页" },
    { label: "下一步", plain: true },
    { label: "返回首页", type: "default", plain: true },
    { label: "下一步", type: "default" }
]
</script>
