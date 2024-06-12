import {
	addDays,
	addWeeks,
	nextSunday,
	setHours,
	setMinutes,
	subDays,
} from 'date-fns';
import type { TTaskGroupId } from '@/types/tasks.types';

const now = new Date();

export const getDueDate: Record<TTaskGroupId, string | null> = {
	overdue: subDays(now, 1).toISOString(),
	noDate: null,
	today: now.toISOString(),
	tomorrow: addDays(now, 1).toISOString(),
	theseTwoWeeks: addWeeks(nextSunday(now), 1).toISOString(),
	later: addDays(addWeeks(nextSunday(now), 1), 1).toISOString(),
	completed: null, // Should only be used in createTaskModal defaultValue
};

export const changeDueDate = (date: string | null, groupId: TTaskGroupId) => {
	if (date === null) return getDueDate[groupId];

	if (groupId === 'completed') return date;

	const dueDate = getDueDate[groupId];

	if (dueDate === null) return null;

	const hours = new Date(date).getHours();
	const minutes = new Date(date).getMinutes();

	return setHours(setMinutes(dueDate, minutes), hours).toISOString();
};
