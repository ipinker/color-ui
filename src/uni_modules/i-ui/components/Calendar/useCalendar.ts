import { 
    Calendar,
    CalendarInfo,
    sloarToLunar,
    LunarInfo,
    getYearMonthDay,
    getYearMonthDayNew,
    defaultLunar,
    LunarKeyType,
    defaultGregorian ,
    GregorianKeyType,
    formatDate,
    DateValue
} from "ipink-util";

import { useStyle } from "../../hooks/useStyle";

export interface DayInfo extends CalendarInfo {
    gregorian?: number
    lunar?: string
    date: string
    sloarToLunar?: LunarInfo
    lastNextWeek?: number
    disabled?: boolean
    xiu?: boolean
    ban?:boolean
    index?: number
    /** @desc 是否是节日 **/
    isFestival?: boolean;
}

export function useCalendar () {
    const { container, font } = useStyle();
    let _dayMsg = getYearMonthDayNew(new Date());
    let year: Ref<number> = ref(_dayMsg.year as number);
    let month: Ref<number> = ref(_dayMsg.month as number);
    let days: DayInfo[] = reactive([]);
    let start: Ref<number> = ref(_dayMsg.day as number);
    let end: Ref<number>  = ref(0);
    let festival = {
        lunar: defaultLunar,//农历
        gregorian: defaultGregorian,//阳历
    };
    let lastWeek = reactive([]);
    let activeIndex = ref(-1);
    let activeDay: DayInfo = reactive({} as DayInfo);
    let activeEndDay = reactive({});
    let activeDays: DayInfo[] = reactive([]);

    getDays();

    activeIndex.value = days.findIndex((item: DayInfo) => {
        if( _dayMsg.day == item.day && _dayMsg.month == item.month ) return item;
    });
    activeDay = days[activeIndex.value] || {};
    activeDays = [{
        ... activeDay,
        index: activeIndex.value
    }];

    // 获取当前月份所有公历日期及其农历日期
    function getDays () {
        days = [];
        const time = new Date();
        time.setFullYear(year.value, month.value, 0);
        const firstDay = new Date(year.value, month.value - 1, 1); // 当月第一天
        // 获取星期中的第几天（0-6）(星期日-星期六)
        const weekIndex = firstDay.getDay() + 1;
        // == 0 ? 7 : firstDay.getDay();
        lastWeek = [];
        const lastDay = 42 - ( weekIndex + time.getDate() );
        for (let i = 1; i < weekIndex; i++) {
            let obj = dateGetDay(parseInt('-'+i),formatDate(year.value, month.value, 1));
            let data: DayInfo = { 
                gregorian: obj.day,
                lunar: getYearMonthDay(obj.year, obj.month, obj.day),
                date: formatDate(obj.year, obj.month, obj.day),
                sloarToLunar: sloarToLunar(obj.year, +obj.month.toString().padStart(2, '0'), obj.day),
                lastNextWeek: 1,
                disabled: true,
                xiu: false,
                ban: false,
                ... dateInfo(obj.year, obj.month, obj.day)
            };
            days.unshift(data);
        }
        for (let i = 1; i <= time.getDate(); i++) {
            let isFestival = false;// 是否节日
            let data = {};
            let yearEve = '';
            let lunarInfo: DayInfo = {
                gregorian: i,
                lunar: getYearMonthDay(year.value, month.value, i),
                date: formatDate(year.value, month.value, i),
                sloarToLunar: sloarToLunar(year.value, +month.value.toString().padStart(2, '0'),i),
                lastNextWeek:0,
                disabled:false,
                xiu:false,
                ban:false,
                ... dateInfo(year.value, month.value, i),
            };
            let lunarValue = lunarInfo.dayCn;
            if (lunarInfo.lMonth === 12 && lunarInfo.lDay === Calendar.monthDays(lunarInfo.lYear, 12)) {
                yearEve = '除夕';
                isFestival = true
            }
            // 判断农历节日
            if(festival.lunar[`${lunarInfo.lMonth}-${lunarInfo.lDay}` as LunarKeyType]){
                lunarValue = festival.lunar[`${lunarInfo.lMonth}-${lunarInfo.lDay}` as LunarKeyType],
                isFestival = true

            }else if(festival.gregorian[`${month.value}-${i}` as GregorianKeyType]){
                // 判断阳历节日
                lunarValue = festival.gregorian[`${month.value}-${i}` as GregorianKeyType],
                isFestival = true
            }
            days.push({
                ...lunarInfo,
                isFestival,
                term:yearEve||lunarInfo.term||lunarValue
            });
        }
        for ( let i = 0; i <= lastDay; i++){
            let _obj = dateGetDay( parseInt(''+i), formatDate(
				month.value == 12 ? year.value+1 : year.value, 
				month.value < 12 ? month.value + 1 : 1, 
				1
			);
            let data: DayInfo = { 
                gregorian: _obj.day,
                lunar: getYearMonthDay(_obj.year, _obj.month, _obj.day),
                date: formatDate(_obj.year, _obj.month, _obj.day),
                sloarToLunar:sloarToLunar(_obj.year, +_obj.month.toString().padStart(2, '0'),_obj.day),
                lastNextWeek:2,
                disabled:true,
                xiu:false,
                ban:false,
                ...dateInfo(_obj.year, _obj.month, _obj.day),
            };
            days.push(data);
        }
    }

    function dateGetDay(day: number,data: DateValue){
        let result = Calendar.$getDay(day, data);
        let list = result.split('/');
        return {year:parseInt(list[0]),month:parseInt(list[1]),day:parseInt(list[2]),time:result};
    }

    function dateInfo(y: number, m: number, d: number): CalendarInfo {
        return Calendar.solar2lunar(y, m, d) as CalendarInfo;
    }

    return toRefs({
        container,
        font,
        year,
        month,
        days,
        start,
        end,
        festival,
        lastWeek,
        activeIndex,
        activeDay,
        activeEndDay,
        activeDays,
        getDays
    });
}