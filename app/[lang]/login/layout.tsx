import { ModalGround } from '@/components/ui/ModalGround';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <ModalGround>{children}</ModalGround>;
}
