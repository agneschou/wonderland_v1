import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_SUBSCRIPT,
	MARK_SUPERSCRIPT,
	MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { usePlateReadOnly } from '@udecode/plate-common';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';

import { Baseline, Bold, Italic, PaintBucket, Strikethrough, Subscript, Superscript, Underline } from 'lucide-react';
import { ToolbarGroup } from '../ui/Toolbar';
import { ColorDropdownMenu } from './ColorDropdownMenu';
import { EmojiDropdownMenu } from './EmojiDropdownMenu';
import { LinkToolbarButton } from './LinkToolbarButton';
import { MarkToolbarButton } from './MarkToolbarButton';
import { TurnIntoDropdownMenu } from './TurnIntoDropdownMenu';

export function FixedToolbarButtons() {
	const readOnly = usePlateReadOnly();

	return (
		<div className='w-full overflow-hidden'>
			<div
				className='flex flex-wrap'
				style={{
					transform: 'translateX(calc(-1px))',
				}}
			>
				{!readOnly && (
					<>
						<ToolbarGroup>
							<TurnIntoDropdownMenu />
						</ToolbarGroup>

						<ToolbarGroup>
							<ColorDropdownMenu nodeType={MARK_COLOR} tooltip='Text Color'>
								<Baseline />
							</ColorDropdownMenu>
							<ColorDropdownMenu nodeType={MARK_BG_COLOR} tooltip='Highlight Color'>
								<PaintBucket />
							</ColorDropdownMenu>
						</ToolbarGroup>

						<ToolbarGroup>
							<MarkToolbarButton tooltip='Bold (⌘+B)' nodeType={MARK_BOLD}>
								<Bold />
							</MarkToolbarButton>
							<MarkToolbarButton tooltip='Italic (⌘+I)' nodeType={MARK_ITALIC}>
								<Italic />
							</MarkToolbarButton>
							<MarkToolbarButton tooltip='Underline (⌘+U)' nodeType={MARK_UNDERLINE}>
								<Underline />
							</MarkToolbarButton>
							<MarkToolbarButton tooltip='Strikethrough' nodeType={MARK_STRIKETHROUGH}>
								<Strikethrough />
							</MarkToolbarButton>
							<MarkToolbarButton tooltip='Superscript' nodeType={MARK_SUPERSCRIPT}>
								<Superscript />
							</MarkToolbarButton>
							<MarkToolbarButton tooltip='Subscript' nodeType={MARK_SUBSCRIPT}>
								<Subscript />
							</MarkToolbarButton>
						</ToolbarGroup>

						<ToolbarGroup>
							<EmojiDropdownMenu />
							<LinkToolbarButton />
						</ToolbarGroup>
					</>
				)}

				<div className='grow' />
			</div>
		</div>
	);
}
