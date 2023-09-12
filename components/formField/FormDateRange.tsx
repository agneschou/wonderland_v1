import { Control } from 'react-hook-form';
import { DateRangePicker } from '../ui/DateRangePicker';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { IFormWrapperBaseProps } from './FormWrapper';

interface IFormDateRangeProps extends IFormWrapperBaseProps {
	control: Control<any>;
	name: string;
	label: string;
	placeholder?: string;
	description?: string;
	className?: string;
	formatType?: string;
	enableHour?: boolean;
	emableHalfHour?: boolean;
}

export function FormDateRange({
	placeholder,
	formatType = 'LLL dd',
	control,
	name,
	className,
	label,
	description,
	enableHour = false,
	emableHalfHour = false,
}: IFormDateRangeProps) {
	return (
		<FormItem className={className + ' p-2'}>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<FormField
					control={control}
					name={name}
					render={({ field }) => (
						<DateRangePicker
							{...field}
							placeholder={placeholder}
							formatType={formatType}
							enableHour={enableHour}
							enableHalfHour={emableHalfHour}
						/>
					)}
				/>
			</FormControl>
			<FormDescription>{description}</FormDescription>
			<FormField name={name} render={() => <FormMessage />} />
			<FormField name={name + '.from'} render={() => <FormMessage />} />
			<FormField name={name + '.to'} render={() => <FormMessage />} />
		</FormItem>
	);
}
