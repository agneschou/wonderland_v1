export enum ILanguageCode {
	en = 'en',
	zh = 'zh',
	vi = 'vi',
	th = 'th',
}

export enum ILanguageName {
	en = 'English',
	zh = '简体中文',
	vi = 'Tiếng Việt',
	th = 'ไทย',
}

type IEn = typeof import('../i18n/en.json');
export interface IDictI18n extends IEn {}
