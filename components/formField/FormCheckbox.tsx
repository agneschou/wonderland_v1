import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/Form';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/Checkbox';
import { IFormWrapperBaseProps } from './FormWrapper';

export function FormCheckbox({ control, name, label, description, className }: IFormWrapperBaseProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4', className)}>
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className='space-y-1 leading-none'>
						<FormLabel>{label}</FormLabel>
						<FormDescription>{description}</FormDescription>
					</div>
				</FormItem>
			)}
		/>
	);
}
