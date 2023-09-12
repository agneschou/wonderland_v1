import React, { ReactNode } from 'react';
import { ModalGround } from '@/components/ui/ModalGround';

export default async function Layout({ children }: { children: ReactNode }) {
	return <ModalGround>{children}</ModalGround>;
}
