'use client';

import { Button, buttonVariants } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { format, setHours, setMinutes } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { ToggleSelection } from './ToggleSelection';

const gnerateTimeOptions = (enableHalfHour: boolean) => {
	const options = [];
	for (let i = 0; i < 24; i++) {
		const hour = `${i}`.padStart(2, '0');
		const fullHour = `${hour}:00`;

		options.push({ label: fullHour, value: fullHour });
		if (enableHalfHour) {
			const halfHour = `${hour}:30`;
			options.push({ label: halfHour, value: halfHour });
		}
	}
	return options;
};
export interface IDateRangePicker
	extends ControllerRenderProps,
		Omit<React.HTMLAttributes<HTMLDivElement>, 'onBlur' | 'onChange'>,
		VariantProps<typeof buttonVariants> {
	formatType?: string;
	enableHour?: boolean;
	enableHalfHour?: boolean;
	fromHeaderText?: string;
	toHeaderText?: string;
}

export const DateRangePicker = forwardRef(
	(
		{
			className,
			formatType = 'LLL dd',
			value,
			onChange,
			placeholder,

			enableHour = false,
			enableHalfHour = false,
			fromHeaderText = '',
			toHeaderText = '',
		}: IDateRangePicker,
		ref
	) => {
		const changeFromHour = (time: string) => {
			if (!value || !value.from) return;
			return onChange({
				from: changeTime(value.from, time),
				to: value.to,
			});
		};

		const changeToHour = (time: string) => {
			if (!value || !value.to) return;
			return onChange({
				from: value.from,
				to: changeTime(value.to, time),
			});
		};

		return (
			<div className={cn('grid gap-2', className)}>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id='date'
							variant={'outline'}
							className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
						>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{value?.from ? (
								value.to ? (
									<>
										{format(value.from, formatType)} - {format(value.to, formatType)}
									</>
								) : (
									format(value.from, formatType)
								)
							) : (
								<span>{placeholder}</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0' align='start'>
						<div className='flex gap-1'>
							<Calendar
								initialFocus
								mode='range'
								defaultMonth={value?.from}
								selected={value}
								onSelect={onChange}
								numberOfMonths={2}
							/>
							{enableHour && (
								<>
									<div className='w-24 space-y-4 p-3'>
										<div className='flex justify-center pt-1 items-center'>
											<p className='text-sm font-medium'>{fromHeaderText || 'From'}</p>
										</div>
										<ToggleSelection
											value={value.from}
											onChange={changeFromHour}
											className='h-[240px]'
											options={gnerateTimeOptions(enableHalfHour)}
										/>
									</div>
									<div className='w-24 space-y-4 p-3'>
										<div className='flex justify-center pt-1 items-center'>
											<p className='text-sm font-medium'>{toHeaderText || 'To'}</p>
										</div>
										<ToggleSelection
											value={value.to}
											onChange={changeToHour}
											className='h-[240px]'
											options={gnerateTimeOptions(enableHalfHour)}
										/>
									</div>
								</>
							)}
						</div>
					</PopoverContent>
				</Popover>
			</div>
		);
	}
);

DateRangePicker.displayName = 'DateRangePicker';
function changeTime(date: Date, time: string): Date {
	const hour = parseInt(time.split(':')[0]);
	const minute = parseInt(time.split(':')[1]);
	const result = setMinutes(setHours(date, hour), minute);
	return result;
}
