import { ILanguageCode } from '@/model/i18n';
import 'server-only';

const dictionaries = {
	[ILanguageCode.en]: async () => {
		const result = await import('./en.json');
		return result.default;
	},
};

export async function getI18n(locale: string) {
	return await (dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.en());
}
