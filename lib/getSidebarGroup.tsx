import { User } from 'lucide-react';
import { routes } from './routes';

export function getSidebarGroup({
	user,
	accountManagement,
	accountProfileManagement,
	promotionManagement,
	promotionApplication,
	createStreamerEvent,
	manualPointGiveaway,
}: IntlMessages['sidebar']): { label: string; list: { label: string; path: string; icon: JSX.Element }[] }[] {
	return [
		{
			label: user,
			list: [
				{
					label: accountManagement,
					path: routes.accountManagement,
					icon: <User size={16} />,
				},
				{
					label: accountProfileManagement,
					path: routes.agentProfileManagement,
					icon: <User size={16} />,
				},
			],
		},
		{
			label: promotionManagement,
			list: [
				{
					label: promotionApplication,
					path: routes.promotionApplication,
					icon: <User size={16} />,
				},
				{
					label: createStreamerEvent,
					path: routes.createStreamerEvent,
					icon: <User size={16} />,
				},
				{
					label: manualPointGiveaway,
					path: routes.manualPointGiveaway,
					icon: <User size={16} />,
				},
			],
		},
	];
}
