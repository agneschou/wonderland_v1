import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { IOption } from '@/model/IOption';

export interface ISelectorProps extends ISelectorBaseProps {
	options: IOption[];
}

export interface ISelectorBaseProps {
	value?: any;
	defaultValue?: any;
	onChange?: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}
export const Selector = forwardRef<HTMLSelectElement, ISelectorProps>(function Selector(
	{ value, onChange, placeholder = '', options, className = '', disabled = false, defaultValue = value },
	ref
) {
	return (
		<Select
			{...{
				onValueChange: onChange,
				value,
			}}
			disabled={disabled}
			defaultValue={defaultValue}
		>
			<SelectTrigger className={cn('', className)}>
				<SelectValue />
			</SelectTrigger>
			{options && options.length > 0 && (
				<SelectContent>
					<ScrollArea
						className={cn('h-full', {
							'h-[320px]': options.length > 10,
						})}
					>
						<SelectItem disabled hidden value='' className='hidden'>
							{placeholder}
						</SelectItem>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</ScrollArea>
				</SelectContent>
			)}
		</Select>
	);
});
