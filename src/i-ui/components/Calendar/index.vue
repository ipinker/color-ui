<template>
	<view class="ICalendarContainer" :style="[container]" ref="calendarRef">
		<view class="ICalendarWatermark" v-if="watermark" :style="[font('colorTextQuaternary')]">
			{{month}}
		</view>
		<view class="ICalendar" :class="{ 'ICalendarWatermarkTop': watermark }">
			<view class="ICalendarHeader">
				<view 
					class="ICalendarHeaderIcon active-lightgray liveicon live-unfold"
					:style="[font('colorInfoText')]"
					@click="handleChangeMonth(-2)"
				></view>
				<view 
					class="ICalendarHeaderIcon active-lightgray deep liveicon live-back"
					@click="handleChangeMonth(-1)"
				></view>
				<view class="ICalendarHeaderName"> {{formatDate(year, month, 0)}} </view>
				<view 
					class="ICalendarHeaderIcon active-lightgray deep liveicon live-forward"
					@click="handleChangeMonth(1)"></view>
				<view 
					class="ICalendarHeaderIcon active-lightgray liveicon live-fold"
					:style="[font('colorInfoText')]"
					@click="handleChangeMonth(2)"></view>
			</view>
			<view class="ICalendarWeek">
				<view class="ICalendarWeekItem active-lightgray" :style="[font('colorInfoText')]" v-for="item in weekList" :key="item.week">
					{{item.week}}
				</view>
			</view>
			<view class="ICalendarDay">
				<view class="ICalendarDayItem" 
					v-for="(item,index) in days" :key="index"
					@click="handleSelectDays(item,index)"
				>
					<view class="ICalendarDayItemVal "
						:class="{ 
							'active': isActived(index),
							'active-lightgray': activeIndex !== index && !item.disabled,
							'active-start active': scoped && scopedStart(index),
							'active-end active': scoped && scopedEnd(index),
							'scoped': scoped && isScoped(index),
							'disabled': item.disabled,
							'hide-dis': item.disabled && hideDis
						}"
						:style="[dayItemStyle(item, index)]"
					>
						<text class="d1">{{item.day}}</text>
						<block v-if="!customDayTip && ourCalendar">
							<text class="d2" v-if="item.isFestival">{{item.term}}</text>
							<text class="d2" v-else-if="item.isTerm">{{item.term}}</text>
							<text class="d2" v-else>{{item.dayCn}}</text>
						</block>
						<block v-if="customDayTip">
							<view class="dt"><pink-parse :node="getCustomTip(item)"></pink-parse></view>
						</block>
						
					</view>
				</view>
			</view>
			<view class="ICalendarConfirm" v-if="useBtn || showDateStr">
				<view class="ICalendarConfirmSelect" :style="[font('colorInfoText')]" v-if="activeDays.length > 1">
					{{
						formatDate(year,month,activeDays[0].day) 
						+ " 至 " 
						+ formatDate(year,month,activeDays[activeDays.length-1].day)
					}}
				</view>
				<view class="ICalendarConfirmSelect" :style="[font('colorInfoText')]" v-else>
					{{ startDate }}
				</view>
				<UIButton size="large" primary @click="handleChange" v-if="useBtn">确定</UIButton>
			</view>
		</view>
	</view>
</template>

<script setup lang='ts'>
import {
    getOpacityColor,
    formatDate
} from "ipink-util";
import { calendarProps, CalendarPropsType, CalendarEmitsType } from "./calendar";
import { useThemeStore } from "@/store/theme";
import { DayInfo, useCalendar } from "./useCalendar"
import { CHANGE_EVENT } from "../../common/constants";
import { StyleValue } from "vue";
import UIButton from "../Button/index.vue"
const props = defineProps(calendarProps);
const emits = defineEmits([CHANGE_EVENT, "month"]);
const store = useThemeStore();
const theme = computed(() => store.theme);
const calendarRef = ref(null);
let { 
    container, font, 
    year, month, days, 
    start, end,
    activeIndex, activeDay, activeEndDay, activeDays,  
    festival, lastWeek, 
    getDays
} = useCalendar();
const weekList = [
    { week: "日" },
    { week: "一" },
    { week: "二" },
    { week: "三" },
    { week: "四" },
    { week: "五" },
    { week: "六" },
];
const isActived = computed(() => {
    return (index: number) => {
        let len: number = activeDays.value.length;
        // 选中者index === 当前index
        // or 选中列表集合中首个 
        // 则采用激活样式
        let active: boolean = ( !props.scoped && index === activeIndex.value  ) || 
            ( props.scoped && len === 1 && index === activeIndex.value);
        return active;
    }
})
// 范围选择: 开始的去掉链接处圆角
const scopedStart = computed(() => {
    return (index: number) => {
        let len: number = activeDays.value.length;
        return len > 1 && index === activeDays.value[0].index;
    }
})
// 范围选择: 末尾的的去掉链接处圆角
const scopedEnd = computed(() => {
    return (index: number) => {
        let len: number = activeDays.value.length;
        return len > 1 && index === activeDays.value[len - 1].index;
    }
})
// 开始和结尾内的则~
const isScoped = computed(() => {
    return (index: number): boolean => {
        let len: number =activeDays.value.length;
        if(len > 0){
            return (
                index !== activeDays.value[0].index &&
                index !== activeDays.value[len - 1].index &&
                !!activeDays.value.find((item: DayInfo) => item?.index === index)
            );
        }
        else {
            return false
        }
    }
})
const startDate = computed((): string => {
    return start.value > 0
        ? formatDate(year.value, month.value, start.value)
        : ''
    ;
})
const endDate = computed((): string => {
    return end.value > 0 
        ? formatDate(year.value, month.value, end.value)
        : ""
    ;
})
const getCustomTip = computed(() => {
    return (item: DayInfo): string => {
        let _tip = props.customTipList.find((i) => {
            if(
                i[props.dateKey as string] == item.date || 
                new Date(i[props.dateKey].split("-").join("/")) == new Date(item.date.split("-").join("/"))
            ){
                return item;
            }
        })
        return _tip ? _tip[props.tipKey] : props.defaultTip;
    }
})

const dayItemStyle = computed(() => {
    return (item: DayInfo, index: number): StyleValue => {
        const style: StyleValue = {};
        if(isActived.value(index)){
            style.backgroundColor = store.theme?.colorPrimary,
			style.color = store.theme?.colorWhiteTextBase
        }
        if(props.scoped && isScoped.value(index)){
            style.backgroundColor = getOpacityColor(store.theme?.colorPrimary || "", 0.2)
			style.color = store.theme?.colorPrimary
        }
        if(item.disabled){
            style.backgroundColor = store.theme?.gray1
			style.color = store.theme?.colorInfoText
        }
        return style;
    };
})

function handleChange() {
    if(!start.value) return null
    
    if(props.scoped && !end.value) return null;
    
    let _obj;
    if(!props.scoped) _obj = activeDay.value;
    else {
        let len = activeDays.value.length;
        _obj = [
            activeDays.value[0],
            len > 1 ? activeDays.value[len - 1] : null
        ];
    }
    emits(CHANGE_EVENT, _obj);
}
function handleChangeMonth(type: -2 | -1 | 1 | 2) {
    if(type === -2) year.value --;
    
    if(type === -1)
        year.value = month.value == 1 ? year.value - 1 : year.value,
        month.value = month.value == 1 ? 12 : month.value - 1;
    
    if(type === 1)
        year.value = month.value == 12 ? year.value + 1 : year.value,
        month.value = month.value == 12 ? 1 : month.value + 1;
    
    if(type === 2) year.value ++;

    activeIndex.value = -1;
    activeDays.value = [];
    start.value = 0;
    activeDay.value = {} as DayInfo;
    getDays.value();
    emits("month", {
        year: year.value,
        month: month.value
    });
}

// 不是范围选择拿到激活项直接reurn
// 是范围选择, 已选了开始将开始和结尾的选项添加到选中集合中并排序
// 其他情况重置开始项, 末尾项置零
function handleSelectDays(item: DayInfo, index: number) {
    if(item.disabled) return ;			
    activeIndex.value = index;
    activeDay.value = item;
    if(!props.scoped){
        start.value = item.day;
        !props.useBtn && handleChange();
        return ;
    }
    if(!start.value || end.value) {
        start.value = item.day;
        end.value = 0;
        activeDays.value = [{
            ...item,
            index
        }];
    }
    else {
        if(start.value === index) return ;
        end.value = item.day;
        let act: number = activeDays.value[0].index as number;
        let _start: number = act > index ? index : act,
            _end: number = act < index ? index : act;
        for (let i = _start; i <= _end; i ++) {
            activeDays.value.push({
                ... days.value[i],
                index: i
            })
        }
        activeDays.value.sort((a: DayInfo, b: DayInfo) => (a.index || 0) - (b.index || 0));
        !props.useBtn && handleChange();
    }	
}
onBeforeMount(() => {
    handleChange();
})

defineExpose({
    _ref: calendarRef
})
</script>

<style lang="scss" scoped>
.ICalendarContainer {
	position: relative;
	width: 100%;
	min-height: 800rpx;
	.ICalendarWatermark {
		height: 750rpx;
		width: 100%;
		padding-top: 100rpx;
		box-sizing: border-box;
		@include center;
		font-size: 300rpx;
	}
}
.ICalendar {
	width: 100%;
	box-sizing: border-box;
	&.ICalendarWatermarkTop {
		margin-top: -750rpx;
	}
	.ICalendarHeader {
		width: 100%;
		height: 80rpx;
		@include center;
		.ICalendarHeaderName {
			font-size: $i-font-l;
			font-weight: 500;
			width: 240rpx;
			text-align: center;
		}
		.ICalendarHeaderIcon {
			width: 60rpx;
			height: 60rpx;
			@include center;
			font-size: $i-font-xs;
			font-weight: bold;
			&.deep {
				font-size: $i-font-l;
			}
		}
	}
	
	.ICalendarWeek {
		width: 100%;
		height: 100rpx;
		@include verCenter;
		justify-content: space-between;
		.ICalendarWeekItem {
			width: calc(100vw / 7);
			height: 100% ;
			@include center;
			font-size: $i-font-xs;
		}
	}
	
	.ICalendarDay {
		@include verCenter;
		width: 100%;
		flex-wrap: wrap;
		.ICalendarDayItem {			
			width: calc(100% / 7);
			height: 100rpx;
			@include center;
			.ICalendarDayItemVal {
				width: 100%;
				height: 100rpx;
				@include center(column);
				font-size: $i-font-l;
				&.active {
					background-color: $i-color-primary;
					color: $i-color-white;
					border-radius: 8rpx;
				}
				&.feature {
					color: $i-color-txt;
				}
				&.scoped {
					background-color: $i-color-primary-shadow;
					color: $i-color-primary;
					border-radius: 0;
				}
				&.disabled {
					opacity:0.8;
					background-color: $i-color-whitegray;
					color: $i-color-gray;
				}
				&.active-start {		
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				}
				&.active-end {					
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
				}
				&.hide-dis {
					display: none;
					visibility: hidden;
				}
				
				.d2 {
					margin-top: 5rpx;
					font-size: $i-font-xxxs;
				}
				.dt {
					text-align: center;
					font-size: $i-font-xxxs;
				}
			}
		}
	}
	.ICalendarConfirm {
		padding: 30rpx;
		box-sizing: border-box;
		width: 100%;
		min-height: 140rpx;
		@include center(column);
		.ICalendarConfirmSelect {
			height: 50rpx;
			font-size: $i-font-xxs;
		}
	}
}
</style>
