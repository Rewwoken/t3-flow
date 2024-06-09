import { addDays, addWeeks, format, nextSunday, subDays } from 'date-fns';
import type { IColumnData } from '@/types/tasks.types';

const now = new Date();
const f = (date: Date | string) => format(date, 'eeee, LLL d');

export const columns: IColumnData[] = [
	{
		title: 'Overdue ⏰',
		id: 'overdue',
		dateSpan: `. . . --> ${f(subDays(now, 1))}`,
	},
	{
		title: 'No date 🤔',
		id: 'noDate',
		dateSpan: '. . .',
	},
	{
		title: 'Today 😼',
		id: 'today',
		dateSpan: f(now),
	},
	{
		title: 'Tomorrow 🕑',
		id: 'tomorrow',
		dateSpan: f(addDays(now, 1)),
	},
	{
		title: 'These two weeks ⏳',
		id: 'theseTwoWeeks',
		dateSpan: `${f(addDays(now, 2))} --> ${f(addWeeks(nextSunday(now), 1))}`,
	},
	{
		title: 'Later 😇',
		id: 'later',
		dateSpan: `${f(addDays(addWeeks(nextSunday(now), 1), 1))} --> . . .`,
	},
	{
		title: 'Completed 🎉',
		id: 'completed',
		dateSpan: 'Any date!',
	},
];
