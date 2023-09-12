'use client';
import { DataTable } from '@/components/ui/DataTable';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { IReward } from '@/model/promotion/IReward';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { StreamerActionGroup } from './StreamerActionGroup';

interface IRewardDataTable {
	data: IReward[] | undefined;
}

export function SearchGameEventDataTable({ data }: IRewardDataTable) {
	const t = useTranslations();
	const eventT = useTranslations('manualPointGiveaway.manualBatch.rewardHeader');

	const event = {
		applicant: eventT('applicant'),
		status: eventT('status'),
	};
	const eventColumns: ColumnDef<IReward>[] = Object.entries(event).map(([accessorKey, header]) => ({
		accessorKey,
		header,
	}));

	const eventTimeColumn: ColumnDef<IReward> = {
		accessorKey: 'eventTime',
		header: eventT('createdOn'),
		cell: ({
			row: {
				original: { createdOn },
			},
		}) => [createdOn].map((time) => format(new Date(time), 'yyyy-MM-dd')),
	};

	const columns: ColumnDef<IReward>[] = [
		{
			accessorKey: 'rewardName',
			header: eventT('rewardName'),
		},
		eventTimeColumn,
		{
			accessorKey: 'totalRewardPoint',
			header: eventT('totalRewardPoint'),
		},
		...eventColumns,
		{
			id: 'detail',
			header: eventT('detail'),
			cell: ({ row: { original } }) => <StreamerActionGroup rewardId={original.rewardId} />,
		},
	];

	return data ? (
		<ScrollArea horizontal className='w-full'>
			<DataTable columns={columns} data={data} />
		</ScrollArea>
	) : (
		<p className='text-center text-muted-foreground'>{t('errorMessage.noData')}</p>
	);
}
