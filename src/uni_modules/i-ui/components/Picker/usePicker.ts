import { Ref, computed, ref, nextTick, toRefs } from "vue"
import { PickerPropsType, PickerValueType } from "./picker";
import { PopupRefType } from "../Popup/popup";
import { isArray, isNumber, isObject, isString } from "ipink-util";
import { CHILDREN_KEY } from "../../common/constants";
import { StrNum, SelectOption, AnyObject } from "../../type"

export function usePicker (props: PickerPropsType) {

    let pickerRef: Ref<PopupRefType | null> = ref(null),
        dataList: Ref<AnyObject[]> = ref([]), //picker数据
        checkLabelArr: Ref<string[]> = ref([]), //数据name数据
        checkValueArr: Ref<StrNum[]> = ref([]), //数组code数据
        resultStr: Ref<string> = ref(""), //字符串数据
        pickerIndexList: Ref<number[]> = ref([]), //  默认索引
        confirmFlag: Ref<boolean> = ref(true), //确认选择按钮，如果==false 不能点击
        keyValue: Ref<string> = ref("value"),
        keyLabel: Ref<string> = ref("label"),
        keyChildren: Ref<string> = ref("children"),
        deepLength: Ref<number> = ref(1) //不传时默认获取数据的深度,最多3级	

    function initData() {
        let defaultIndexArr: number[] = [];
        let level = +props.level;
        let value: StrNum[] = (props.modelValue || props.value) as StrNum[];
        if((isString(value) || isNumber(value)) && !isArray(value)) value = [value as unknown as StrNum];
        // 几级联动
        if (!props.level || level > 3 || level < 1) {
            deepLength.value = 0;//初始值为1
            getDeepLength(props.list || []);
        } else {
            deepLength.value = level;
        }
        // 键名称不能为空, 数组数据不能为空
        if (!props.keys || props.list.length <= 0) return false;
        let init = getLinkageVal(value);
        defaultIndexArr = init?.defaultIndexArr || []; //默认值
        dataList.value = init?.dataList || []; //数据
        // label[] 集合["label1", "label12", "label23"]
        checkLabelArr.value = init.checkLabelArr || []; 
        // value[] 集合["1", "1-2", "1-2-3"]
        checkValueArr.value = init.checkValueArr || [];
        // labelStr = label1 label12 label23
        resultStr.value = init.resultStr || ""; 
        nextTick(() => {
            pickerIndexList.value = [... defaultIndexArr]; //默认值
        })
    }

    //获取数组深度
    function getDeepLength(list: unknown[]) {
        let childrenKey = props.keys?.children || CHILDREN_KEY;
        for (let index = 0; index < list.length; index++) {
            const item: any = list[index] as any;
            if(isObject(item) && Array.isArray(item[childrenKey]) && item[childrenKey].length){
                getDeepLength(item[childrenKey]);
                break;
            }
        }
        deepLength.value ++;
    }
    //初始化数据
    function getLinkageVal(value: StrNum[]) {
        let defaultIndexArr: number[] = [];
        let list: any[] = props.list as any[]; //未转换过的数据
        let level = deepLength.value; //几层联动
        let arr: StrNum[] = value; //默认值
        let checkLabelArr: string[] = [];
        let checkValueArr: StrNum[] = [];
        let resultStr = "";
        let dataList: any[] = [];
        let keys: SelectOption = props.keys;
        keyValue.value = keys.value;
        keyLabel.value = keys.label;
        keyChildren.value = keys.children;
        switch (level) {
            case 1:
                defaultIndexArr = [0];
                break;
            case 2:
                defaultIndexArr = [0, 0];
                break;
            case 3:
                defaultIndexArr = [0, 0, 0];
                break;
        }
        const getData = (obj: any[], key: number) => {
            if (key < level) {
                dataList.push(obj);
                if (!arr) {
                    let item = obj[0]; // 第一个数据
                    checkLabelArr.push(item[keyLabel.value]); //第一个数据的name值
                    checkValueArr.push(item[keyValue.value]); //第一个数据的code值
                    resultStr += item[keyLabel.value]; //第一个数据字符串name值；
                    if (item[keyChildren.value] && item[keyChildren.value].length) { //如果存在childer的话，接着循环
                        getData(item[keyChildren.value], key += 1);
                    }
                } else {
                    obj.map((v, j) => {
                        if (v[keyValue.value] == arr[key]) {
                            defaultIndexArr[key] = j;
                            checkLabelArr.push(v[keyLabel.value]);
                            checkValueArr.push(v[keyValue.value]);
                            resultStr += v[keyLabel.value];
                            if (v[keyChildren.value]) {
                                getData(v[keyChildren.value], key += 1);
                            }
                        }
                    });
                }
                return {
                    dataList, //数据
                    defaultIndexArr, //默认值
                    checkLabelArr, //各种格式数据
                    checkValueArr,
                    resultStr
                };
            }
            return {

            }
        };
        return getData(list, 0); //转换数据
    }
    return toRefs({
        pickerRef,

        dataList,
        checkLabelArr,
        checkValueArr,
        resultStr,
        pickerIndexList,
        confirmFlag,
        keyValue,
        keyLabel,
        keyChildren,
        deepLength,

        initData,
    })
}