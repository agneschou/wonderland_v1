import * as React from 'react';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';

const LinkTabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
				className
			)}
			{...props}
		/>
	)
);
LinkTabsList.displayName = 'LinkTabsList';

const TabsLink: React.ForwardRefExoticComponent<
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
		LinkProps & {
			children?: React.ReactNode;
			isActive: boolean;
		} & React.RefAttributes<HTMLAnchorElement>
> = React.forwardRef(({ className, href, isActive, ...props }, ref) => (
	<Link
		ref={ref}
		href={href}
		className={cn(
			'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
			isActive && 'bg-background text-foreground shadow-sm',
			className
		)}
		{...props}
	/>
));
TabsLink.displayName = 'TabsLink';

const LinkTabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				className
			)}
			{...props}
		/>
	)
);
LinkTabsContent.displayName = 'TabsContent';

export { LinkTabsList, TabsLink, LinkTabsContent };
