import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Control, ControllerRenderProps } from 'react-hook-form';

export interface IFormWrapperProps extends IFormWrapperBaseProps {
	render: (params: { field: ControllerRenderProps }) => ReactNode;
}

export interface IFormWrapperBaseProps {
	control: Control<any>;
	name: string;
	label?: string;
	description?: string;
	className?: string;
}

export function FormWrapper({ control, name, label, description, className, render }: IFormWrapperProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('p-2 ', className)}>
					<FormLabel>{label}</FormLabel>
					<FormControl>{render({ field })}</FormControl>
					<FormDescription className='whitespace-pre-line'>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
