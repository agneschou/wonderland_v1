import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { ReactNode } from 'react';
import { FormWrapper, IFormWrapperBaseProps } from '@/components/formField/FormWrapper';
import { IOption } from '@/model/IOption';

interface IFormTabProps extends IFormWrapperBaseProps {
	options: IOption[];
	children: ReactNode;
}

export function FormTab({ options, children, ...props }: IFormTabProps) {
	return (
		<FormWrapper
			{...props}
			render={({ field }) => (
				<Tabs defaultValue={field.value} value={field.value} onValueChange={(value) => field.onChange(value)}>
					<TabsList className='grid w-full grid-cols-2'>
						{options?.map((option) => (
							<TabsTrigger key={option.value} value={option.value}>
								{option.label}
							</TabsTrigger>
						))}
					</TabsList>
					{children}
				</Tabs>
			)}
		/>
	);
}
