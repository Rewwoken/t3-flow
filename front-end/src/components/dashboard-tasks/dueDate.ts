import {
	addDays,
	addWeeks,
	isBefore,
	isToday,
	isTomorrow,
	nextSunday,
	subDays,
} from 'date-fns';
import { TTaskGroupId } from '@/types/tasks.types';

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

// Must be the same as in Nest.js task.service
export const getGroupKey = (task: {
	isCompleted: boolean;
	dueDate: string | null;
}): TTaskGroupId => {
	const now = new Date();

	if (task.isCompleted) return 'completed';

	if (task.dueDate === null) return 'noDate';

	if (isToday(task.dueDate)) return 'today';

	if (isBefore(task.dueDate, now)) return 'overdue';

	if (isTomorrow(task.dueDate)) return 'tomorrow';

	if (isBefore(task.dueDate, addWeeks(nextSunday(now), 1)))
		return 'theseTwoWeeks';

	return 'later';
};
