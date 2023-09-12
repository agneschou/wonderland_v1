'use client';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();
	return (
		<Dialog open={true} onOpenChange={() => router.back()}>
			<DialogContent className='max-w-3xl'>{children}</DialogContent>
		</Dialog>
	);
}
