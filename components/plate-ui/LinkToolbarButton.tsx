import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link';
import { Link } from 'lucide-react';
import { ToolbarButton } from '../ui/Toolbar';

export function LinkToolbarButton() {
	const state = useLinkToolbarButtonState();
	const { props } = useLinkToolbarButton(state);

	return (
		<ToolbarButton tooltip='Link' {...props}>
			<Link />
			<Link />
		</ToolbarButton>
	);
}
