'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { ColorDropdownMenuItems } from './ColorDropdownMenuItems';
import { ColorsCustom } from './ColorsCustom';
import { TColor } from '../../model/TColor';
import { buttonVariants } from '../ui/Button';
import { DropdownMenuItem } from '../ui/DropdownMenu';

type ColorPickerProps = {
	color?: string;
	colors: TColor[];
	customColors: TColor[];
	updateColor: (color: string) => void;
	updateCustomColor: (color: string) => void;
	clearColor: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorPickerContent({
	color,
	colors,
	customColors,
	updateColor,
	updateCustomColor,
	clearColor,
	className,
	...props
}: ColorPickerProps) {
	return (
		<div className={cn('flex flex-col gap-4 p-4', className)} {...props}>
			<ColorDropdownMenuItems color={color} colors={colors} updateColor={updateColor} />
			{color && (
				<DropdownMenuItem
					className={buttonVariants({
						variant: 'outline',
						isMenu: true,
					})}
					onClick={clearColor}
				>
					Clear
				</DropdownMenuItem>
			)}
		</div>
	);
}

export const ColorPicker = React.memo(
	ColorPickerContent,
	(prev, next) => prev.color === next.color && prev.colors === next.colors && prev.customColors === next.customColors
);
