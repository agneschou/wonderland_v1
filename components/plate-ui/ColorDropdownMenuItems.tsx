'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { TColor } from '../../model/TColor';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { buttonVariants } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

type ColorDropdownMenuItemProps = {
	value: string;
	isBrightColor: boolean;
	isSelected: boolean;
	updateColor: (color: string) => void;
	name?: string;
} & DropdownMenuItemProps;

type ColorDropdownMenuItemsProps = {
	color?: string;
	colors: TColor[];
	updateColor: (color: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ColorDropdownMenuItem({
	name,
	value,
	isBrightColor,
	isSelected,
	updateColor,
	className,
	...props
}: ColorDropdownMenuItemProps) {
	const content = (
		<DropdownMenuItem
			className={cn(
				buttonVariants({
					variant: 'outline',
					isMenu: true,
				}),
				'h-6 w-6 border border-solid border-muted p-0',
				!isBrightColor && 'border-transparent text-white',
				className
			)}
			style={{ backgroundColor: value }}
			onSelect={(e) => {
				e.preventDefault();
				updateColor(value);
			}}
			{...props}
		>
			{isSelected ? <Check /> : null}
		</DropdownMenuItem>
	);

	return name ? (
		<Tooltip>
			<TooltipTrigger asChild>{content}</TooltipTrigger>
			<TooltipContent>{name}</TooltipContent>
		</Tooltip>
	) : (
		content
	);
}

export function ColorDropdownMenuItems({
	color,
	colors,
	updateColor,
	className,
	...props
}: ColorDropdownMenuItemsProps) {
	return (
		<div className={cn('grid grid-cols-[repeat(10,1fr)] gap-1', className)} {...props}>
			{colors.map(({ name, value, isBrightColor }) => (
				<ColorDropdownMenuItem
					key={name ?? value}
					name={name}
					value={value}
					isBrightColor={isBrightColor}
					isSelected={color === value}
					updateColor={updateColor}
				/>
			))}
		</div>
	);
}
