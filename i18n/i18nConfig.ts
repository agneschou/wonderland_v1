import { ILanguageCode } from '@/model/i18n';

export const i18nConfig = {
	defaultLocale: ILanguageCode.en.toString(),
	locales: [
		ILanguageCode.en.toString(),
		ILanguageCode.zh.toString(),
		ILanguageCode.vi.toString(),
		ILanguageCode.th.toString(),
	],
};

export const inputPlaceholder = `{0}`;
