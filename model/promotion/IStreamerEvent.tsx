export interface IStreamerEvent {
	eventId: string;
	eventName: string;
	startTime: string;
	endTime: string;
	gameCode: string;
	gameName: string;
	budgetPoint: number;
	rewardPoint: number;
	collectionAmount: number;
	participationAmount: number;
	status: string;
	remark: string;
	winnerListUrl: string;
}
