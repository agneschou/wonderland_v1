'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

interface IImageUploadInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
	onChange: { (...event: any[]): void; (arg0: any): any };
	validateSize?: (size: number) => boolean;
	validateWidth?: (width: number) => boolean;
	validateHeight?: (height: number) => boolean;
}
const loadImage = (url: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = document.createElement('img');
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = url;
	});
};

export const ImageUploadInput = forwardRef<HTMLInputElement, IImageUploadInputProps>(
	(
		{
			className,
			onChange,
			validateSize = () => true,
			validateWidth = () => true,
			validateHeight = () => true,
			...props
		},
		ref
	) => {
		const [imageUrl, setImageUrl] = useState('');

		const handleChange = async (files: FileList | null) => {
			if (imageUrl) URL.revokeObjectURL(imageUrl);
			if (!files || files.length === 0) return;
			if (!validateSize(files[0].size)) return;
			const url = URL.createObjectURL(files[0]);
			if (validateWidth || validateHeight) {
				try {
					const img = await loadImage(url);
					if ((validateWidth && !validateWidth(img.width)) || (validateHeight && !validateHeight(img.height))) {
						URL.revokeObjectURL(url);
						return;
					}
				} catch (error) {
					console.error(error);
					URL.revokeObjectURL(url);
					return;
				}
			}

			onChange(files[0]);
			setImageUrl(url);
		};

		return (
			<Button
				variant='outline'
				className={cn('overflow-hidden h-full w-full relative z-10 block', className)}
				disabled={props.disabled}
			>
				<Input
					{...props}
					ref={ref}
					type='file'
					onChange={(event) => handleChange(event.target.files)}
					className='cursor-pointer w-full h-full opacity-0 border-none'
				/>
				{imageUrl && <Image src={imageUrl} alt='preview' fill className='-z-10 object-cover' />}
				<UploadCloud className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 object-cover max-w-sm max-h-sm w-3/4 h-3/4 text-muted-foreground' />
			</Button>
		);
	}
);

ImageUploadInput.displayName = 'ImageUploadInput';
