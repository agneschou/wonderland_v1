'use client';
import { KEY_MAP, createDistributionExample } from '@/config';
import { apiRoutes } from '@/lib/routes';
import { createDistribution } from '@/lib/serverAction';
import { cn } from '@/lib/utils';
import { IOption } from '@/model/IOption';
import { ICreateDistributionInput, createDistributionSchema } from '@/model/promotion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { HTMLAttributes, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ButtonLoading } from '../button/ButtonLoading';
import { FormInput } from '../formField/FormInput';
import { FormInputFile } from '../formField/FormInputFile';
import { FormSelect } from '../formField/FormSelect';
import { Button } from '../ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/Dialog';
import { Form, FormField, FormMessage } from '../ui/Form';

interface CreateDistributionFormProps extends HTMLAttributes<HTMLDivElement> {
	eventList: IOption[];
}

export const CreateDistributionPopup = ({ eventList, className }: CreateDistributionFormProps) => {
	const t = useTranslations();
	const [isLoading, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	const form = useForm<ICreateDistributionInput>({
		resolver: zodResolver(createDistributionSchema),
		defaultValues: {
			triggerEventId: '',
			rewardName: '',
			details: undefined,
			root: '',
		},
	});

	const handleSubmit = form.handleSubmit(async (values: ICreateDistributionInput) => {
		startTransition(async () => {
			const formData = Object.entries(values).reduce((prev, [key, value]) => {
				prev.append(key, value);
				return prev;
			}, new FormData());

			const data = await createDistribution(formData);

			if (data.returnCode !== 0) {
				form.setError('root', {
					type: 'manual',
					message: data.returnMsg,
				});
			} else {
				form.reset();
				setOpen(false);
			}
		});
	});

	const onOpenChange = (value: boolean) => {
		form.reset();
		setOpen(value);
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild className={cn(className)}>
				<Button>{t('manualPointGiveaway.manualBatch.create')}</Button>
			</DialogTrigger>
			<DialogContent className={cn('sm:max-w-[600px]')}>
				<DialogHeader>
					<DialogTitle>{t('createDistribution.title')}</DialogTitle>
					<DialogDescription>{t('createDistribution.description')}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={handleSubmit} className={cn('space-y-8')}>
						<div className='flex gap-2'>
							<FormSelect
								name='triggerEventId'
								control={form.control}
								options={eventList}
								label={t('createDistribution.triggerEventId.label')}
								description={t('createDistribution.triggerEventId.description')}
								placeholder={t('createDistribution.triggerEventId.placeholder')}
							/>
							<FormInput
								name='rewardName'
								control={form.control}
								label={t('createDistribution.eventName.label')}
								description={t('createDistribution.eventName.description')}
								placeholder={t('createDistribution.eventName.placeholder')}
							/>
						</div>
						<div className='flex gap-2'>
							<FormInputFile
								name='details'
								control={form.control}
								accept='.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
								label={t('createDistribution.details.label')}
								description={t('createDistribution.details.description')}
								placeholder={t('createDistribution.details.placeholder')}
							/>
							<Button asChild className='mt-10'>
								<Link
									href={`${apiRoutes.downLoad}?${KEY_MAP.url}=${createDistributionExample}`}
									target='_blank'
									download='distributionExample.csv'
								>
									{t('createDistribution.downloadExample')}
								</Link>
							</Button>
						</div>
						<FormField name='root' render={({}) => <FormMessage />}></FormField>

						<DialogFooter>
							<Button type='button' onClick={() => onOpenChange(false)}>
								{t('createDistribution.cancel')}
							</Button>
							<ButtonLoading type='submit' loading={isLoading}>
								{t('createDistribution.submit')}
							</ButtonLoading>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
