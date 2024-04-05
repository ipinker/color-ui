import type { ThemeModeType, ThemeJson, ThemeJsonOption } from "../../type";
import { CLICK_EVENT, LIGHT_MODE_ID } from "../../index";
import json from "./theme.json";
import { ExtractPropTypes } from "vue";
/**
 * @desc 设置Tabbar的字体色背景色
 * @param tabColorMap { { color, selectedColor, borderStyle, backgroundColor } }
 * @return: 
 */
export function setTabBarStyle(mode: ThemeModeType, themeJson?: ThemeJson) {
    if(!themeJson) themeJson = json as ThemeJson;
    let isLight: boolean = mode == LIGHT_MODE_ID;
    let colorMap = themeJson[mode];
    const styleMap: any = {
        color: colorMap?.tabFontColor,
        selectedColor: colorMap?.tabSelectedColor,
        borderStyle: colorMap?.tabBorderStyle
    }
    if (isLight) styleMap.backgroundColor = "transparent";
    else styleMap.backgroundColor = colorMap?.bgColor;
    try {
        uni.setBackgroundColor && uni.setBackgroundColor({
            backgroundColor: colorMap.bgColor,
            backgroundColorTop: colorMap.bgColorTop,
            backgroundColorBottom: colorMap.bgColorBottom
        });
    } catch (error) {}
    try {
        uni.setNavigationBarColor && uni.setNavigationBarColor({
            frontColor: colorMap.navTxtStyle == "white" ? '#ffffff' : "#000000",
            backgroundColor: colorMap.navBgColor,
        }) 
    } catch (error) {}
    try { 
        uni.setBackgroundTextStyle && uni.setBackgroundTextStyle({ textStyle: colorMap.bgTxtStyle as string }) 
    } catch (error) {}
    try { 
        uni.setTabBarStyle && uni.setTabBarStyle(styleMap) 
    } catch (error) {}
}
/**
 * @desc 设置系统暗色模式
 * @param mode { ThemeModeType }
 * @return: 
 */
export function setDarkMode(mode: ThemeModeType) {
    const isDark = mode != LIGHT_MODE_ID
    // #ifdef H5
    if (document?.documentElement) {
        document.documentElement.classList.remove('dark-theme');
        if (isDark) document.documentElement.classList.add('dark-theme');
    }
    // #endif
    // #ifdef APP
    if(uni?.getSystemInfoSync) {
        try {
            if (uni.getSystemInfoSync().platform === 'android') {
                // 安卓系统
                const Context: any = plus.android.importClass('android.content.Context');
                const UiModeManager: any = plus.android.importClass('android.app.UiModeManager');
                const main: any = plus.android.runtimeMainActivity();
                const uiModeManager = main.getSystemService(Context.UI_MODE_SERVICE);
                if (uiModeManager && uiModeManager.getType() === UiModeManager.MODE_TYPE_DAYNIGHT) {
                    if (isDark) {
                        uiModeManager.setNightMode(UiModeManager.MODE_NIGHT_YES);
                    } else {
                        uiModeManager.setNightMode(UiModeManager.MODE_NIGHT_NO);
                    }
                }
            } else if (uni.getSystemInfoSync().platform === 'ios') {
                // iOS系统
                const UIViewControllerBasedStatusBarAppearance: any = plus.ios.importClass('UIViewControllerBasedStatusBarAppearance');
                // @ts-ignore
                const application = plus.ios.runtimeApplication();
                const key = UIViewControllerBasedStatusBarAppearance.key;
                const value = isDark ? 1 : 0;
                application.setInfoDictionaryValue(value, key);
                plus.ios.invoke('UIApplication', 'sharedApplication').setStatusBarStyle(isDark ? 3 : 2);
            }
        } catch (error) {
            
        }
    }
    // #endif
    setTabBarStyle(mode);
}

export const themeButtonProps = {
    /** @desc 按钮尺寸 **/
    size: {
        type: String,
        default: "50"
    },
    /** @desc 使用内置的设置全局暗黑模式 **/
    useBuiltIn: {
        type: Boolean,
        default: true
    }
}
export type ThemeButtonPropsType = ExtractPropTypes<typeof themeButtonProps>;

export type ThemeButtonEmitsType = {
    [CLICK_EVENT] : (mode: ThemeModeType) => void
}