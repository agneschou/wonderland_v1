'use client';
import { i18nConfig } from '@/i18n/i18nConfig';
import { ILanguageCode, ILanguageName } from '@/model/i18n';
import { useParams, usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { Selector } from './ui/Selector';

export function LanguageSelector({ placeholder = '' }: { placeholder?: string }) {
	const { lang } = useParams();
	const pathname = usePathname();
	const router = useRouter();
	const onChange = (lang: string) => {
		const result = path.join('/' + lang, ...pathname.split('/').slice(2));
		router.replace(result);
		return result;
	};

	return (
		<Selector
			className='w-[180px]'
			options={i18nConfig.locales.map((value) => ({
				value,
				label: ILanguageName[value as ILanguageCode],
			}))}
			value={lang as ILanguageCode}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
}
