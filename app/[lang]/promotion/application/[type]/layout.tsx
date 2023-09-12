import { LinkTabsContent, LinkTabsList, TabsLink } from '@/components/ui/LinkTabs';
import { getI18n } from '@/i18n';
import { routes } from '@/lib/routes';
import { ReactNode } from 'react';
import { IApplicationType } from '../_lib/model';

export default async function Layout({
	params: { lang, type },
	...props
}: {
	params: { lang: string; type: IApplicationType };
	streamer: ReactNode;
	traffic: ReactNode;
}) {
	const dict = await getI18n(lang);

	return (
		<div className='p-2 w-full overflow-hidden'>
			<LinkTabsList className='grid grid-cols-2'>
				{Object.keys(IApplicationType)
					.slice(0, 2)
					.map((key: string) => (
						<TabsLink key={key} isActive={type === key} href={`${routes.promotionApplication}/${key}`}>
							{dict.promotionApplication[key as keyof typeof dict.promotionApplication].title}
						</TabsLink>
					))}
			</LinkTabsList>
			<LinkTabsContent className='w-full overflow-hidden'>{props[type]}</LinkTabsContent>
		</div>
	);
}
