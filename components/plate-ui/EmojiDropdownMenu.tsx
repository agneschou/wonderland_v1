import { EmojiDropdownMenuOptions, useEmojiDropdownMenuState } from '@udecode/plate-emoji';

import { EmojiToolbarDropdown } from '@/components/plate-ui/EmojiToolbarDropdown';
import { ToolbarButton, ToolbarButtonProps } from '@/components/ui/Toolbar';

import { Smile } from 'lucide-react';
import { emojiCategoryIcons, emojiSearchIcons } from './EmojiIcons';
import { EmojiPicker } from './EmojiPicker';

type EmojiDropdownMenuProps = {
	options?: EmojiDropdownMenuOptions;
} & ToolbarButtonProps;

export function EmojiDropdownMenu({ options, ...props }: EmojiDropdownMenuProps) {
	const { isOpen, setIsOpen, emojiPickerState } = useEmojiDropdownMenuState(options);

	return (
		<EmojiToolbarDropdown
			control={
				<ToolbarButton pressed={isOpen} isDropdown tooltip='Emoji' {...props}>
					<Smile />
				</ToolbarButton>
			}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<EmojiPicker
				{...emojiPickerState}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				icons={{
					categories: emojiCategoryIcons,
					search: emojiSearchIcons,
				}}
				settings={options?.settings}
			/>
		</EmojiToolbarDropdown>
	);
}
