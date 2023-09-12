import { isValid, parseISO } from 'date-fns';

export function parseIsoDefault(defaultDate: Date, timeString = ''): Date {
	const date = parseISO(timeString);
	return isValid(date) ? date : defaultDate;
}
