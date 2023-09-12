'use client';
import React from 'react';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { usePlateReadOnly } from '@udecode/plate-common';

import { MarkToolbarButton } from './MarkToolbarButton';
import { MoreDropdownMenu } from './MoreDropdownMenu';
import { TurnIntoDropdownMenu } from './TurnIntoDropdownMenu';
import { Bold, Code, Italic, Strikethrough, Underline } from 'lucide-react';

export function FloatingToolbarButtons() {
	const readOnly = usePlateReadOnly();

	return (
		<>
			{!readOnly && (
				<>
					<TurnIntoDropdownMenu />

					<MarkToolbarButton nodeType={MARK_BOLD} tooltip='Bold (⌘+B)'>
						<Bold />
					</MarkToolbarButton>
					<MarkToolbarButton nodeType={MARK_ITALIC} tooltip='Italic (⌘+I)'>
						<Italic />
					</MarkToolbarButton>
					<MarkToolbarButton nodeType={MARK_UNDERLINE} tooltip='Underline (⌘+U)'>
						<Underline />
					</MarkToolbarButton>
					<MarkToolbarButton nodeType={MARK_STRIKETHROUGH} tooltip='Strikethrough (⌘+⇧+M)'>
						<Strikethrough />
					</MarkToolbarButton>
					{/* <MarkToolbarButton nodeType={MARK_CODE} tooltip='Code (⌘+E)'>
						<Code />
					</MarkToolbarButton> */}
				</>
			)}

			<MoreDropdownMenu />
		</>
	);
}
