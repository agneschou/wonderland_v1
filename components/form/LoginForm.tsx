'use client';
import { ButtonLoading } from '@/components/button/ButtonLoading';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import { routes } from '@/lib/routes';
import { login } from '@/lib/serverAction';
import { cn } from '@/lib/utils';
import { IDictI18n } from '@/model/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LanguageSelector } from '../LanguageSelector';
import { useTranslations } from 'next-intl';

type Props = {
	dict: IDictI18n;
	className?: string;
	isModal?: boolean;
};

const loginSchema = z.object({
	agentId: z.string(),
	password: z.string(),
});
export type ILoginInput = z.infer<typeof loginSchema>;

export function LoginForm({ dict, className, isModal }: Props) {
	const { lang } = useParams();
	const router = useRouter();
	const t = useTranslations();

	const [isLoading, startTransition] = useTransition();
	const form = useForm<ILoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			agentId: '',
			password: '',
		},
	});
	const onSubmit = form.handleSubmit(async function (values: ILoginInput) {
		startTransition(async () => {
			const res = await login(values, dict);
			if (res.errorMsg) {
				form.setError('root', {
					message: res.errorMsg,
				});
				return;
			}

			if (res.isFirstLogin) {
				router.push(`${routes.changePassword}`);
				return;
			}
			if (isModal) {
				router.back();
				return;
			}
			router.replace(`${routes.home}`);
		});
	});

	return (
		<Card className={cn('max-w-xl w-full', className)}>
			<CardHeader>
				<CardTitle>{t('login.title')}</CardTitle>
				<CardDescription>{t('login.description')}</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={onSubmit} className={cn('space-y-8')}>
						<FormField
							control={form.control}
							name='agentId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('login.agentId.label')}</FormLabel>
									<FormControl>
										<Input placeholder={t('login.agentId.placeholder')} {...field} />
									</FormControl>
									<FormDescription>{t('login.agentId.description')}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('login.password.label')}</FormLabel>
									<FormControl>
										<Input type='password' placeholder={t('login.password.placeholder')} {...field} />
									</FormControl>
									<FormDescription>{t('login.password.description')}</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField name='root' render={() => <FormMessage />} />
						<ButtonLoading type='submit' loading={form.formState.isSubmitting} className='w-full'>
							{t('login.button')}
						</ButtonLoading>
					</form>
				</Form>
			</CardContent>
			<div className='relative h-6 mx-4 my-6'>
				<Separator />
				<span className='text-center whitespace-nowrap px-1 bg-background text-muted-foreground absolute -translate-y-1/2 left-1/2 -translate-x-1/2'>
					{t('language.hint')}
				</span>
			</div>
			<CardFooter className='flex flex-col gap-12'>
				<LanguageSelector placeholder={t('language.input.placeholder')} />
			</CardFooter>
		</Card>
	);
}
