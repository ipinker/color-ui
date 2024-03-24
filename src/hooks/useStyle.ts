/*
 * @Author: Gavin New
 * @Date: 2024-02-19 10:21:24
 * @LastEditors: Gavin New
 * @LastEditTime: 2024-02-22 14:36:26
 * @FilePath: /renovation/src/hooks/useStyle.ts
 * @Description: 描述
 */
import { useThemeStore } from "@/store/theme";
import { computed } from "vue";
import { TinyColor } from "@ctrl/tinycolor";
import type { SeedKey } from "@/typings";

export const useStyle = (keys = []) => {

    const useStore = useThemeStore();

    const shadow = computed(() => ({ "box-shadow" : `0 4rpx 12rpx 0 ${useStore.theme?.colorShadowBase}`}));

    const container = computed(() => ({"background-color": useStore.theme?.colorBgContainer}));

    const placeHolder = computed(() => ({ "color": useStore.theme?.colorTextQuaternary })) ;
    const disabledFont = computed(() => ({ "color" : useStore.theme?.colorTextQuaternary}));

    const borderTop = computed(() => ({ "border-top" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}`}));
    const borderLeft = computed(() => ({ "border-left" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));
    const borderBottom = computed(() => ({ "border-bottom" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));
    const borderRight = computed(() => ({ "border-right" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));
    const border = computed(() => ({ "border" : `${useStore.theme?.borderWidth}rpx solid ${useStore.theme?.colorBorder}` }));

    const primaryText = computed(() => ({ "color" : useStore.theme?.colorPrimaryText }));
    const text = computed(() => ({ "color" : useStore.theme?.colorText }));

    const font = computed(() => ((colorKey ?: string) => ({ "color" : useStore.theme?.[(colorKey || "colorText") as SeedKey ] as string })));
    const bg = computed(() => ((colorKey ?: string, opacity?: number) => {
        let color: string = useStore.theme?.[(colorKey || "colorBgContainer") as SeedKey ] as string;
        if(typeof opacity !== "undefined") color = new TinyColor(color).setAlpha(opacity).toRgbString();
        return { "background-color" : color  };
    }));
    const bgi = computed(() => ((gradient ?: string) => ({ "background-image" : gradient })));

    return {
        shadow,
        container,
        borderTop,
        borderLeft,
        border,
        placeHolder,
        disabledFont,
        text,
        primaryText,
        font,
        bg,
        bgi,
        borderBottom,
        borderRight
    }
};
