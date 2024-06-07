import { addDays, endOfWeek, subDays } from 'date-fns';
import { TTaskGroupId } from '@/components/dashboard-tasks/utils/groupTasks';

const now = new Date();

export const due: Record<TTaskGroupId, string | null> = {
	overdue: subDays(now, 1).toISOString(),
	noDate: null,
	today: now.toISOString(),
	tomorrow: addDays(now, 1).toISOString(),
	thisWeek: addDays(now, 2).toISOString(), // TODO: improve
	later: addDays(endOfWeek(now, { weekStartsOn: 1 }), 1).toISOString(),
	completed: null,
};
