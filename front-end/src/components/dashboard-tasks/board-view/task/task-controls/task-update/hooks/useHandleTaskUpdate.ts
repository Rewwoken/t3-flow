'use client';

import { isValid, setHours, setMinutes } from 'date-fns';
import React from 'react';
import { useUpdateTask } from '@/components/dashboard-tasks/hooks/queries/useUpdateTask';
import { TaskGroupsContext } from '@/components/dashboard-tasks/Tasks';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { genRank } from '@/utils/genRank';
import { IGetTaskResponse } from '@/types/task.service';
import { IUpdateTaskFields } from '@/types/task.types';

export function useHandleTaskUpdate(task: IGetTaskResponse) {
  const { taskGroups, setTaskGroups } = React.useContext(TaskGroupsContext);
  const { mutate: updateTask } = useUpdateTask();

  function onTaskUpdate(values: IUpdateTaskFields) {
    const { dueDay, dueTime, ...data } = values;

    let dueDate;
    if (!isValid(dueDay) || !isValid(dueTime) || !dueDay || !dueTime) {
      dueDate = null;
    } else {
      dueDate = setHours(dueDay, dueTime.getHours());
      dueDate = setMinutes(dueDate, dueTime.getMinutes());

      dueDate = dueDate.toISOString();
    }

    const updatedData = { ...data, dueDate };

    const fromGroupId = getTaskGroupId(task);
    const toGroupId = getTaskGroupId(updatedData);

    if (fromGroupId === toGroupId) {
      updateTask({ id: task.id, data: updatedData });

      return setTaskGroups((prev) => {
        const index = prev[fromGroupId].findIndex(
          (item) => item.id === task.id,
        );

        const newGroup = prev[fromGroupId].toSpliced(index, 1, {
          ...task,
          ...updatedData,
        });

        return {
          ...prev,
          [fromGroupId]: newGroup,
        };
      });
    }

    const toGroup = taskGroups[toGroupId];

    const rank =
      toGroup.length === 0
        ? (genRank(undefined, undefined) as string)
        : (genRank(toGroup[toGroup.length - 1].rank, undefined) as string);

    setTaskGroups((prev) => {
      const fromIndex = prev[fromGroupId].findIndex(
        (item) => item.id === task.id,
      );

      const newFromGroup = prev[fromGroupId].toSpliced(fromIndex, 1);
      const newToGroup = [
        ...prev[toGroupId],
        {
          ...task,
          ...updatedData,
          rank,
        },
      ];

      return {
        ...prev,
        [fromGroupId]: newFromGroup,
        [toGroupId]: newToGroup,
      };
    });

    updateTask({ id: task.id, data: { ...updatedData, rank } });
  }

  return { onTaskUpdate };
}
