import { UIConfigInstance } from "./common/config"
import { setDarkMode, setAppStyle as setStyle } from "./components/ThemeButton/themeButton";  
export * from "./common/constants"
export * from "./common/style"
export const UIConfig = UIConfigInstance;
export const setThemeMode = setDarkMode;
export const setAppStyle = setStyle;
const _uni : any = uni;
_uni.$i = {
    config: UIConfigInstance,
    setThemeMode,
    setAppStyle
}

const install = (Vue: any) => {
    // #ifndef APP-NVUE
    Vue.config.globalProperties.$i = _uni.$i;   
    // #endif
}

export default {
    install
}