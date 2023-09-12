import { replacePlaceholder } from '@/i18n/replacePlaceholder';
import { cn } from '@/lib/utils';
import { TextEditor } from '../TextEditor';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { IFormWrapperBaseProps } from './FormWrapper';

export function FormRichTextEditor({
	control,
	name,
	label,
	description,
	className,
	setErrMsg,
	inputLimit,
	inputErrMsg,
}: IFormWrapperBaseProps & {
	setErrMsg: (isError: boolean, name: any, message: string) => boolean;
	inputLimit: {
		textLength: number;
	};
	inputErrMsg: {
		textLength: string;
	};
}) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn('p-2', className)}>
					<FormLabel>{label}</FormLabel>
					<FormDescription>{description}</FormDescription>
					<FormControl>
						<TextEditor
							value={field.value}
							onChange={(value: string) => field.onChange(value)}
							validateTextLength={(length) =>
								setErrMsg(
									length > inputLimit.textLength,
									field.name,
									replacePlaceholder(inputErrMsg.textLength, inputLimit.textLength)
								)
							}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
