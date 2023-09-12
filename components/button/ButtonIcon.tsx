import { Button, ButtonProps } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends ButtonProps {
	label: string;
}

export const ButtonWithIcon = React.forwardRef<React.ElementRef<'button'>, Props>(
	({ label, children, className, ...props }, ref) => {
		return (
			<Button {...props} className={cn(className, 'flex gap-2')}>
				{children}
				<span className='hidden md:block'>{label}</span>
			</Button>
		);
	}
);

ButtonWithIcon.displayName = 'ButtonWithIcon';
