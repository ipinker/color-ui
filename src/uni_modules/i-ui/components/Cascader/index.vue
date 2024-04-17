<template>
	<UIPopup ref="cascaderRef" type="bottom" :isMaskClick="isMaskClick" 
        @onMaskClick="handleCancel" @change="handlePopupChange"
    >
		<view class="ICascaderContainer" :style="[container]">
			<view class="ICascaderHeader" 
				:style="[primary ? primaryBg : container, primary ? whiteText : {}, primary ? {} : borderBottom]"
			>
				<view class="ICascaderHeaderIcon" @click="handleCancel">
                    <UIIcon icon="close-empty"/>
                </view>
				<view class="ICascaderHeaderTitle"> {{title || t("common.selectPlaceholder")}} </view>
				<view class="active-default ICascaderHeaderConfirm" :style="[primary?whiteText:primaryText]" 
                    @click="handleConfirm" v-if="confirm"
                > {{confirmText || t("common.ok")}} </view>
			</view>
			<view class="ICascaderBody row">
				<view class="ICascaderFirstColumn" :style="[firstStyle]">
					<scroll-view scroll-y :style="[scrollHeight]" class="ICascaderItem">
						<template v-for="(item,index) in list"  :key="index">
							<view class="ActiveDefault ICascaderItemName" 
							    :class="{ 'act' : index === firstIndex}"
								:style="[index === firstIndex ? primaryText: {}]"
								v-if="item.show === true || item.show === undefined"
								@click="handleChangeItem(0, item, index)"
							>{{item.label}}</view>
						</template>
					</scroll-view>
					<UIButton class="ICascaderOption" 
						:style="[font('gray')]" v-if="option"
						@click="handleCustom(0)"
					>
						<text class="ICascaderOptionIcon iconfont" :class="option.icon" v-if="option.icon"></text>
						<text class="ICascaderOptionName" v-if="option.label">{{option.label}}</text>
					</UIButton>
				</view>
				
				<view class="ICascaderBodyNext " :style="[secondStyle]">
					<scroll-view scroll-y :style="[scrollHeight]" class="ICascaderItem">
						<template v-for="(item,index) in secondChildren" :key="index">
							<view class="ActiveDefault ICascaderItemName"  
								:class="{ 'act' : index === secondIndex}"
								:style="[index === secondIndex ? primaryText: {} ]"
								v-if="item.show === true || item.show === undefined"
								@click="handleChangeItem(1, item, index)"
							>{{item.label}}</view>
						</template>
					</scroll-view>
					<UIButton class="ICascaderOption" 
						:style="[font('gray')]" v-if="option"
						@click="handleCustom(1)"
					>
						<text class="ICascaderOptionIcon iconfont" :class="option.icon" v-if="option.icon"></text>
						<text  class="ICascaderOptionName" v-if="option.label">{{option.label}}</text>
					</UIButton>
				</view>
				
				<view class="ICascaderBodyLast" :style="[thirdStyle, container]">
					<scroll-view scroll-y :style="[scrollHeight]" class="ICascaderItem">
						<template v-for="(item,index) in thirdChildren"  :key="index">
							<view class="ActiveDefault ICascaderItemName" 
								:class="{ 'act' : index === thirdIndex}"
								:style="[index === thirdIndex ? primaryText: {} ]"
								v-if="item.show === true || item.show === undefined"
								@click="handleChangeItem(2, item, index)"
							>{{item.label}}</view>
						</template>
					</scroll-view>
					<UIButton class="ICascaderOption" 
						:style="[font('gray')]" v-if="option"
						@click="handleCustom(2)"
					>
						<text class="ICascaderOptionIcon iconfont" :class="option.icon" v-if="option.icon"></text>
						<text class="ICascaderOptionName" v-if="option.label">{{option.label}}</text>
					</UIButton>
				</view>

				<view class="ICascaderBodyLast" :style="[lastStyle, container]">
					<scroll-view scroll-y :style="[scrollHeight]" class="ICascaderItem">
						<template v-for="(item,index) in lastChildren"  :key="index">
							<view class="ActiveDefault ICascaderItemName" 
								:class="{ 'act' : index === lastIndex}"
								:style="[index === thirdIndex ? primaryText: {} ]"
								v-if="item.show === true || item.show === undefined"
								@click="handleChangeItem(3, item, index)"
							>{{item.label}}</view>
						</template>
					</scroll-view>
					<UIButton class="ICascaderOption" 
						:style="[font('gray')]" v-if="option"
						@click="handleCustom(2)"
					>
						<text class="ICascaderOptionIcon iconfont" :class="option.icon" v-if="option.icon"></text>
						<text class="ICascaderOptionName" v-if="option.label">{{option.label}}</text>
					</UIButton>
				</view>
			</view>
		</view>
	</UIPopup>
</template>
<script setup lang='ts'>
import { StyleValue, computed, ref, Ref, nextTick, watch } from "vue"
import { toast } from "ipink-util"
import { CANCEL_EVENT, CONFIRM_EVENT, CUSTOM_EVENT, UPDATE_MODEL_EVENT, UPDATE_SHOW_EVENT } from "../../common/constants"
import { cascadeProps, CascadePropsType } from "./cascader"
import { useStyle } from "../../hooks/useStyle"
import { useCascader } from "./useCascader"
import { AnyObject } from "../../type.d"
import i18n from "../../locale"
import UIButton from "../Button/index.vue"
import UIIcon from "../Icon/index.vue"
import UIPopup from "../Popup/index.vue"

const props: CascadePropsType = defineProps(cascadeProps);
const emits = defineEmits([CUSTOM_EVENT, UPDATE_MODEL_EVENT, UPDATE_SHOW_EVENT, CONFIRM_EVENT, CANCEL_EVENT]);
const { t } = i18n.global;
const { colorValue, container, borderBottom, font, bg, primaryBg, text, whiteText, primaryText } = useStyle();
let {
    cascaderRef,
    currentSelect, firstIndex,
    secondChildren, secondIndex,
    thirdChildren, thirdIndex,
    lastChildren, lastIndex,
} = useCascader();
type LevelType = 0 | 1 | 2 | 3;
let currentLevel: Ref<LevelType> = ref(0);
const firstWidthMap = {
    0: "100%",
    1: "40%",
    2: "25%",
    3: "23%",
}
const firstBgMap = {
    0: "",
    1: "colorFillQuaternary",
    2: "colorFillTertiary",
    3: "colorFillSecondary",
}
const secondWidthMap = {
    0: "",
    1: "60%",
    2: "30%",
    3: "23%",
}
const secondBgMap = {
    0: "",
    1: "",
    2: "colorFillQuaternary",
    3: "colorFillTertiary",
}
const thirdWidthMap = {
    0: "",
    1: "",
    2: "45%",
    3: "23%",
}
const thirdBgMap = {
    0: "",
    1: "",
    2: "",
    3: "colorFillQuaternary",
}
const lastWidthMap = {
    0: "",
    1: "",
    2: "",
    3: "31%",
}

function handleCustom(index: number) {
    emits(CUSTOM_EVENT, index);
}
const firstStyle = computed(() => {
    const style: StyleValue = {
        ... container.value
    };
    style.width = firstWidthMap[currentLevel.value] || "100%";
    if(firstBgMap[currentLevel.value]) style['background-color'] = colorValue.value(firstBgMap[currentLevel.value]);
    return style;
})
const secondStyle = computed(() => {
    const style: StyleValue = {
        ... container.value
    };
    style.width = secondWidthMap[currentLevel.value] || 0;
    if(secondBgMap[currentLevel.value]) style['background-color'] = colorValue.value(secondBgMap[currentLevel.value]);
    return style;
})
const thirdStyle = computed(() => {
    const style: StyleValue = {
        ... container.value
    };
    style.width = thirdWidthMap[currentLevel.value] || 0;
    if(thirdBgMap[currentLevel.value]) style['background-color'] = colorValue.value(thirdBgMap[currentLevel.value]);
    return style;
})
const lastStyle = computed(() => {
    return {
        width: lastWidthMap[currentLevel.value] || 0
    };
})
const scrollHeight = computed(() => {
    return {
        height: props.option?'350px':'400px'
    }
})
watch(() => props.list, (v = []) => {
    if(v.length){ 
        firstIndex.value = -1;
        setTimeout(() => {
            handleChangeItem(-1, v[0], 0);
        });
    }
}, { deep: true, immediate: true })

watch(() => props.show, (v) => {
    if (v) nextTick(() => open())
        
    else nextTick(() => close())
})

function handleChangeItem(type: -1 | 0 | 1 | 2 | 3, item: AnyObject, index: number) {
    let hasChildren = (Array.isArray(item[props.keys.children]) && item[props.keys.children].length) || props.option;
    console.log(type, hasChildren, item[props.keys.children])
    if(type === 0){
        if(index === firstIndex.value) return ;
        firstIndex.value = index;
        secondChildren.value = null;
        secondIndex.value = -1;
        currentLevel.value = 0;
        if(hasChildren){
            secondChildren.value = item[props.keys.children];
            secondIndex.value = -1;
            currentLevel.value = 1;
            return ;
        }
    }
    else if(type === 1) {
        if(index === secondIndex.value) return ;
        secondIndex.value = index;
        thirdChildren.value = null;
        thirdIndex.value = -1;
        currentLevel.value = 1;
        if(hasChildren){
            thirdChildren.value = item[props.keys.children] || [];
            thirdIndex.value = -1;
            currentLevel.value = 2;
            return ;
        }
    }
    else if(type === 2) {
        if(index === thirdIndex.value) return ;
        thirdIndex.value = index;
        lastChildren.value = null;
        lastIndex.value = -1;
        currentLevel.value = 2;
        if(hasChildren){
            lastChildren.value = item[props.keys.children] || [];
            lastIndex.value = -1;
            currentLevel.value = 3;
            return ;
        }
    }
    else if(type === 3) {
        if(index === thirdIndex.value) return ;
        thirdIndex.value = index;
        currentLevel.value = 3;
    }
    else {
        currentLevel.value = 0;
    }

    currentSelect.value = item;
    if(!props.confirm){
        handleConfirm();
    }
}

function handleConfirm() {
    if(!currentSelect.value){
        setTimeout(() => toast("请先选择!"))
        return ;
    }
    close();
    nextTick(() => {
        emits(CONFIRM_EVENT, currentSelect.value)
        emits(UPDATE_MODEL_EVENT, currentSelect.value);
    });
    // currentSelect.value = null;
}

function handleCancel() {
    close();
    nextTick(() => emits(CANCEL_EVENT));
}
function handlePopupChange(val: { show: boolean }) {
    emits(UPDATE_SHOW_EVENT, val.show);
}

function close () {
    cascaderRef.value?.close && cascaderRef.value?.close();
}

function open() {
    cascaderRef.value?.open && cascaderRef.value?.open();
}

defineExpose({
    _ref: cascaderRef
});
</script>
<style lang="scss"> 
	.ICascaderContainer {
        width: 100%;
		border-radius: $i-radius-xxl $i-radius-xxl 0 0;
		overflow: hidden;
	}
    .ICascaderHeader {
        position: relative;
        width: 100%;
        height: $i-height-l;
        box-sizing: border-box;
        @include center;
    }
    .ICascaderHeaderIcon {
        position: absolute;
        left: 5px;
        top: 10px;
        font-size: $i-font-xl;
        width: $i-height-s;
        height: $i-height-s;
        @include center;
    }

    .ICascaderHeaderTitle {
        text-align: center;
        font-size: $i-font-l;
        font-weight: $i-weight-l;
    }


    .ICascaderHeaderConfirm {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: $i-font-xs;
        line-height: $i-height-s;
    }

    .ICascaderBody {
        width: 100%;
        height: 400px;
    }
    .ICascaderItem {
        width: 100%;
    }
    .ICascaderItemName {
        width: 100%;
        height: 45px;
        font-size: $i-font-xs;
        transition: all .3s;
        padding: 0 $i-padding-m;
        line-height: 45px;
        filter: none;
        @include ellipsis1;
        &:active {
            filter: sepia(20%) saturate(20%) brightness(50%);
            background-color: rgba(#fff, 0.4);
        }
    }
    .ICascaderItemName.act {
        background-color: rgba(#fff, 0.5);
    }
    .ICascaderFirstColumn, 
    .ICascaderBodyNext, 
    .ICascaderBodyLast {
        height: 100%;
        overflow: hidden;
        transition: width .3s;
    }
    
    .ICascaderOption {
        width: 100%;
        height: $i-height-l;
        @include center;
    }

    .ICascaderOptionIcon {
        font-size: $i-font-m;
    }
    .ICascaderOptionName {
        font-size: $i-font-xs;
        margin-left: $i-margin-m;
    }
</style>