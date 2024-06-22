'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { ITaskGroups } from '@/types/task.types';

export const initialGroups: ITaskGroups = {
	completed: [],
	noDate: [],
	overdue: [],
	today: [],
	tomorrow: [],
	theseTwoWeeks: [],
	later: [],
};

/**
 * @name useTaskGroups
 * @description A custom hook that fetches task groups from the server.
 *
 * @returns {Object} - An object with the following properties:
 * @param {ITaskGroups} taskGroups - An array of task groups.
 * @param {React.Dispatch<React.SetStateAction<ITaskGroups>>} setTaskGroups - A function to set the task groups.
 * @param {...UseQueryResult} - Result of the query properties.
 */
export function useTaskGroups() {
	const { data, ...result } = useQuery<ITaskGroups, IApiErrorResponse>({
		queryKey: KEYS.TASK_GET_ALL,
		queryFn: () => taskService.getAllGrouped(),
	});

	const [taskGroups, setTaskGroups] = React.useState(data || initialGroups);

	React.useEffect(() => {
		setTaskGroups(data || initialGroups);
	}, [data]);

	return { taskGroups, setTaskGroups, ...result };
}
