import { replacePlaceholder } from '@/i18n/replacePlaceholder';
import { cn } from '@/lib/utils';
import { ImageUploadInput } from '../ui/ImageUploadInput';
import { FormWrapper, IFormWrapperBaseProps } from './FormWrapper';

interface IFormUploadImageProps extends IFormWrapperBaseProps {
	inputErrMsg: {
		fileSizeLessThanKB: string;
		imageHeightEqualPx: string;
		imageWidthEqualPx: string;
	};
	inputLimit: {
		fileSizeLessThanKB: number;
		imageHeightEqualPx: number;
		imageWidthEqualPx: number;
	};
	setErrMsg: (isError: boolean, name: any, message: string) => boolean;
	disabled?: boolean;
	inputClassName?: string;
	accept?: string;
}

export function FormUploadImage({
	control,
	name,
	label,
	description,
	className,
	inputClassName,
	setErrMsg,
	inputErrMsg,
	inputLimit,
	disabled,
	accept,
}: IFormUploadImageProps) {
	return (
		<FormWrapper
			name={name}
			control={control}
			className={className}
			label={label}
			description={description}
			render={({ field: { value, ...field } }) => (
				<ImageUploadInput
					{...field}
					className={cn(inputClassName)}
					accept={accept}
					validateSize={(size) =>
						setErrMsg(
							size > 1024 * inputLimit.fileSizeLessThanKB,
							field.name,
							replacePlaceholder(inputErrMsg.fileSizeLessThanKB, inputLimit.fileSizeLessThanKB)
						)
					}
					validateHeight={(height) =>
						setErrMsg(
							height > inputLimit.imageHeightEqualPx,
							field.name,
							replacePlaceholder(inputErrMsg.imageHeightEqualPx, inputLimit.imageHeightEqualPx)
						)
					}
					validateWidth={(width) =>
						setErrMsg(
							width > inputLimit.imageWidthEqualPx,
							field.name,
							replacePlaceholder(inputErrMsg.imageWidthEqualPx, inputLimit.imageWidthEqualPx)
						)
					}
					disabled={disabled}
				/>
			)}
		/>
	);
}
