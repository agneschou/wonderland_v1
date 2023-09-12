import { Input, InputProps } from '../ui/Input';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';

export interface IFormPercentageInputProps extends IFormWrapperBaseProps, Omit<InputProps, 'name'> {}

export function FormPercentageInput(props: IFormPercentageInputProps) {
	return (
		<FormWrapper
			{...props}
			render={({ field }) => (
				<div className='flex items-center gap-1'>
					<Input
						type='number'
						min={0}
						max={100}
						{...props}
						{...field}
						value={(field.value * 100).toFixed()}
						onChange={(e) => field.onChange(parseFloat(e.target.value) / 100)}
					/>
					<span className='text-sm font-semibold text-muted-foreground'>%</span>
				</div>
			)}
		/>
	);
}
