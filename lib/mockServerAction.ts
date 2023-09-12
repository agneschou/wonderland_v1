'use server';
import { IS_DEV, KEY_MAP } from '@/config';
import { cookies } from 'next/dist/client/components/headers';

export const mockLogin = async (isFirstLogin: boolean) => {
	if (!IS_DEV) return false;
	cookies().set(KEY_MAP.authToken, '1234');

	if (isFirstLogin) {
		cookies().set(KEY_MAP.isFirstLogin, 'true');
	}
	return true;
};

export const mockChangePassword = async () => {
	if (!IS_DEV) return false;
	cookies().delete(KEY_MAP.isFirstLogin);
	return true;
};

export const mockGetProfileInfo = async () => {
	console.log(IS_DEV);
	if (!IS_DEV) return false;
	await new Promise(resolve => setTimeout(resolve, 1000));

	return {
		agentLogoURL: "https://storage.googleapis.com/wonderland_agentsite_img/ProfileImages/profileagentlogo.jpg",
		streamerLogoURL: "https://storage.googleapis.com/wonderland_agentsite_img/ProfileImages/profilestreamerlogo.jpg"
	};
};
