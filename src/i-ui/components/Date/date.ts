import { ExtractPropTypes, PropType } from 'vue';

export function getNowDate(type?: "start" | "end"): string {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (type === 'start') {
        year = year - 30;
    } else if (type === 'end') {
        year = year + 2;
    }
    return `${year}/${month > 9 ? month : '0' + month}/${day > 9 ? day : '0' + day}`;
}

export type FormatType =  
    "yy" | 
    "yy-mm" | "yy-mm-dd" | "yy-mm-dd hh" | "yy-mm-dd hh:ff" |
    "yy/mm" | "yy/mm/dd" | "yy/mm/dd hh" | "yy/mm/dd hh:ff" |
    "hh:ff"

export const MONTHS_DATA = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
] as const;
export type MonthItemType = (typeof MONTHS_DATA)[number];

export const HOURS_DATA = [ 
    0, ... MONTHS_DATA, // 0 ~ 12
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
] as const;
export type HourItemType = (typeof HOURS_DATA)[number];

export const DAYS_DATA = [
    ... MONTHS_DATA, // 1 ~ 12
    13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25,26,27,28,29,30, 31
] as const;
export type DayItemType = (typeof DAYS_DATA)[number];

export const MINUTES_DATA= [
    0, ... DAYS_DATA,
    32,33,34,35,36,37,38,39,40,
    41,42,43,44,45,46,47,48,49,50,
    51,52,53,54,55,56,57,58,59
] as const;
export type MinuteItemType = (typeof MINUTES_DATA)[number];

export const SECONDS_DATA = MINUTES_DATA;
export type SecondItemType = (typeof SECONDS_DATA)[number];

export type WeekItem = {week: string, check: boolean}


export const dateProps = {
    /** @desc 默认值 **/
    modelValue: {
        type: String,
        default () {
            return getNowDate()
        }
    },
    /** @desc 默认值 **/
    value: {
        type: String,
        default () {
            return getNowDate()
        }
    },
    /** @desc 最小可选日期 **/
    startDate: {
        type: String,
        default () {
            return getNowDate('start');
        }
    },
    /** @desc 最大可选日期 **/
    endDate: {
        type: String,
        default () {
            return getNowDate('end');
        }
    },
    /** @desc 是否显士 **/
    show:{
        type:Boolean,
        default:false
    },
    /** @desc 点击遮罩是否关闭 **/
    isMaskClick: {
        type: Boolean,
        default: true
    },
    /** @desc 组件标题 **/
    title:{
        type: String,
        default: ""
    },
    /** @desc 可选择的类型 { FormatType } **/
    format: { 
        type: String as PropType<FormatType>,
        default: "yy-mm-dd"
    },
    /** @desc 是否阻止弹窗层打开时滚动到顶部 **/
    stopTop: { 
        type: Boolean,
        default: false
    },
    /** @desc 使用周选择器 **/
    week: {
        type: Boolean,
        default: false
    },
    /** @desc 周选择器使用的数据 { WeekItem } **/
    weekList: {
        type: Array as PropType<WeekItem[]>,
        default: () => [
            {week: "周一",check:false},
            {week: "周二",check:false},
            {week: "周三",check:false},
            {week: "周四",check:false},
            {week: "周五",check:false},
            {week: "周六",check:false},
            {week: "周日",check:false}
        ]
    },
    /** @desc 周选择器使用的数据 { 周选择器是否多选 } **/
    multiple: {
        type: Boolean,
        default: true
    },
} as const;

export type DatePropsType = ExtractPropTypes<typeof dateProps>;

export type DateEmitsType = {
    
};