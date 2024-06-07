import {
	endOfWeek,
	isAfter,
	isBefore,
	isThisWeek,
	isToday,
	isTomorrow,
} from 'date-fns';
import { IGetTaskResponse } from '@/types/task.service';
import { TTaskGroupId } from './groupTasks';

const now = new Date();

/**
 * Determines the task group based on its due date and completion status.
 *
 * @param {IGetTaskResponse} data - The task data.
 * @returns {TTaskGroupId} The group of the task.
 */
export const getGroup = ({
	dueDate,
	isCompleted,
}: IGetTaskResponse): TTaskGroupId => {
	if (isCompleted) {
		return 'completed';
	}

	if (dueDate === null) return 'noDate';

	if (isToday(dueDate)) return 'today';

	if (isTomorrow(dueDate)) return 'tomorrow';

	// ! Check if the date is overdue before thisWeek
	// ! since the task can be this week but overdue
	if (isBefore(dueDate, now)) return 'overdue';

	// Set `weekStartsOn: 1` to be Monday as week start
	if (isThisWeek(dueDate, { weekStartsOn: 1 })) return 'thisWeek';

	if (isAfter(dueDate, endOfWeek(now))) return 'later';

	return 'noDate';
};
