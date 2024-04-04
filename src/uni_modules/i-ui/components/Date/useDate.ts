import { getDate, isDateString, isTimeString } from "ipink-util";
import { Ref, ref, computed, toRefs, nextTick} from "vue"
import { 
    DatePropsType, getNowDate, WeekItem, 
    MinuteItemType, HourItemType,
    MINUTES_DATA, HOURS_DATA 
} from "./date";
import { PopupRefType } from "../Popup/popup";

type FormatOptType = "yy" | "mm" | "dd" | "hh" | "ff"
export function useDate (props: DatePropsType) {
    let selectedValue: Ref<number[]> = ref([]),
        years: Ref<number[]> = ref([]),
        months: Ref<number[]> = ref([]),
        days: Ref<number[]> = ref([]),
        hours: Ref<HourItemType[]> = ref([]),
        minutes: Ref<MinuteItemType[]> = ref([]),
		weekBackup: Ref<WeekItem[]> = ref([]),
        myWeekList: Ref<WeekItem[]> = ref(props.weekList),
        dateRef: Ref<PopupRefType | null> = ref(null),
        types = [
            "yy" , 
            "yy-mm" , "yy-mm-dd" , "yy-mm-dd hh" , "yy-mm-dd hh:ff" ,
            "yy/mm" , "yy/mm/dd" , "yy/mm/dd hh" , "yy/mm/dd hh:ff" ,
            "hh:ff"
        ];
    const defaultValue = computed(() => {
        let _date = props.modelValue || props.value || getNowDate();
        if(props.format == "hh:ff" ){
            if(!isTimeString(_date)) _date = getDate(void 0, 2) as string;
        }
        else {
            if(!isDateString(_date.split("-").join("/"))) _date = getNowDate();
        }
        return _date
    })
    function init () {
        let v="";
        try{
            if(!types.includes(props.format)){
                throw new TypeError("请输入正确的format格式: " + props.format);
            }
            v = getNowFormat(defaultValue.value);
            
        }catch(e){
            console.log("e:   ",e)
        }
        getYears();
        getMonths(v);
        getDays(v || getNowDate());
        getHours();
        getMinutes();
        getPickerValue(v);
    }
    function getNowFormat(v: string): string {
        v = v.trim();
        // -  替换 / 处理小时和分钟格式    删除空格
        let date: string[] = v.replace(/-/g, "/").replace(" ", "/").replace(":", "/").split("/").map(item => item.trim());
        let year: string = date[0] ||  "";
        let month: string = date[1] || "";
        let day: string = date[2] ||  "";
        let hour: string = (v.indexOf(" ")>=0 ? new Date(v+":00")  : new Date()).getHours() + '';
        hour = +hour > 9 ? hour : "0" + hour;
        let minute: string = (v.indexOf(":")>=0 ? new Date(v+":00")  : new Date()).getMinutes() + '';
        minute = +minute > 9 ? minute: "0" + minute;
        let _format = {
            "yy": year,
            "mm": month,
            "dd": day,
            "hh": hour,
            "ff": minute,
        } as const;
        let _date: string[] = [];
        let _time: string[] = [];
        props.format.replace(/-/g, "/").replace(" ", "/").replace(":", "/").split("/").forEach((item: string) => {
            if(item == "hh" || item == "ff"){
                _time.push(_format[item as FormatOptType])
            } else {
                _date.push(_format[item as FormatOptType])
            }
        })
        if(props.format == "hh:ff"){
            return (v.indexOf(":")>=0 ? v : hour+":"+minute);
        }
        return _date.join("/") + (_time.length > 0?" ":"") + _time.join(":");
    }
    function getPickerValue(showDate: string) {
        let showArray: number[] = [];
        let _showArray = props.format.replace(/-/g, "/").replace(" ", "/").replace(":", "/").split("/");
        _showArray.forEach(item => {
            showArray.push(0);
        })
        showDate = showDate.replace(" ", "/").replace(":","/");
        let showDateArray = showDate.split("/");
        props.format.indexOf("yy")>=0 && years.value.forEach((el, index) => {
            if (Number(showDateArray[0]) == el) {
                showArray[0] = index;
                return false;
            }
        })
        props.format.indexOf("mm")>=0 && months.value.forEach((el, index) => {
            if (Number(showDateArray[1]) == el) {
                showArray[1] = index;
                return false;
            }
        })
        props.format.indexOf("dd")>=0 && days.value.forEach((el, index) => {
            if (Number(showDateArray[2]) == el) {
                showArray[2] = index;
                return false;
            }
        })
        props.format.indexOf("hh")>=0 && hours.value.forEach((el, index) => {
            let _i = props.format == "hh:ff" ? 0 : 3;
            if (Number(showDateArray[_i]) == el) {
                showArray[_i] = index;
                return false;
            }
        })
        props.format.indexOf("ff")>=0 && minutes.value.forEach((el, index) => {
            let _i = props.format == "hh:ff" ? 1 : 4;
            if (Number(showDateArray[_i]) == el) {
                showArray[_i] = index;
                return false;
            }
        })
        nextTick(() => {
            selectedValue.value = showArray;
        })
    }
    function getYears() {
        let startDateArray: string[] = props.startDate.split("-").join("/").split("/");
        let endDateArray: string[] = props.endDate.split("-").join("/").split("/");
        let startYear: number = Number(startDateArray[0]);
        let endYear: number = Number(endDateArray[0]);

        let newYears: number[] = []
        for (let i = startYear; i <= endYear; i++) {
            newYears.push(i);
        }
        years.value = newYears;
    }
    function getMonths(nowDate: string) {
        let startDateArray: string[] = props.startDate.split("-").join("/").split("/");
        let endDateArray: string[] = props.endDate.split("-").join("/").split("/");
        let nowDateArray: string[] = nowDate.split("/");
        let startYear: number = Number(startDateArray[0]);
        let endYear: number = Number(endDateArray[0]);
        let startMonth: number = Number(startDateArray[1]);
        let endMonth: number = Number(endDateArray[1]);

        let newMonths: number[] = [];
        if (startYear == Number(nowDateArray[0])) {
            if (endYear == Number(nowDateArray[0])) { // 起始年份,末尾年份一样时
                for (let i = startMonth; i <= endMonth; i++) {
                    newMonths.push(i);
                }
            } else {
                for (let i = startMonth; i <= 12; i++) {
                    newMonths.push(i);
                }
            }
        } else if (endYear == Number(nowDateArray[0])) {
            for (let i = 1; i <= endMonth; i++) {
                newMonths.push(i);
            }
        } else {
            for (let i = 1; i <= 12; i++) {
                newMonths.push(i);
            }
        }
        months.value = newMonths;
    }
    function getHours() {
        hours.value = HOURS_DATA as unknown as HourItemType[];
    }
    function getMinutes() {
        minutes.value = MINUTES_DATA as unknown as MinuteItemType[];
    }
    function getDays(nowDate: string) {
        let startDateArray: string[] = props.startDate.split("-").join("/").split("/");
        let endDateArray: string[] = props.endDate.split("-").join("/").split("/");
        let nowDateArray: string[] = nowDate.split("/");
        let startYear: number = Number(startDateArray[0]);
        let endYear: number = Number(endDateArray[0]);
        let startMonth: number = Number(startDateArray[1]);
        let endMonth: number = Number(endDateArray[1]);
        let startDay: number = Number(startDateArray[2]);
        let endDay: number = Number(endDateArray[2]);
        let totalDays: number = new Date(+nowDateArray[0], +nowDateArray[1], 0).getDate();

        let newDays: number[] = [];
        if (startYear == Number(nowDateArray[0]) && startMonth == Number(nowDateArray[1])) {
            if (endYear == Number(nowDateArray[0]) && endMonth == Number(nowDateArray[1])) {
                for (let i = startDay; i <= endDay; i++) {
                    newDays.push(i);
                }
            } else {
                for (let i = startDay; i <= totalDays; i++) {
                    newDays.push(i);
                }
            }
        } else if (endYear == Number(nowDateArray[0]) && endMonth == Number(nowDateArray[1])) {
            for (let i = 1; i <= endDay; i++) {
                newDays.push(i);
            }
        } else {
            for (let i = 1; i <= totalDays; i++) {
                newDays.push(i);
            }
        }
        days.value = newDays;
    }

    return toRefs({
        selectedValue,
        years,
        months,
        days,
        hours,
        minutes,
        weekBackup,
        myWeekList,
        types,
        getYears,
        getMonths,
        getHours,
        getMinutes,
        getDays,
        getNowFormat,
        getPickerValue,
        init,

        dateRef
    })
}