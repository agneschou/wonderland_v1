'use client';
import { Button } from '@/components/ui/Button';
import { ModalGround } from '@/components/ui/ModalGround';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<html>
			<body>
				<ModalGround className="bg-[url('https://images.unsplash.com/photo-1463680942456-e4230dbeaec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-bottom">
					<div className='flex h-[70vh] w-11/12 flex-col items-center justify-center gap-20 border-0 bg-white bg-opacity-60 p-12'>
						<p className="bg-[url('https://images.unsplash.com/photo-1463680942456-e4230dbeaec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-clip-text bg-bottom p-4 text-center text-6xl font-extrabold tracking-tight text-transparent lg:text-8xl">
							Oops!
							<br />
							Something went wrong!
							<br />
							{error.name}: {error.message}
						</p>
						<Button
							className="w-[300px] bg-[url('https://images.unsplash.com/photo-1463680942456-e4230dbeaec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
							onClick={() => reset()}
						>
							Try reset
						</Button>
					</div>
				</ModalGround>
			</body>
		</html>
	);
}
