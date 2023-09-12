import { Card } from '@/components/ui/Card';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <Card>{children}</Card>;
}
