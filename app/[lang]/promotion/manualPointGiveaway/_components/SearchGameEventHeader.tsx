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
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, getTime } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IApplicationType } from '../_lib/model';
import { ISearchRewardInput, ISearchRewardOutput, searchRewardSchema } from '@/model/promotion';
import { useTranslations } from 'next-intl';

const statusList: IOption[] = [
	{ value: ALL, label: ALL },
	{ value: 'Done', label: 'Done' },
	{ value: 'In Progress', label: 'In Progress' },
];

export function SearchGameEventHeader({
	searchParams,
}: {
	searchParams: ISearchRewardOutput;
}) {
	const t = useTranslations('manualPointGiveaway.manualBatch');
	const form = useForm<ISearchRewardInput>({
		defaultValues: {
			status: searchParams.status || ALL,
			eventRange: {
				from: parseIsoDefault(new Date(), searchParams.startTime),
				to: parseIsoDefault(addDays(new Date(), 7), searchParams.endTime),
			},
		},
		resolver: zodResolver(searchRewardSchema),
	});
	const router = useRouter();

	const onSubmit = form.handleSubmit((input: unknown) => {
		const queryParams = {
			...(input as ISearchParamsRecord),
			key: getTime(new Date()),
		} as unknown as ISearchParamsRecord;
		const param = new URLSearchParams(queryParams).toString();
		router.push(`${routes.manualPointGiveaway}/${IApplicationType.manualBatch}?${param}`);
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
		</div>
	);
}
