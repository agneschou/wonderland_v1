import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { addAllOption } from '@/lib/helper';
import { getGameCodeList, searchEventList } from '@/lib/serverAction';
import { IOption } from '@/model/IOption';
import { ISearchStreamerEventOutput } from '@/model/promotion';
import { SearchGameEventDataTable } from '../../_components/SearchGameEventDataTable';
import { SearchGameEventHeader } from '../../_components/SearchGameEventHeader';
import Loading from './loading';

export default async function Page({
	params,
	searchParams,
}: {
	params: { lang: string };
	searchParams: ISearchStreamerEventOutput;
}) {
	console.log('searchParams', searchParams);

	const { data } = await searchEventList(searchParams);
	const gameLists = await getGameCodeList();

	if (!gameLists) return <Loading />;

	const gameCodeList: IOption[] = addAllOption(
		gameLists.map(({ gameCode, gameName }) => ({
			value: gameCode,
			label: gameName,
		}))
	);

	return (
		<Card>
			<CardHeader>
				<SearchGameEventHeader searchParams={searchParams} gameCodeList={gameCodeList} />
			</CardHeader>
			<CardContent>
				<SearchGameEventDataTable data={data} />
			</CardContent>
		</Card>
	);
}
