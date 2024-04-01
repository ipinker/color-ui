/*
 * @Author: Gavin New
 * @Date: 2024-02-19 10:21:24
 * @LastEditors: Gavin New
 * @LastEditTime: 2024-02-22 14:36:26
 * @FilePath: /renovation/src/hooks/useStyle.ts
 * @Description: 描述
 */
import { computed, toRefs } from "vue";
import { mapStores } from "pinia"
import { TinyColor } from "@ctrl/tinycolor";
import type { SeedKey } from "../index";
import { useThemeStore } from "../theme";


export const useStyle = () => {

    const useStore = mapStores(useThemeStore).themeStoreStore();

    const colorFunc = (color: SeedKey | string): string => {
        const value: TinyColor = new TinyColor(color);
        if(value.isValid) return value.toRgbString();
        return useStore.theme?.[color as SeedKey] as string;
    };

    const shadow = computed(() => ({ "box-shadow" : `0 4rpx 12rpx 0 ${useStore.theme?.colorShadowBase}`}));


    const border = computed(() => ({ "border" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));
    const borderTop = computed(() => ({ "border-top" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}`}));
    const borderLeft = computed(() => ({ "border-left" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));
    const borderBottom = computed(() => ({ "border-bottom" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));
    const borderRight = computed(() => ({ "border-right" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));

    const placeHolder = computed(() => ({ "color": useStore.theme?.colorTextQuaternary })) ;
    const disabledFont = computed(() => ({ "color" : useStore.theme?.colorTextQuaternary}));
    const primaryText = computed(() => ({ "color" : useStore.theme?.colorPrimaryText }));
    const infoText = computed(() => ({ "color" : useStore.theme?.colorInfoText }));
    const text = computed(() => ({ "color" : useStore.theme?.colorText }));
    const whiteText = computed(() => ({ "color" : useStore.theme?.colorWhiteTextBase }));
    const font = computed(() => {
        return (colorStr ?: string) => {
            let color: string = colorFunc(colorStr || "colorText");
            return { 
                "color" : color
            }
        }
    });

    const container = computed(() => ({"background-color": useStore.theme?.colorBgContainer}));
    const primaryBg = computed(() => ({ "background-color" : useStore.theme?.colorPrimary }));
    const bgi = computed(() => ((gradient ?: string) => ({ "background-image" : gradient })));
    const bg = computed(() => {
        return (colorStr ?: string, opacity?: number) => {
            let color: string = colorFunc(colorStr || "colorBgContainer");
            if(typeof opacity !== "undefined") color = new TinyColor(color).setAlpha(opacity).toRgbString();
            return { 
                "background-color" : color  
            };
        }
    });

    const colorValue = computed(() => {
        return colorFunc
    });

    return toRefs({
        shadow,
        borderTop,
        borderLeft,
        border,
        placeHolder,
        disabledFont,
        text,
        container,
        whiteText,
        primaryText,
        primaryBg,
        infoText,
        font,
        bg,
        bgi,
        borderBottom,
        borderRight,
        colorValue
    })
};
