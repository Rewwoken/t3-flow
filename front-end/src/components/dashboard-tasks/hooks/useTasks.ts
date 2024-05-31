'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { IGetTasksResponse } from '@/types/task.service';

export function useTasks() {
	const { data } = useQuery<IGetTasksResponse, IApiErrorResponse>({
		queryKey: KEYS.QUERY_TASKS,
		queryFn: () => taskService.getAll(),
	});

	const [tasks, setTasks] = React.useState<IGetTasksResponse | undefined>(data);

	useEffect(() => {
		setTasks(data);
	}, [data]);

	return { tasks, setTasks };
}
