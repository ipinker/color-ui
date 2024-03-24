import { createI18n } from 'vue-i18n'
import en from './lang/en.json'
import zhHans from './lang/zh-Hans.json'
import zhHant from './lang/zh-Hant.json'
const messages = {
	en,
	'zh-Hans': zhHans,
	'zh-Hant': zhHant
}

const i18n = createI18n({
    locale: uni?.getLocale && uni?.getLocale() || "zh-Hant",
    messages
});

export default i18n;