'use client';
import {
	IGameEventInput,
	IGameEventOuput,
	basicSettingSchema,
	gameEventSchema,
	rewardSettingSchema,
} from '@/model/promotion';
import { Form } from '@/components/ui/Form';
import { useStepper } from '@/hook/useStepper';
import { createGameEvent } from '@/lib/serverAction';
import { IOption } from '@/model/IOption';
import { IDictI18n } from '@/model/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FormDateRange } from '../formField/FormDateRange';
import { FormInput } from '../formField/FormInput';
import { FormMultiComboBox } from '../formField/FormMultiComboBox';
import { FormRichTextEditor } from '../formField/FormRichTextEditor';
import { FormSelect } from '../formField/FormSelect';
import { FormUploadImage } from '../formField/FormUploadImage';
import { Button } from '../ui/Button';
import { ScrollArea } from '../ui/ScrollArea';
import { Step, Steps } from '../ui/Steps';
import { useTranslations } from 'next-intl';

export enum ICreatePromotionFormStep {
	BasicSetting = 'Basic Setting',
	RewardSetting = 'Reward Setting',
	Finish = 'Finish',
}
const stepperConfig = {
	initialStep: 0,
	steps: Object.values(ICreatePromotionFormStep)
		.slice(0, 3)
		.map((label, index) => ({ label, index })),
};
export interface IGameEventFormProps {
	dict: IDictI18n;
	countryList: IOption[];
	gameCodeList: IOption[];
}

export default function GameEventForm({ dict, countryList, gameCodeList }: IGameEventFormProps) {
	const { nextStep, prevStep, activeStep, resetSteps } = useStepper(stepperConfig);
	const [isPending, startTransition] = useTransition();
	const t = useTranslations();
	const form = useForm<IGameEventInput>({
		defaultValues: {
			countries: [],
			eventName: '',
			eventTime: {
				from: undefined,
				to: undefined,
			},
			gameCode: '',
			streamerName: '',
			eventContext: '',
			bonusAreaContext: '',
			bonusBreakdownContext: '',
			eventVisualImg: undefined,
			agentLogoImg: undefined,
			streamerImg: undefined,
		},
		resolver: zodResolver(gameEventSchema),
	});

	const onSubmit = form.handleSubmit((values: unknown) => {
		startTransition(async () => {
			const formData = Object.entries(values as IGameEventOuput).reduce((prev, [key, value]) => {
				if (value instanceof Array) {
					value.forEach((item) => prev.append(`${key}[]`, item));
				} else {
					prev.append(key, value);
				}
				return prev;
			}, new FormData());

			const data = await createGameEvent(formData);
			if (data.returnCode !== 0) {
				form.setError('root', { type: 'manual', message: data.returnMsg });
				return;
			}
			form.reset();
			resetSteps();
		});
	});

	const handleBasicSetting = () => {
		form.clearErrors();
		const values = form.getValues();
		const validation = basicSettingSchema.safeParse(values);
		if (!validation.success) {
			validation.error.issues.forEach(({ path, message }) => {
				console.log(path, message);
				form.setError(path[0] as any, { type: 'manual', message });
			});
			return;
		}

		nextStep();
	};
	const handleRewardSetting = () => {
		form.clearErrors();

		const values = form.getValues();
		const validation = rewardSettingSchema.safeParse(values);
		if (!validation.success) {
			validation.error.issues.forEach(({ path, message }) => {
				form.setError(path[0] as any, { type: 'manual', message });
			});
			return;
		}
		nextStep();
	};
	const setImgErrMsg = (isError: boolean, name: any, message: string) => {
		if (!isError) return true;
		form.setError(name, { type: 'manual', message });
		return false;
	};
	const setTextErrMsg = (isError: boolean, name: any, message: string) => {
		if (!isError) return true;
		form.setError(name, { type: 'manual', message });
		return false;
	};
	return (
		<div className='space-y-6 mx-auto max-w-2xl overflow-hidden h-full p-4'>
			<Form {...form}>
				<form onSubmit={onSubmit} className='space-y-4 h-full flex flex-col'>
					<Steps activeStep={activeStep} className='flex-0'>
						<Step index={0} label={ICreatePromotionFormStep.BasicSetting}>
							<ScrollArea className='h-full p-2'>
								<FormMultiComboBox
									name='countries'
									control={form.control}
									options={countryList}
									label={t('createGameEvent.countries.label')}
									description={t('createGameEvent.countries.description')}
									placeholder={t('createGameEvent.countries.placeholder')}
								/>
								<FormInput
									name='eventName'
									control={form.control}
									label={t('createGameEvent.eventName.label')}
									description={t('createGameEvent.eventName.description')}
									placeholder={t('createGameEvent.eventName.placeholder')}
								/>
								<FormDateRange
									name='eventTime'
									control={form.control}
									enableHour
									emableHalfHour
									formatType='MM/dd HH:mm'
									label={t('createGameEvent.eventTime.label')}
									description={t('createGameEvent.eventTime.description')}
									placeholder={t('createGameEvent.eventTime.placeholder')}
								/>
								<FormSelect
									name='gameCode'
									control={form.control}
									options={gameCodeList}
									label={t('createGameEvent.gameCode.label')}
									description={t('createGameEvent.gameCode.description')}
									placeholder={t('createGameEvent.gameCode.placeholder')}
								/>
								<FormInput
									name='streamerName'
									control={form.control}
									label={t('createGameEvent.streamerName.label')}
									description={t('createGameEvent.streamerName.description')}
									placeholder={t('createGameEvent.streamerName.placeholder')}
								/>
								<FormUploadImage
									name='eventVisualImg'
									control={form.control}
									label={t('createGameEvent.eventVisualImg.label')}
									description={t('createGameEvent.eventVisualImg.description')}
									inputErrMsg={dict.inputErrorMessage}
									inputLimit={{ fileSizeLessThanKB: 150, imageWidthEqualPx: 800, imageHeightEqualPx: 400 }}
									setErrMsg={setImgErrMsg}
									inputClassName='h-[200px] w-[400px]'
									accept='image/png, image/jpeg, image/jpg, image/svg'
								/>
								<FormUploadImage
									name='agentLogoImg'
									control={form.control}
									label={t('createGameEvent.agentLogoImg.label')}
									description={t('createGameEvent.agentLogoImg.description')}
									inputErrMsg={dict.inputErrorMessage}
									inputLimit={{ fileSizeLessThanKB: 30, imageWidthEqualPx: 80, imageHeightEqualPx: 80 }}
									setErrMsg={setImgErrMsg}
									inputClassName='h-[160px] w-[160px]'
									accept='image/png, image/jpeg, image/jpg, image/svg'
								/>
								<FormUploadImage
									name='streamerImg'
									control={form.control}
									label={t('createGameEvent.streamerImg.label')}
									description={t('createGameEvent.streamerImg.description')}
									inputErrMsg={dict.inputErrorMessage}
									inputLimit={{ fileSizeLessThanKB: 80, imageWidthEqualPx: 288, imageHeightEqualPx: 308 }}
									setErrMsg={setImgErrMsg}
									inputClassName='h-[144px] w-[154px]'
									accept='image/png, image/jpeg, image/jpg, image/svg'
								/>
								<FormRichTextEditor
									inputLimit={{ textLength: 500 }}
									inputErrMsg={dict.inputErrorMessage}
									setErrMsg={setTextErrMsg}
									name='eventContext'
									control={form.control}
									label={t('createGameEvent.eventContext.label')}
									description={t('createGameEvent.eventContext.description')}
								/>
							</ScrollArea>

							<div className='flex items-center justify-end gap-2'>
								<Button type='button' onClick={handleBasicSetting}>
									{dict.ui.next}
								</Button>
							</div>
						</Step>
						<Step index={1} label={ICreatePromotionFormStep.RewardSetting}>
							<ScrollArea className='h-full p-2'>
								<FormRichTextEditor
									className='min-h-[250px]'
									inputLimit={{ textLength: 500 }}
									inputErrMsg={dict.inputErrorMessage}
									setErrMsg={setTextErrMsg}
									name='bonusAreaContext'
									control={form.control}
									label={t('createGameEvent.bonusAreaContext.label')}
									description={t('createGameEvent.bonusAreaContext.description')}
								/>
								<FormRichTextEditor
									inputLimit={{ textLength: 500 }}
									inputErrMsg={dict.inputErrorMessage}
									setErrMsg={setTextErrMsg}
									name='bonusBreakdownContext'
									control={form.control}
									label={t('createGameEvent.bonusBreakdownContext.label')}
									description={t('createGameEvent.bonusBreakdownContext.description')}
								/>
							</ScrollArea>
							<div className='flex items-center justify-end gap-2'>
								<Button type='button' onClick={prevStep}>
									{t('ui.back')}
								</Button>
								<Button type='button' onClick={handleRewardSetting}>
									{t('ui.next')}
								</Button>
							</div>
						</Step>
						<Step index={2} label={ICreatePromotionFormStep.Finish}>
							<p className='text-xl flex justify-around content-end p-6'>
								{form.formState.errors.root?.message || t('createGameEvent.finishedMessage')}
							</p>

							<div className='flex items-center justify-end gap-2'>
								<Button type='button' onClick={prevStep}>
									{dict.ui.back}
								</Button>
								<Button type='submit'>{t('ui.finish')}</Button>
							</div>
						</Step>
					</Steps>
				</form>
			</Form>
		</div>
	);
}
