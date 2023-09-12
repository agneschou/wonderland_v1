import { ChangePasswordForm } from '@/components/form/ChangePasswordForm';
import { KEY_MAP } from '@/config';
import { cookies } from 'next/headers';

export default async function Page({ params }: { params: { lang: string } }) {
	const unableClose = cookies().get(KEY_MAP.isFirstLogin)?.value === 'true';

	return <ChangePasswordForm isModal unableClose={unableClose} />;
}
