<template>
        <UIPopup ref="popupRef" type="center" :isMaskClick="false" v-if="useMask">
            <span ref="_ref" class="ILoading">
                <Loading1 :color="color" :size="size" v-if="type=='1'"/>
                <Loading2 :color="color" :size="size" v-else-if="type=='2'"/>
                <Loading3 :color="color" :size="size" v-else-if="type=='3'"/>
                <Loading0 :color="color" :size="size" v-else/>
            </span>
        </UIPopup>
        <template v-else>
            <span class="ILoadingContainer flex-center" :class="{ 'LoadingMask' : usePartMask }">
                <span ref="_ref" class="ILoading">
                    <Loading1 :color="color" :size="size" v-if="type=='1'"/>
                    <Loading2 :color="color" :size="size" v-else-if="type=='2'"/>
                    <Loading3 :color="color" :size="size" v-else-if="type=='3'"/>
                    <Loading0 :color="color" :size="size" v-else/>
                </span>
            </span>
        </template>
</template>

<script setup lang="ts" scoped>
import { mapStores } from "pinia";
import {useThemeStore} from "../../theme"
import {computed, ref, onMounted, onUnmounted} from "vue";
import {loadingProps} from "./loading";
import UIPopup from "../Popup/index.vue"
import Loading0 from "./loading0.vue";
import Loading1 from "./loading1.vue";
import Loading2 from "./loading2.vue";
import Loading3 from "./loading3.vue";
const props = defineProps(loadingProps);
const store = mapStores(useThemeStore).themeStoreStore();


const _ref = ref(null);
const popupRef = ref(null);

onMounted(() => {
    if(props.useMask){
        const el: any = popupRef.value as any;
        el?.open && el.open();
    }
})

onUnmounted(() => {
    if(props.useMask){
        const el: any = popupRef.value as any;
        el?.close && el.close();
    }
})

const size = computed(() => props.size);
const color = computed(() => (props.color || store.theme?.colorText));
const zIndex = computed(() => props.markIndex);
const maskBgColor = computed(() => store.theme?.colorBgMask)

defineExpose({
    _ref: _ref
});
</script>

<style lang="scss">
.ILoading {
    display: inline-flex;
    align-items: center;
    color: inherit;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
}

.ILoadingContainer {
    display: inline-flex !important;

    &.LoadingMask {
        display: flex !important;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $i-index-l;
        z-index: v-bind(zIndex);
        background-color: v-bind(maskBgColor);
    }
}
</style>