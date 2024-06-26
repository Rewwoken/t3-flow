import {
	addDays,
	addWeeks,
	isBefore,
	isToday,
	isTomorrow,
	nextSunday,
	startOfToday,
} from 'date-fns';
import type {
	IRequiredToUpdateTaskData,
	TTaskGroupId,
} from '@/types/task.types';

/**
 * ! The algorithm must be the same as on the backend.
 *
 * @name getTaskGroupId
 * @description A function that returns the task group ID based on the task's completion status and due date.
 *
 * @param {Object} task - The task object containing the completion status and due date.
 * @param {boolean} task.isCompleted - Indicates if the task is completed.
 * @param {string | null} task.dueDate - The due date of the task in ISO string format.
 *
 * @returns {TTaskGroupId} The task group ID.
 */
export const getTaskGroupId = (
	task: IRequiredToUpdateTaskData,
): TTaskGroupId => {
	const now = startOfToday();

	if (task.isCompleted) return 'completed';

	if (task.dueDate === null) return 'noDate';

	if (isToday(task.dueDate)) return 'today';

	if (isBefore(task.dueDate, now)) return 'overdue';

	if (isTomorrow(task.dueDate)) return 'tomorrow';

	if (isBefore(task.dueDate, addDays(addWeeks(nextSunday(now), 1), 1)))
		return 'theseTwoWeeks';

	return 'later';
};
