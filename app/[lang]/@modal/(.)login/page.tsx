import { LoginForm } from '@/components/form/LoginForm';
import { getI18n } from '@/i18n';

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
	const langDict = await getI18n(lang);

	return <LoginForm dict={langDict} isModal />;
}
