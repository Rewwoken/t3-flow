import { IGetTaskResponse } from '@/types/task.service';
import { daysDiff } from './daysDiff';
import { TTaskGroupId } from './groupTasks';

/**
 * Determines the task group based on its due date and completion status.
 *
 * @param {IGetTaskResponse} data - The task data.
 * @returns {TTaskGroupId} The group of the task.
 */
export const getGroup = (data: IGetTaskResponse): TTaskGroupId => {
	const diff = daysDiff(data.dueDate);

	if (data.isCompleted) {
		return 'completed';
	}

	if (diff === null) {
		return 'noDate';
	}

	if (diff < 0) {
		return 'overdue';
	}

	switch (diff) {
		case 0:
			return 'today';
		case 1:
			return 'tomorrow';
		default:
			return diff <= 7 ? 'thisWeek' : 'later';
	}
};
