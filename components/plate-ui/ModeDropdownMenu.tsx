import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { focusEditor, usePlateEditorState, usePlateReadOnly, usePlateStore } from '@udecode/plate-common';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useOpenState } from '@/hook/useOpenState';
import { Edit2, Eye } from 'lucide-react';
import { ToolbarButton } from '../ui/Toolbar';

export function ModeDropdownMenu(props: DropdownMenuProps) {
	const editor = usePlateEditorState();
	const setReadOnly = usePlateStore().set.readOnly();
	const readOnly = usePlateReadOnly();
	const openState = useOpenState();

	let value = 'editing';
	if (readOnly) value = 'viewing';

	const item: any = {
		editing: (
			<>
				<Edit2 className='mr-2 h-5 w-5' />
				<span className='hidden lg:inline'>Editing</span>
			</>
		),
		viewing: (
			<>
				<Eye className='mr-2 h-5 w-5' />
				<span className='hidden lg:inline'>Viewing</span>
			</>
		),
	};

	return (
		<DropdownMenu modal={false} {...openState} {...props}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton
					pressed={openState.open}
					tooltip='Editing mode'
					isDropdown
					className='min-w-[auto] lg:min-w-[130px]'
				>
					{item[value]}
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='start' className='min-w-[180px]'>
				<DropdownMenuRadioGroup
					className='flex flex-col gap-0.5'
					value={value}
					onValueChange={(newValue) => {
						if (newValue !== 'viewing') {
							setReadOnly(false);
						}

						if (newValue === 'viewing') {
							setReadOnly(true);
							return;
						}

						if (newValue === 'editing') {
							focusEditor(editor);
							return;
						}
					}}
				>
					<DropdownMenuRadioItem value='editing'>{item.editing}</DropdownMenuRadioItem>

					<DropdownMenuRadioItem value='viewing'>{item.viewing}</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
