import { IDistributionDetail } from './IDistributionDetail';

export interface IDistributionInfo {
	rewardName: string;
	createOn: string;
	winnerLists: IDistributionDetail[];
}
