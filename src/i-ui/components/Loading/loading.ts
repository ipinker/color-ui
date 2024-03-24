import {PropType} from "vue";

/**
 * @description  Button的种类
 */
export const loadingTypeList = [
    "0", "1", "2", "3"
] as const;
export type LoadingType = (typeof loadingTypeList) [number];


/**
 * @description Loading的属性
 */
export const loadingProps = {
    /** @desc Loading 尺寸 **/
    size: String as PropType<string>,
    /** @desc Loading 类型 **/
    type: {
        type: String as PropType<LoadingType>,
        default: "0"
    },
    /** @desc Loading的填充色 **/
    color: String,
    /** @desc 开启遮罩, 权重最高 **/
    useMask: Boolean,
    /** @desc 开启局部遮罩 **/
    usePartMask: Boolean,
    markIndex: String

} as const;

export type LoadingPropsType = typeof loadingProps;
