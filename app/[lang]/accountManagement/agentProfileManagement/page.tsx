import { ManageAgentProfile } from '@/components/ManageAgentProfile';
import { KEY_MAP } from '@/config';
import { getI18n } from '@/i18n';
import { cookies } from 'next/headers';
import { getProfileInfo } from '@/lib/serverAction';

export default async function Page({ params }: { params: { lang: string } }) {
	const profileInfo = await getProfileInfo();
				
	const isNotClosable = cookies().get(KEY_MAP.isFirstLogin)?.value === 'true';
	return <ManageAgentProfile profileInfo={profileInfo} dict={await getI18n(params.lang)} />;
}
