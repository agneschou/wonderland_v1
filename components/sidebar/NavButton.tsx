'use client';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavButton({ path, icon, label }: { label: string; path: string; icon: JSX.Element }) {
	const pathname = usePathname();

	return (
		<Button variant={pathname.indexOf(path) > -1 ? 'secondary' : 'ghost'} asChild className='w-full justify-start'>
			<Link href={path} className='flex items-center gap-1'>
				{icon}
				<span>{label}</span>
			</Link>
		</Button>
	);
}
