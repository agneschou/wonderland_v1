import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { HTMLAttributes } from 'react';

export function ButtonModalClose({ onClick, ...props }: HTMLAttributes<HTMLButtonElement>) {
	return (
		<Button
			{...props}
			size='icon'
			variant='ghost'
			onClick={onClick}
			className='absolute top-2 right-2 text-foreground/50'
		>
			<X className='h-4 w-4' />
		</Button>
	);
}
