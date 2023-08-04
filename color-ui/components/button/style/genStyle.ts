import {
    Size, SIZES,
    Radius, RADIUS
} from "../../../common/constant";
import type { ExtractPropTypes } from 'vue';
import type {ButtonPropsType} from "../src/button";
/**
 * @description 根据按钮的类型 <type> 生成指定的 class 集合
 */
export const genButtonTypeClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {

    return [
        `button-type-${ props.type }`,
        props.primary ? `button-type-primary` : "",
        props.success ? `button-type-success` : "",
        props.warning ? `button-type-warning` : "",
        props.info ? `button-type-info`: "",
        props.danger ? `button-type-danger`: "",
        props.link ? `button-type-link`: "",
        props.dashed ? "button-type-dashed" : "",
        props.plain ? "button-type--plain" : "",
        props.round ? `button-type-round`: "",
        props.text ? `button-type-text`: "",
        props.disabled ? `button-type-disabled`: ""
    ];
};

/**
 * @description 根据按钮的尺寸 <size> 生成指定的 class 集合
 */
export const genButtonSizeClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
    return [
        SIZES.includes(props.size as Size) ? `button-size-${ props.size }` : "",
    ];
};
export const genButtonSizeStyle = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
    return [
    ];
};

/**
 * @description 根据按钮的圆角 <radius> 生成指定的 class 集合
 */
export const genButtonRadiusClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
    return [
        RADIUS.includes(props.radius as Radius) ? `button-radius-${ props.radius }` : "",
    ];
};

export const genButtonRadiusStyle = (props: ExtractPropTypes<ButtonPropsType>): string[] => {
    return [

    ];
};

/**
 * @description 根据按钮的各种动画 <Animation> 生成指定的 class 集合
 */
export const genButtonAnimationClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {

    return [
    ];
};

/**
 * @description 根据按钮的加载相关 <Loading> 生成指定的 class 集合
 */
export const genButtonLoadingClass = (props: ExtractPropTypes<ButtonPropsType>): string[] => {

    return [
    ];
};