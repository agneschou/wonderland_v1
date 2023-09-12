'use client';
import React from 'react';
import { useColorsCustom, useColorsCustomState } from '@udecode/plate-font';
import { ColorDropdownMenuItems } from './ColorDropdownMenuItems';
import { ColorInput } from './ColorInput';
import { buttonVariants } from '../ui/Button';
import { TColor } from '../../model/TColor';
import { DropdownMenuItem } from '../ui/DropdownMenu';
type ColorsCustomProps = {
	color?: string;
	colors: TColor[];
	customColors: TColor[];
	updateCustomColor: (color: string) => void;
	updateColor: (color: string) => void;
};

export function ColorsCustom({ color, colors, customColors, updateColor, updateCustomColor }: ColorsCustomProps) {
	const state = useColorsCustomState({
		color,
		colors,
		customColors,
		updateCustomColor,
	});
	const { inputProps, menuItemProps } = useColorsCustom(state);

	return (
		<div className='flex flex-col gap-4'>
			<ColorInput {...inputProps}>
				<DropdownMenuItem
					className={buttonVariants({
						variant: 'outline',
						isMenu: true,
					})}
					{...menuItemProps}
				>
					CUSTOM
				</DropdownMenuItem>
			</ColorInput>

			<ColorDropdownMenuItems color={color} colors={state.computedColors} updateColor={updateColor} />
		</div>
	);
}
