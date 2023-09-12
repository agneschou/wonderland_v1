export interface IResponse<T = undefined> {
	data?: T;
	returnCode: number;
	returnMsg: string;
}
