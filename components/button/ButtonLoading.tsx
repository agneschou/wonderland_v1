import { Loader2 } from 'lucide-react';
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/Button';

interface Props extends ButtonProps {
	loading: boolean;
}

export const ButtonLoading = React.forwardRef<React.ElementRef<'button'>, Props>(
	({ children, loading, ...props }, ref) => {
		return (
			<Button {...props}>
				{loading ? (
					<>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Please wait
					</>
				) : (
					children
				)}
			</Button>
		);
	}
);

ButtonLoading.displayName = 'ButtonLoading';
