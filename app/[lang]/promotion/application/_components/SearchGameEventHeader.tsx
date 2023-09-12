'use client';
import { FormDateRange } from '@/components/formField/FormDateRange';
import { FormSelect } from '@/components/formField/FormSelect';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { ALL } from '@/config';
import { parseIsoDefault } from '@/lib/date';
import { routes } from '@/lib/routes';
import { IOption } from '@/model/IOption';
import { ISearchParamsRecord } from '@/model/ISearchParamsInput';
import {
	ISearchStreamerEventInput,
	ISearchStreamerEventOutput,
	searchGameEventSchema,
	statusList,
} from '@/model/promotion';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, getTime } from 'date-fns';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IApplicationType } from '../_lib/model';

export function SearchGameEventHeader({
	searchParams,
	gameCodeList,
}: {
	searchParams: ISearchStreamerEventOutput;
	gameCodeList: IOption[];
}) {
	const form = useForm<ISearchStreamerEventInput>({
		defaultValues: {
			gameCode: searchParams.gameCode || ALL,
			status: searchParams.status || ALL,
			eventRange: {
				from: parseIsoDefault(new Date(), searchParams.startTime),
				to: parseIsoDefault(addDays(new Date(), 7), searchParams.endTime),
			},
		},
		resolver: zodResolver(searchGameEventSchema),
	});
	const router = useRouter();
	const t = useTranslations('promotionApplication.streamer');
	const onSubmit = form.handleSubmit((input: unknown) => {
		// const queryParams = {
		// 	...(input as ISearchParamsRecord),
		// 	key: getTime(new Date()),
		// } as unknown as ISearchParamsRecord;
		const param = new URLSearchParams(input as ISearchParamsRecord).toString();
		const newPath = `${routes.promotionApplication}/${IApplicationType.streamer}?${param}`;

		router.push(newPath);
	});

	return (
		<div className='flex gap-2'>
			<Form {...form}>
				<form onSubmit={onSubmit} className='flex gap-2'>
					<FormDateRange
						control={form.control}
						formatType='MMMM dd'
						name='eventRange'
						label={t('eventRange.label')}
						placeholder={t('eventRange.placeholder')}
						description={t('eventRange.description')}
					/>
					<FormSelect
						name='gameCode'
						options={gameCodeList}
						control={form.control}
						label={t('gameCode.label')}
						placeholder={t('gameCode.placeholder')}
						description={t('gameCode.description')}
					/>
					<FormSelect
						name='status'
						control={form.control}
						options={statusList}
						label={t('status.label')}
						placeholder={t('status.placeholder')}
						description={t('status.description')}
					/>
					<Button type='submit' className='mt-10'>
						{t('search')}
					</Button>
				</form>
			</Form>
			<Button asChild className='mt-10 ml-auto'>
				<Link href={`${routes.createStreamerEvent}`}>{t('create')}</Link>
			</Button>
		</div>
	);
}
