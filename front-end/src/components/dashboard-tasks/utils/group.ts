import { daysDiff } from '@/components/dashboard-tasks/utils/daysDiff';
import { IGetTaskResponse } from '@/types/task.service';

export const groupTasks = (data: IGetTaskResponse[] | undefined) => {
	if (!data) return {};

	return Object.groupBy(data, (task) => {
		const diff = daysDiff(task.dueDate);

		if (diff === null) return 'noDate';

		if (diff < 0) return 'overdue';

		if (diff === 0) return 'today';

		if (diff === 1) return 'tomorrow';

		if (1 < diff && diff <= 7) return 'thisWeek';

		if (diff > 7) return 'later';

		return 'noDate';
	});
};
