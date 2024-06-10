import { addDays, addWeeks, nextSunday, subDays } from 'date-fns';
import type { TTaskGroupId } from '@/types/tasks.types';

const now = new Date();

export const dueDate: Record<TTaskGroupId, string | null> = {
	overdue: subDays(now, 1).toISOString(),
	noDate: null,
	today: now.toISOString(),
	tomorrow: addDays(now, 1).toISOString(),
	theseTwoWeeks: addWeeks(nextSunday(now), 1).toISOString(),
	later: addDays(addWeeks(nextSunday(now), 1), 1).toISOString(),
	completed: null,
};
