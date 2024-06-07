import { addDays, endOfWeek, format, subDays } from 'date-fns';
import { TTaskGroupId } from '@/types/tasks.types';

const now = new Date();
const f = (date: Date | string) => format(date, 'eeee, LLL d');

const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

export interface IColumnData {
	id: TTaskGroupId;
	title: string;
	dateSpan: string;
}
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
		title: 'This week ⏳',
		id: 'thisWeek',
		dateSpan: `${f(addDays(now, 2))} --> ${f(weekEnd)}`,
	},
	{
		title: 'Later 😇',
		id: 'later',
		dateSpan: `${f(addDays(weekEnd, 1))} --> . . .`,
	},
	{
		title: 'Completed ✅',
		id: 'completed',
		dateSpan: 'Any date!',
	},
];
