'use client';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { IApplicationType } from '../_lib/model';

export function StreamerActionGroup({ rewardId }: { rewardId: string }) {
	const t = useTranslations();
	return (
		<Button asChild className='flex'>
			<Link href={`${routes.manualPointGiveaway}/${IApplicationType.manualBatch}/view/${rewardId}`}>
				{t('manualPointGiveaway.manualBatch.eventData.view')}
			</Link>
		</Button>
	);
}
