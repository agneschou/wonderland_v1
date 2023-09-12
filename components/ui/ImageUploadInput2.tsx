'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

interface IImageUploadInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
	onChange: { (...event: any[]): void; (arg0: any): any };
	validateSize?: (size: number) => boolean;
	validateWidth?: (width: number) => boolean;
	validateHeight?: (height: number) => boolean;
	previewImage?: string | null;
}

export const ImageUploadInput2 = forwardRef<HTMLInputElement, IImageUploadInputProps>(
	(
		{
			className,
			onChange,
			validateSize = () => true,
			validateWidth = () => true,
			validateHeight = () => true,
			previewImage,
			...props
		},
		ref
	) => {
		// const [imageUrl, setImageUrl] = useState(previewImage || null);
		const handleChange = (files: FileList | null) => {
			console.log("handleChange called");

			if (previewImage) URL.revokeObjectURL(previewImage);
			if (!files || files.length === 0) return;
			if (!validateSize(files[0].size)) return;
			const url = URL.createObjectURL(files[0]);
			const img = document.createElement('img');
			img.src = url;
			img.onload = () => {
				if (validateWidth || validateHeight) {
					if (!validateWidth(img.width) || !validateHeight(img.height)) {
						URL.revokeObjectURL(url);
						img.remove();
					}
				};
			}

			onChange(url); 
			// setImageUrl(url);
		};

		return (
			<Button
				variant='outline'
				className='overflow-hidden h-80 w-80 block relative z-10 border-0 outline outline-muted hover:outline-primary'
			>
				<input
					{...props}
					ref={ref}
					type='file'
					onChange={(event) => handleChange(event.target.files)}
					className='visible w-full h-full opacity-0 border-none'
				/>
				{previewImage  && <Image src={previewImage} alt='preview' fill className='-z-10 object-cover' />}
				<UploadCloud className='absolute top-0 right-0 -z-20 object-cover w-full h-full p-24 text-muted-foreground' />
			</Button>
		);
	}
);

ImageUploadInput2.displayName = 'ImageUploadInput2';
