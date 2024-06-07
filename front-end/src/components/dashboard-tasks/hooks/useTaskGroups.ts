'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { ITaskGroups } from '@/types/tasks.types';

const initialGroups: ITaskGroups = {
	completed: [],
	noDate: [],
	overdue: [],
	today: [],
	tomorrow: [],
	thisWeek: [],
	later: [],
};

export function useTaskGroups() {
	const { data, ...result } = useQuery<ITaskGroups, IApiErrorResponse>({
		queryKey: KEYS.GET_TASKS,
		queryFn: () => taskService.getAllGrouped(),
	});

	const [taskGroups, setTaskGroups] = React.useState(data || initialGroups);

	React.useEffect(() => {
		console.log('SET TASK GROUPS');

		setTaskGroups(data || initialGroups);
	}, [data]);

	return { taskGroups, setTaskGroups, ...result };
}
