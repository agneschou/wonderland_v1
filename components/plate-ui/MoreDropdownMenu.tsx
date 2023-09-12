import { MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { focusEditor, toggleMark, usePlateEditorState } from '@udecode/plate-common';

import { useOpenState } from '@/hook/useOpenState';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal, Strikethrough, Superscript, Underline } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/DropdownMenu';
import { ToolbarButton } from '../ui/Toolbar';

export function MoreDropdownMenu(props: DropdownMenuProps) {
	const editor = usePlateEditorState();
	const openState = useOpenState();

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton pressed={openState.open} tooltip='Insert'>
					<MoreHorizontal />
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='start' className='flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto'>
				<DropdownMenuItem
					onSelect={() => {
						toggleMark(editor, {
							key: MARK_UNDERLINE,
							clear: MARK_UNDERLINE,
						});
						focusEditor(editor);
					}}
				>
					<Underline className='mr-2 h-5 w-5' />
					Underline
				</DropdownMenuItem>

				<DropdownMenuItem
					onSelect={() => {
						toggleMark(editor, {
							key: MARK_STRIKETHROUGH,
							clear: MARK_STRIKETHROUGH,
						});
						focusEditor(editor);
					}}
				>
					<Strikethrough className='mr-2 h-5 w-5' />
					Strikethrough
				</DropdownMenuItem>

				<DropdownMenuItem
					onSelect={() => {
						toggleMark(editor, {
							key: MARK_SUPERSCRIPT,
							clear: MARK_SUPERSCRIPT,
						});
						focusEditor(editor);
					}}
				>
					<Superscript className='mr-2 h-5 w-5' />
					Superscript
				</DropdownMenuItem>

				<DropdownMenuItem
					onSelect={() => {
						toggleMark(editor, {
							key: MARK_SUBSCRIPT,
							clear: MARK_SUBSCRIPT,
						});
						focusEditor(editor);
					}}
				>
					<Superscript className='mr-2 h-5 w-5' />
					Subscript
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
