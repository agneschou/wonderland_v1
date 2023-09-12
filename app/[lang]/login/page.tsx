import { LoginForm } from '@/components/form/LoginForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { getI18n } from '@/i18n';
import Image from 'next/image';

export default async function Page({ params }: { params: { lang: string } }) {
	const langDict = await getI18n(params.lang);

	return (
		<div className='bg-background w-full grid grid-cols-1 lg:grid-cols-[3fr_4fr] h-screen lg:p-4 transition-all'>
			<Card className='bg-primary rounded-none lg:rounded-2xl flex flex-col justify-between'>
				<CardHeader>
					<Image width={200} height={25} src='/logo.svg' alt='wonderland' />
					<section className='text-primary-foreground'></section>
				</CardHeader>
				<CardContent className='flex-1 flex justify-center items-center'>
					<LoginForm dict={langDict} className='lg:hidden' />
				</CardContent>
				<CardFooter className='text-primary-foreground'>
					<div className='w-full text-right'>
						<CardTitle>{langDict.metadata.title}</CardTitle>
						<CardDescription className='text-primary-foreground/60'>{langDict.metadata.description}</CardDescription>
					</div>
				</CardFooter>
			</Card>
			<div className='hidden lg:flex flex-col justify-center items-center'>
				<LoginForm dict={langDict} className='border-none shadow-none' />
			</div>
		</div>
	);
}
