import { ReactNode } from 'react';

export default function Layout({ params: { lang }, children }: { params: { lang: string }; children: ReactNode }) {
	return children;
}
