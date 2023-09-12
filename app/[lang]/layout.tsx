import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Toaster } from '@/components/ui/Toaster';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { getI18n } from '@/i18n';
import { getSidebarGroup } from '@/lib/getSidebarGroup';
import { ILanguageCode } from '@/model/i18n';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './global.css';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });
// export async function generateStaticParams() {
// 	return i18nConfig.locales.map((locale) => ({ lang: locale as string }));
// }
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
	const dict = await getI18n(params.lang);
	return {
		title: dict.metadata.title,
		description: dict.metadata.description,
	};
}

export default async function RootLayout({
	children,
	params,
	modal,
}: {
	children: ReactNode;
	params: { lang: string };
	modal: ReactNode;
}) {
	const lang = params?.lang || ILanguageCode.en;
	const langDict = await getI18n(lang);

	return (
		<html lang={lang}>
			<body className={inter.className}>
				<NextIntlClientProvider locale={lang} messages={langDict}>
					<TooltipProvider disableHoverableContent delayDuration={500} skipDelayDuration={0}>
						<div className='w-screen h-screen overflow-hidden flex flex-col'>
							<Header lang={lang} />
							<div className='flex-1 w-full overflow-hidden grid grid-cols-[240px_5fr]'>
								<div className='border-r'>
									<Sidebar sidebarGroup={getSidebarGroup(langDict.sidebar)} />
								</div>
								{children}
							</div>
							<Toaster />
							{modal}
						</div>
					</TooltipProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
