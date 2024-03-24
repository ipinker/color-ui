import { KeyValue } from "ipink-util";
import { ExtractPropTypes, PropType } from "vue";

export const calendarProps = {
    // 选取一个范围
    scoped: {
        type: Boolean,
        default: false
    },
    // 是否隐藏非月份日期
    hideDis: {
        type: Boolean,
        default: true
    },
    // 月份水印
    watermark: {
        type: Boolean,
        default: true
    },
    ourCalendar: {
        type: Boolean,
        default: true
    },
    delimiter: {
        type: String,
        default: "/"
    },
    useBtn: {
        type: Boolean,
        default: false
    },
    showDateStr: {
        type: Boolean,
        default: false
    },
    customDayTip: {
        type: Boolean,
        default: false
    },
    customTipList: {
        type: Array as PropType<KeyValue<string>[]>,
        default: () => []
    },
    tipKey: {
        type: String,
        default: 'tip'
    },
    dateKey: {
        type: String,
        default: 'date'
    },
    defaultTip: {
        type: String,
        default: ''
    },
    // 待开发 是否能选择以后的日期
    selectAfter: {
        type: Boolean,
        default: false
    },
} as const;

export type CalendarPropsType = ExtractPropTypes<typeof calendarProps>;

export type CalendarEmitsType = {
    
}