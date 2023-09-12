import { cn } from '@/lib/utils';
import { Input, InputProps } from '../ui/Input';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';

export interface IFormInputProps extends IFormWrapperBaseProps, Omit<InputProps, 'name'> {
	suffix?: string;
	prefix?: string;
}

export function FormInput({ prefix, suffix, type, ...props }: IFormInputProps) {
	return (
		<FormWrapper
			{...props}
			render={({ field }) => (
				<div className='flex items-center gap-1'>
					{prefix && <span className='text-sm font-semibold text-muted-foreground'>{prefix}</span>}
					<Input
						{...props}
						{...field}
						className={cn(props.className)}
						type={type}
						onChange={(e) => {
							field.onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value);
						}}
					/>
					{suffix && <span className='text-sm font-semibold text-muted-foreground'>{suffix}</span>}
				</div>
			)}
		/>
	);
}
