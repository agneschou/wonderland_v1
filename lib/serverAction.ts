'use server';

import { IStreamerEvent } from '@/model/promotion/IStreamerEvent';
import { IChangePasswordInput } from '@/components/form/ChangePasswordForm';
import { ILoginInput } from '@/components/form/LoginForm';
import { IS_DEV, KEY_MAP, SERVER_API_URL } from '@/config';
import { createGetRequest, createPostFormDataRequest, createPostRequest } from '@/lib/createPostRequest';
import { ICountryDetail } from '@/model/ICountryDetail';
import { IGameCodeDetail } from '@/model/IGameCodeDetail';
import { cookies } from 'next/headers';
import { IUpdateProfileImageSchemaInput } from '@/components/ManageAgentProfile';
import { mockChangePassword, mockLogin, mockGetProfileInfo } from './mockServerAction';
import { apiRoutes } from './routes';
import { IDictI18n } from '@/model/i18n';
import { IResponse } from '@/model/IResponse';
import { IReward } from '@/model/promotion/IReward';
import { IDistributionDetail } from '@/model/promotion/IDistributionDetail';
import { ICreateDistributionInput, ISearchRewardOutput, ISearchStreamerEventOutput } from '@/model/promotion';
import { IDistributionInfo } from '@/model/promotion/IDistributionInfo';

export const login = async (values: ILoginInput, dict: IDictI18n) => {
	if (await mockLogin(true))
		return {
			isFirstLogin: true,
		};

	try {
		const res = await fetch(SERVER_API_URL + apiRoutes.login, createPostRequest('', values));

		if (!res.ok) {
			return {
				errorMsg: dict.login.error.unknownError,
			};
		}
		const data = await res.json();
		console.log('login', data);

		const returnCode = data.returnCode;
		console.log('returnCode', returnCode);

		if (returnCode !== 0) {
			let errorMsg = dict.login.error.unknownError;
			if (returnCode === 401) {
				errorMsg = dict.login.error.authFailed;
			} else if (returnCode === 2) {
				errorMsg = dict.login.error.accountLocked;
			}
			return {
				errorMsg,
			};
		}

		cookies().set(KEY_MAP.authToken, data.token);
		if (data.isFirstLogin) {
			cookies().set(KEY_MAP.isFirstLogin, 'true');
		}
		return {
			isFirstLogin: data.isFirstLogin,
		};
	} catch (e) {
		return {
			errorMsg: dict.login.error.unknownError,
		};
	}
};

export const updatePassword = async (values: IChangePasswordInput) => {
	if (await mockChangePassword()) return null;
	const res = await fetch(SERVER_API_URL + apiRoutes.updatePassword, createPostRequest(getToken(), values));

	if (!res.ok) {
		return;
	}
	cookies().delete(KEY_MAP.isFirstLogin);
};

export const createGameEvent = async (formData: FormData) => {
	if (IS_DEV)
		return {
			returnCode: 0,
			returnMsg: 'success',
		};

	// console.log(createPostRequest(getToken(), formData));

	const res = await fetch(SERVER_API_URL + apiRoutes.createGameEvent, createPostFormDataRequest(getToken(), formData));

	if (!res.ok && res.status !== 400) {
		return { returnMsg: 'unknownError' };
	}
	const data = await res.json();
	if (data.returnCode !== 0) {
		console.log(data);

		return data;
	}

	return data;
};

export const getCreateGameEventInfo = async () => {
	if (IS_DEV)
		return {
			gameLists: [
				{
					gameCode: '001',
					gameName: 'coc',
				},
			],
			countries: [
				{
					languageCode: 'zh-CN',
					language: 'zh-CN',
				},
			],
		};

	const res = await fetch(SERVER_API_URL + apiRoutes.getCreateGameEventInfo, createGetRequest(getToken()));

	console.log('GetCreateGameEventInfo', res);

	if (!res.ok) {
		console.log(res);
		return;
	}

	const data = await res.json();
	return data;
};

export const getCountryList = async (): Promise<ICountryDetail[] | undefined> => {
	if (IS_DEV)
		return [
			{
				languageCode: 'zh-CN',
				language: 'zh-CN',
				isoCode: 'CN',
				countryName: 'China',
			},
		];
	console.log(createGetRequest(getToken()));

	const res = await fetch(SERVER_API_URL + apiRoutes.getCountryList, createGetRequest(getToken()));

	if (!res.ok) {
		console.log(res);
		return;
	}

	const data = await res.json();
	console.log('getCountryList data', data);

	return data.countries;
};

export const getGameCodeList = async (): Promise<IGameCodeDetail[] | undefined> => {
	if (IS_DEV)
		return [
			{
				gameCode: '123',
				gameName: 'COC',
			},
			{
				gameCode: '123',
				gameName: 'Plinko',
			},
		];

	const res = await fetch(SERVER_API_URL + apiRoutes.getGameCodeList, createGetRequest(getToken()));

	if (!res.ok) {
		console.log(res);
		return undefined;
	}

	const data = await res.json();
	console.log('getGameCodeList data', data);

	return data.gameLists;
};

const getToken = () => {
	return cookies().get(KEY_MAP.authToken)?.value ?? '';
};

export async function logout() {
	cookies().delete(KEY_MAP.authToken);
}

export const searchEventList = async (values: ISearchStreamerEventOutput): Promise<IResponse<IStreamerEvent[]>> => {
	if (IS_DEV) {
		return {
			data: [
				{
					eventId: 'cbdde4ae-b320-4e04-aeca-d2b7d06480cf',
					eventName: 'TestGameEvent2',
					startTime: '2023-07-30T04:00:00Z',
					endTime: '2023-08-11T04:00:00Z',
					gameCode: '170281',
					gameName: 'CashOrCrash',
					budgetPoint: 0,
					rewardPoint: 0,
					collectionAmount: 0,
					participationAmount: 0,
					status: 'Approve',
					remark: 'www.google.com.tw',
					winnerListUrl: '',
				},
			],
			returnCode: 0,
			returnMsg: 'Success',
		};
	}
	const res = await fetch(SERVER_API_URL + apiRoutes.searchEventList, createPostRequest(getToken(), values));

	if (!res.ok) {
		return {
			returnCode: 1,
			returnMsg: 'unknownError',
		};
	}
	const data = await res.json();
	console.log('searchEventList dsadadada', data);
	return data;
};

export const duplicateEvent = async (eventId: string) => {
	console.log('duplicateEvent', eventId);

	const res = await fetch(SERVER_API_URL + apiRoutes.duplicateEvent, createPostRequest(getToken(), { eventId }));

	if (!res.ok) {
		return;
	}
};

export const getEventDetail = async (eventId: string) => {
	const res = await fetch(SERVER_API_URL + apiRoutes.getEventDetail, createPostRequest(getToken(), { eventId }));

	if (!res.ok) {
		return;
	}
};

export const searchRewardList = async (values: ISearchRewardOutput): Promise<IReward[] | undefined> => {
	console.log('ISearchRewardOutput', values);

	if (IS_DEV)
		return [
			{
				rewardId: '728ed52f',
				rewardName: 'string',
				totalRewardPoint: 20,
				status: 'closed',
				createdOn: '2023-08-24T09:19:59.630Z',
				gameName: 'string',
				applicant: 'nobody',
			},
			{
				rewardId: '728ed52f',
				rewardName: 'string',
				totalRewardPoint: 20,
				status: 'closed',
				createdOn: '2023-08-24T09:19:59.630Z',
				gameName: 'string',
				applicant: 'nobody',
			},
		];
	const res = await fetch(SERVER_API_URL + apiRoutes.searchRewardList, createPostRequest(getToken(), values));

	if (!res.ok) {
		return;
	}
	const data = await res.json();
	console.log('searchRewardList', data);

	return data.data;
};

export const updateProfileImg = async (values: IUpdateProfileImageSchemaInput) => {
	//if (await mockChangePassword()) return null;
	const res = await fetch(SERVER_API_URL + apiRoutes.updateProfileImage, createPostRequest(getToken(), { ...values }));
};

export const getProfileInfo = async () => {
	const mockData = await mockGetProfileInfo();

	if (mockData) {
		return mockData;
	}

	const res = await fetch(SERVER_API_URL + apiRoutes.getProfileInfo, createPostRequest(getToken(), {}));
	const data = await res.json();
	return data;
};

export const getDisttributionDetail = async (rewardId: string): Promise<IResponse<IDistributionInfo>> => {
	const res = await fetch(
		SERVER_API_URL + apiRoutes.getDistributionDetail,
		createPostRequest(getToken(), { rewardId })
	);
	if (!res.ok && res.status !== 400) {
		return {
			returnCode: 0,
			returnMsg: 'Unknown Error',
		};
	}
	const data = await res.json();
	return data;
};

export const createDistribution = async (input: FormData): Promise<IResponse> => {
	const res = await fetch(SERVER_API_URL + apiRoutes.createDistribution, createPostFormDataRequest(getToken(), input));
	if (res.ok && res.status !== 400) {
		return {
			returnCode: 0,
			returnMsg: 'Unknown Error',
		};
	}
	const data = await res.json();
	return data;
};
