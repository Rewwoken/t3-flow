'use client';

import React from 'react';
import { useDeleteTask } from '@/components/dashboard-tasks/hooks/queries/useDeleteTask';
import { TaskGroupsContext } from '@/components/dashboard-tasks/Tasks';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { IGetTaskResponse } from '@/types/task.service';

export function useHandleTaskDelete() {
	const { setTaskGroups } = React.useContext(TaskGroupsContext);
	const { mutate: deleteTask } = useDeleteTask();

	function onDelete(task: IGetTaskResponse) {
		deleteTask({ id: task.id });

		setTaskGroups((prev) => {
			const colId = getTaskGroupId(task);
			const index = prev[colId].findIndex((item) => item.id === task.id);

			const newGroup = prev[colId].toSpliced(index, 1);

			return {
				...prev,
				[colId]: newGroup,
			};
		});
	}

	return { onDelete };
}
