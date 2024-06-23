'use client';

import React from 'react';
import { useCreateTask } from '@/components/dashboard-tasks/hooks/queries/useCreateTask';
import { TaskGroupsContext } from '@/components/dashboard-tasks/Tasks';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { genRank } from '@/utils/genRank';
import { ICreateTaskFields } from '@/types/task.types';

export function useHandleTaskCreate() {
	const { taskGroups, setTaskGroups } = React.useContext(TaskGroupsContext);
	const { mutate: createTask, ...result } = useCreateTask({
		onSuccess: (data) => {
			const groupId = getTaskGroupId(data);

			setTaskGroups((prev) => {
				const newGroup = [...prev[groupId], data];

				return {
					...prev,
					[groupId]: newGroup,
				};
			});
		},
	});

	function onTaskCreate(values: ICreateTaskFields) {
		const groupId = getTaskGroupId(values);
		const group = taskGroups[groupId];

		const prevRank = group[group.length - 1]?.rank;

		createTask({
			...values,
			dueDate: values.dueDate ? values.dueDate.toISOString() : null,
			rank: genRank(prevRank, undefined) as string,
		});
	}

	return { onTaskCreate, ...result };
}
