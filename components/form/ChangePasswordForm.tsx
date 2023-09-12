'use client';
import { ButtonLoading } from '@/components/button/ButtonLoading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { updatePassword } from '../../lib/serverAction';
import { ButtonModalClose } from '../button/ButtonModalClose';
import { ModalGround } from '../ui/ModalGround';

type Props = {
	className?: string;
	isModal?: boolean;
	unableClose?: boolean;
};

const changePasswordSchema = z.object({
	oldPassword: z.string().max(20),
	newPassword: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(20, 'Password must be at most 20 characters')
		.regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least 1 lowercase letter'),
});
export type IChangePasswordInput = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm({ className, isModal, unableClose }: Props) {
	const { lang } = useParams();
	const [isLoading, startTransition] = useTransition();
	const router = useRouter();
	const t = useTranslations('changePassword');

	const form = useForm<IChangePasswordInput>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
		},
	});

	const handleSubmit = form.handleSubmit(async (values) => {
		startTransition(async () => {
			await updatePassword(values);
		});

		if (isModal) {
			router.back();
			return;
		}
		router.replace(`${routes.home}`);
	});

	const close = () => {
		if (unableClose) return;
		router.back();
	};
	return (
		<ModalGround close={close}>
			<Card className={cn('max-w-xl w-full relative', className)}>
				<CardHeader>
					{!unableClose && <ButtonModalClose onClick={close} />}
					<CardTitle>{t('title')}</CardTitle>
					<CardDescription>{t('description')}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit} className={cn('space-y-8')}>
							<FormField
								control={form.control}
								name='oldPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('oldPassword.label')}</FormLabel>
										<FormControl>
											<Input type='password' placeholder={t('oldPassword.placeholder')} {...field} />
										</FormControl>
										<FormDescription>{t('oldPassword.description')}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='newPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('newPassword.label')}</FormLabel>
										<FormControl>
											<Input type='password' placeholder={t('newPassword.placeholder')} {...field} />
										</FormControl>
										<FormDescription>{t('newPassword.description')}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<ButtonLoading type='submit' loading={form.formState.isSubmitting} className='w-full'>
								{t('button')}
							</ButtonLoading>
						</form>
					</Form>
				</CardContent>
			</Card>
		</ModalGround>
	);
}
