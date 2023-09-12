'use client';
import { cn } from '@/lib/utils';
import { IOption } from '@/model/IOption';
import { format, isValid } from 'date-fns';
import { ScrollArea } from './ScrollArea';
import { Toggle } from './Toggle';

interface IToggleSelectionProps {
	value: Date | undefined;
	onChange: (timeString: string) => void;
	className?: string;
	options: IOption[];
}

export function ToggleSelection({ value, onChange, className, options }: IToggleSelectionProps) {
	return (
		<ScrollArea className={cn(className)}>
			{options.map((option) => {
				return (
					<Toggle
						key={option.value}
						className='w-full h-8 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
						pressed={value && isValid(value) && option.value === format(value, 'HH:mm')}
						disabled={!value || !isValid(value)}
						onPressedChange={() => {
							onChange(option.value);
						}}
					>
						{option.label}
					</Toggle>
				);
			})}
		</ScrollArea>
	);
}
