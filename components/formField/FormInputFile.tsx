import { cn } from '@/lib/utils';
import { Input, InputProps } from '../ui/Input';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';

export interface IFormInputFileProps extends IFormWrapperBaseProps, Omit<InputProps, 'name'> {}

export function FormInputFile({ ...props }: IFormInputFileProps) {
	return (
		<FormWrapper
			{...props}
			render={({ field: { onChange, value, ...field } }) => (
				<Input
					{...props}
					{...field}
					type='file'
					className={cn(props.className)}
					onChange={(e) => {
						onChange(e.target.files ? e.target.files[0] : undefined);
					}}
				/>
			)}
		/>
	);
}
