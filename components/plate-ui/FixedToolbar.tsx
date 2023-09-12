import React from 'react';

import { cn } from '@/lib/utils';

import { Toolbar, ToolbarProps } from '../ui/Toolbar';

const FixedToolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(({ className, ...props }: ToolbarProps, ref) => {
	return (
		<Toolbar
			ref={ref}
			className={cn(
				'supports-backdrop-blur:bg-background/60 sticky z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-input bg-background/95 backdrop-blur',
				className
			)}
			{...props}
		/>
	);
});
FixedToolbar.displayName = 'FixedToolbar';

export { FixedToolbar };
