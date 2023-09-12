'use client';
import { Button } from '@/components/ui/Button';
import { KEY_MAP } from '@/config';
import { apiRoutes } from '@/lib/routes';
// import { duplicateEvent } from '@/lib/serverAction';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

export function StreamerActionGroup({
	eventId,
	status,
	winnerUrl,
}: {
	eventId: string;
	status: string;
	winnerUrl: string;
}): ReactNode {
	const filename = 'winnerList';
	const t = useTranslations('promotionApplication.streamer');

	return (
		<div className='flex gap-2'>
			<Button asChild className='flex'>
				<Link href={`/`}>{t('eventData.view')}</Link>
			</Button>
			{status == 'Closed' && (
				<Button asChild>
					<Link
						href={`${apiRoutes.downLoad}?${KEY_MAP.url}=${winnerUrl}`}
						target='_blank'
						download={`${filename}_${eventId}.txt`}
					>
						{t('eventData.downloadWinnerList')}
					</Link>
				</Button>
			)}
		</div>
	);
}
