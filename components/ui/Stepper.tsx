'use client';

import { Button } from '@/components/ui/Button';
import { Step, StepLabelProps, Steps } from '@/components/ui/Steps';
import { useStepper } from '@/hook/useStepper';
import React from 'react';

export interface StepperConfig extends StepLabelProps {
	icon?: React.ReactElement;
	context: React.ReactNode;
}

export function Stepper({ steps }: { steps: StepperConfig[]; finish?: () => void }) {
	const { nextStep, prevStep, activeStep, isDisabledStep } = useStepper({
		initialStep: 0,
		steps,
	});

	return (
		<div className='space-y-6'>
			<Steps activeStep={activeStep}>
				{steps.map((step, index) => (
					<Step index={index} key={index} {...step}>
						{step.context}
					</Step>
				))}
			</Steps>
			<div className='flex items-center justify-end gap-2'>
				{activeStep === steps.length - 1 ? (
					<>
						<Button onClick={prevStep}>Back</Button>
						<Button type='submit'>Finish</Button>
					</>
				) : (
					<>
						<Button disabled={isDisabledStep} onClick={prevStep}>
							Back
						</Button>
						<Button onClick={nextStep}>Next</Button>
					</>
				)}
			</div>
		</div>
	);
}
