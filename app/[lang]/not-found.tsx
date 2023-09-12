import { Button } from '@/components/ui/Button';
import { ModalGround } from '@/components/ui/ModalGround';
import Link from 'next/link';

export default function NotFound({}) {
	return (
		<ModalGround className="bg-[url('https://images.unsplash.com/photo-1510133768164-a8f7e4d4e3dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-bottom">
			<div className='flex h-[70vh] w-11/12 flex-col items-center justify-center gap-20 border-0 bg-white bg-opacity-60 p-12'>
				<p className="bg-[url('https://images.unsplash.com/photo-1510133768164-a8f7e4d4e3dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fpDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')] bg-clip-text bg-bottom p-4 text-center text-6xl font-extrabold tracking-tight text-transparent lg:text-8xl">
					Oops!
					<br />
					Page not found!
				</p>
				<Button className='w-[300px]' asChild>
					<Link href={`/`}>Back</Link>
				</Button>
			</div>
		</ModalGround>
	);
}
