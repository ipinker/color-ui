import { createI18n } from 'vue-i18n'

// 简体中文
import cn from "./lang/zh-Hans.json";
// 英文
import en from "./lang/en.json";
// 日文
import ja from "./lang/ja.json";


export const messages = {
    en,
    ja,
	"zh-Hans": cn,
	"zh-Hant": cn
};

const i18n = createI18n({
    locale: uni.getLocale(),
    messages
});

export default i18n;