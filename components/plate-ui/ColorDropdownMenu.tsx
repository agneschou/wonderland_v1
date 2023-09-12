'use client';
import React from 'react';
import { useColorDropdownMenu, useColorDropdownMenuState } from '@udecode/plate-font';
import { ToolbarButton } from '@/components/ui/Toolbar';
import { DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS } from '@/lib/colorConstants';
import { ColorPicker } from './ColorPicker';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/DropdownMenu';

type ColorDropdownMenuProps = {
	nodeType: string;
	tooltip?: string;
} & DropdownMenuProps;

export function ColorDropdownMenu({ nodeType, tooltip, children }: ColorDropdownMenuProps) {
	const state = useColorDropdownMenuState({
		nodeType,
		colors: DEFAULT_COLORS,
		customColors: DEFAULT_CUSTOM_COLORS,
		closeOnSelect: true,
	});

	const { menuProps, buttonProps } = useColorDropdownMenu(state);

	return (
		<DropdownMenu modal={false} {...menuProps}>
			<DropdownMenuTrigger asChild>
				<ToolbarButton tooltip={tooltip} {...buttonProps}>
					{children}
				</ToolbarButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='start'>
				<ColorPicker
					color={state.selectedColor || state.color}
					colors={state.colors}
					customColors={state.customColors}
					updateColor={state.updateColorAndClose}
					updateCustomColor={state.updateColor}
					clearColor={state.clearColor}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
