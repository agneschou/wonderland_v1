'use client';
import { DataTable } from '@/components/ui/DataTable';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { IStreamerEvent } from '../../../../../model/promotion/IStreamerEvent';
import { StreamerActionGroup } from './StreamerActionGroup';

interface ISearchGameEventDataTable {
	data: IStreamerEvent[] | undefined;
}

export function SearchGameEventDataTable({ data }: ISearchGameEventDataTable) {
	const t = useTranslations();
	const eventT = useTranslations('promotionApplication.streamer.eventHeader');

	const event = {
		gameCode: eventT('gameCode'),
		gameName: eventT('gameName'),
		budgetPoint: eventT('budgetPoint'),
		rewardPoint: eventT('rewardPoint'),
		collectionAmount: eventT('collectionAmount'),
		participationAmount: eventT('participationAmount'),
		status: eventT('status'),
		remark: eventT('remark'),
	};
	const eventColumns: ColumnDef<IStreamerEvent>[] = Object.entries(event).map(([accessorKey, header]) => ({
		accessorKey,
		header,
	}));

	const eventTimeColumn: ColumnDef<IStreamerEvent> = {
		accessorKey: 'eventTime',
		header: eventT('eventTime'),
		cell: ({
			row: {
				original: { startTime, endTime },
			},
		}) => [startTime, endTime].map((time) => format(new Date(time), 'yyyy-MM-dd')).join(' - '),
	};

	const columns: ColumnDef<IStreamerEvent>[] = [
		{
			accessorKey: 'eventName',
			header: eventT('eventName'),
		},
		eventTimeColumn,
		...eventColumns,
		{
			id: 'action',
			header: eventT('action'),
			cell: ({ row: { original } }) => (
				<StreamerActionGroup winnerUrl={original.winnerListUrl} status={original.status} eventId={original.eventId} />
			),
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
