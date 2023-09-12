import { CreateDistributionPopup } from '@/components/popup/CreateDistributionPopup';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { getGameCodeList, searchEventList, searchRewardList } from '@/lib/serverAction';
import { ISearchRewardOutput } from '@/model/promotion';
import { SearchGameEventDataTable } from '../../_components/SearchGameEventDataTable';
import { SearchGameEventHeader } from '../../_components/SearchGameEventHeader';
import Loading from './loading';
import { ALL } from '@/config';
import { subMonths } from 'date-fns';

export default async function Page({
	params: { lang },
	searchParams,
}: {
	params: { lang: string };
	searchParams: ISearchRewardOutput;
}) {
	const data = await searchRewardList(searchParams);

	const gameLists = await getGameCodeList();

	if (!gameLists) return <Loading />;

	const res = await searchEventList({
		startTime: subMonths(new Date(), 2).toISOString(),
		endTime: new Date().toISOString(),
		gameCode: ALL,
		status: ALL,
	});
	const eventList = res.data?.map(({ eventId, eventName }) => ({
		value: eventId,
		label: eventName,
	}));
	return (
		<Card>
			<CardHeader>
				<div className='flex justify-between'>
					<SearchGameEventHeader searchParams={searchParams} />
					<CreateDistributionPopup eventList={eventList || []} className='mt-10' />
				</div>
			</CardHeader>
			<CardContent>
				<SearchGameEventDataTable data={data} />
			</CardContent>
		</Card>
	);
}
