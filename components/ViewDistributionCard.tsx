import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/ui/DataTable';
import { getI18n } from '@/i18n';
import { getDisttributionDetail as getDistributionDetail } from '@/lib/serverAction';
import { IDistributionDetail } from '@/model/promotion/IDistributionDetail';
import { ColumnDef } from '@tanstack/react-table';

export async function ViewDistributionCard({
	params: { lang, rewardId },
}: {
	params: { lang: string; type: string; rewardId: string };
}) {
	const dict = await getI18n(lang);
	const data = await getDistributionDetail(rewardId);

	const columns: ColumnDef<IDistributionDetail>[] = [
		{
			accessorKey: 'playerId',
			header: dict.viewDistribution.eventHeader.playerId,
		},
		{
			accessorKey: 'displayName',
			header: dict.viewDistribution.eventHeader.displayName,
		},
		{
			accessorKey: 'rewardAmount',
			header: dict.viewDistribution.eventHeader.rewardAmount,
		},
		{
			accessorKey: 'rewardStatus',
			header: dict.viewDistribution.eventHeader.rewardStatus,
		},
		{
			accessorKey: 'reason',
			header: dict.viewDistribution.eventHeader.reason,
		},
	];

	return (
		<div>
			<CardHeader>
				<CardTitle>{dict.viewDistribution.title}</CardTitle>
				<CardDescription>{dict.viewDistribution.description}</CardDescription>
			</CardHeader>
			<CardContent>
				{data.data ? (
					<div className='space-y-2'>
						<div className='flex gap-6'>
							<p className='space-x-2'>
								<span className='text-muted-foreground font-medium'>{dict.viewDistribution.rewardName}:</span>
								<span className='text-foreground '>{data.data.rewardName}</span>
							</p>
							<p className='space-x-2'>
								<span className='text-muted-foreground font-medium'>{dict.viewDistribution.createOn}:</span>
								<span className='text-foreground'>{new Date(data.data.createOn).toLocaleString()}</span>
							</p>
						</div>
						<DataTable columns={columns} data={data.data.winnerLists || []} />{' '}
					</div>
				) : (
					<div>{dict.errorMessage.noData}</div>
				)}
			</CardContent>
		</div>
	);
}
