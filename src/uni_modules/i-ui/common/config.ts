import { ColorToken } from 'ipink-theme/dist/theme/interface';
import { Cache } from 'ipink-util';

const cache = new Cache('uiConfig');

export interface UIConfigBasicOption {
    unit?: "px" | "rpx"
    themeMode?: "light" | "dark"
    lang?: "en" | "es" | "fr" | "ja" | "zh-Hans" | "zh-Hant"
    primary?: ColorToken | any

    navigationBarProps?: {
        height?: string | number,
        titleAlign?: string,
        color?: string,
        bgColor?: string,
        statusColor?: string,
        backTxt?: string,
        backIcon?: string,
        primary?: boolean,
        gradientType?: "linear" | "radial",
        gradientValue?: string,
        statusBarInBody?: boolean
    }
    pageProps?: {
        nav?: boolean,
        tabHeight?: number,
        center?: boolean,
        loadingType?: "0" | "1" | "2" | "3",
        usePrimary?: boolean
    }
    iconProps?: {
        size?: string,
        color?: string,
        primary?: number,
    },
    inputProps?: {
        placeholder?: string,
        border?: boolean
    }
}

export interface UIConfigOption extends UIConfigBasicOption {
    unit: "px" | "rpx"
}

/** @desc 首次调用必须在 pinia 实例化之前 **/
export class UIConfig {
    id: string = "UI_CONFIG_OPTION_" + ( uni?.getSystemInfoSync && uni.getSystemInfoSync()?.appId );

    static instance: UIConfig;

    /** @desc 首次调用必须在 pinia 实例化之前 **/
    static createInstance(configOptions: UIConfigBasicOption) {
        if(UIConfig.instance) UIConfig.instance.updateOption(configOptions);
        if(!UIConfig.instance) UIConfig.instance = new UIConfig(configOptions);
        return UIConfig.instance;
    }

    #option: UIConfigOption = {
        /** @desc 外部通过 js props传入的单位依旧以 2倍图750标准传入，内部会自动转换为px， 如果设置unit 为 rpx则不会进行转px换算 **/
        unit: "px",
        /** @desc 默认主题模式，仅在APP首次安装时设置有效 **/
        themeMode: undefined,
        /** @desc 默认语言, 仅在APP首次安装时设置有效 **/
        lang: undefined,
        /** @desc 默认主题， 设置后将放置在内置主题列表的首个， 也可以通过themeStore.init重置内置主题列表设置默认主题，也可以通过。add & change(themeId) 方式 **/
        primary: undefined, 
        navigationBarProps: {
            
        },
        pageProps: {

        }
    }
    constructor(configOptions: UIConfigBasicOption) {
        this.reloadOptionByCache();
        this.updateOption(configOptions);
    }
    
    getOption() {
        this.reloadOptionByCache();
        return this.#option;
    }
    /**
     * @desc 用来更新组件库的全局配置
     * @param configOptions { UIConfigOption }`
     * @return: 
     */
    updateOption(configOptions: UIConfigBasicOption) {
        configOptions = configOptions || {}
        this.#option = {
            ... this.#option,
            ... configOptions
        }
        cache.set(this.id, this.#option);
    }

    // 每次初始化实例都要从本地缓存拿到缓存配置
    reloadOptionByCache() {
        const storage: UIConfigBasicOption = cache.get(this.id) || {};
        this.#option = {
            ... this.#option,
            ... storage
        }
    }

}
const _config = UIConfig.createInstance({});
export const UIConfigInstance = _config;