import { addWeeks, isBefore, isToday, isTomorrow, nextSunday } from 'date-fns';
import { TTaskGroupId } from '@/types/tasks.types';

/**
 * ! The algorithm must be the same as on the backend.
 *
 * Returns the task group ID based on the task's completion status and due date.
 * The task group ID can be one of the following: 'completed', 'noDate', 'today', 'overdue',
 * 'tomorrow', 'theseTwoWeeks', or 'later'.
 *
 * @param {Object} task - The task object containing the completion status and due date.
 * @param {boolean} task.isCompleted - Indicates if the task is completed.
 * @param {string | null} task.dueDate - The due date of the task in ISO string format.
 * @return {TTaskGroupId} The task group ID.
 */
export const getTaskGroupId = (task: {
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
