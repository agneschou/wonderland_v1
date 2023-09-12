'use client';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { routes } from '@/lib/routes';
import { logout } from '@/lib/serverAction';
import { useRouter } from 'next/navigation';
import { ReactNode, useTransition } from 'react';

export function DropdownLogout({ children, lang }: { children: ReactNode; lang: string }) {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();
	const handleLogout = () => {
		startTransition(() => {
			logout();
			router.push(`${routes.home}`);
		});
	};
	return <DropdownMenuItem onClick={handleLogout}>{children}</DropdownMenuItem>;
}
