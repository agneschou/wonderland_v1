import { inputPlaceholder } from './i18nConfig';

export function replacePlaceholder(origin: string, text: string | number) {
	return origin.replace(inputPlaceholder, text.toString());
}
