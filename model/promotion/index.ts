import { ALL } from '@/config';
import { addDays, addHours, addMonths, isAfter } from 'date-fns';
import * as z from 'zod';
import { IOption } from '../IOption';

export const basicSettingSchema = z.object({
	countries: z.array(z.string()),
	eventName: z.string().min(3).max(50),
	eventTime: z
		.object({
			from: z.date().min(addDays(new Date(), 7)),
			to: z.date().max(addMonths(new Date(), 1)),
		})
		.refine((data) => data.from < data.to, 'createGameEvent.errorMessage.endTimeGreaterThanStartTime')
		.refine((data) => isAfter(addHours(data.from, 3), data.to), 'createGameEvent.errorMessage.eventTimeDuration3Hours'),
	gameCode: z.string().min(3).max(50),
	streamerName: z.string().min(3).max(500),
	eventContext: z.string().min(3).max(500),
	eventVisualImg: z.instanceof(Blob).optional(),
	agentLogoImg: z.instanceof(Blob).optional(),
	streamerImg: z.instanceof(Blob).optional(),
	// defaultAgentLogoUrl: z.string().url().optional(),
	// defaultStreamerImageUrl: z.string().url().optional(),
});

export const rewardSettingSchema = z.object({
	bonusAreaContext: z.string().min(3).max(500),
	bonusBreakdownContext: z.string().min(3).max(500),
});
export const gameEventSchema = basicSettingSchema.merge(rewardSettingSchema).transform(({ eventTime, ...rest }) => {
	return {
		...rest,
		startTime: eventTime.from.toISOString(),
		endTime: eventTime.to.toISOString(),
	};
});

export type IBasicSettingInput = z.infer<typeof basicSettingSchema>;
export type IRewardSettingInput = z.infer<typeof rewardSettingSchema>;
export type IGameEventInput = z.input<typeof gameEventSchema>;
export type IGameEventOuput = z.output<typeof gameEventSchema>;

export const searchGameEventSchema = z
	.object({
		gameCode: z.string().min(3).max(50),
		status: z.string().min(3).max(10),
		eventRange: z.object({
			from: z.date(),
			to: z.date(),
		}),
	})
	.transform(({ eventRange, ...input }) => {
		const startTime = eventRange.from.toISOString();
		const endTime = eventRange.to.toISOString();
		return { ...input, startTime, endTime };
	});

export const searchRewardSchema = z
	.object({
		status: z.string().min(3).max(11),
		eventRange: z.object({
			from: z.date(),
			to: z.date(),
		}),
	})
	.transform(({ eventRange, ...input }) => {
		const startTime = eventRange.from.toISOString();
		const endTime = eventRange.to.toISOString();
		return { ...input, startTime, endTime };
	});

export const statusList: IOption[] = [
	{ value: ALL, label: ALL },
	{ value: 'Approved', label: 'Approved' },
	{ value: 'Pending', label: 'Pending' },
	{ value: 'Reject', label: 'Reject' },
];

export type ISearchStreamerEventInput = z.input<typeof searchGameEventSchema>;
export type ISearchStreamerEventOutput = z.output<typeof searchGameEventSchema>;
export type ISearchRewardInput = z.input<typeof searchRewardSchema>;
export type ISearchRewardOutput = z.output<typeof searchRewardSchema>;

export const createDistributionSchema = z
	.object({
		triggerEventId: z.string(),
		rewardName: z.string().max(50),
		details: z.instanceof(Blob),
		root: z.string(),
	})
	.refine(({ rewardName, triggerEventId }) => triggerEventId || rewardName, {
		path: ['root'],
		message: 'createDistribution.errorMessage.eventRequired',
	});
export type ICreateDistributionInput = z.infer<typeof createDistributionSchema>;
