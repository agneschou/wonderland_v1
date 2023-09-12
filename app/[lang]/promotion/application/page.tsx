import { routes } from '@/lib/routes';
import { redirect } from 'next/navigation';
import { IApplicationType } from './_lib/model';

export default function Page({ params: { lang } }: { params: { lang: string } }) {
	redirect(`${routes.promotionApplication}/${IApplicationType.streamer}`);
}
