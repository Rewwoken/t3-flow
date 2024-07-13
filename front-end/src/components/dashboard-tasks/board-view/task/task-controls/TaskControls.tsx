'use client';

import React from 'react';
import { TaskDeletePopover } from '@/components/dashboard-tasks/board-view/task/task-controls/task-delete/TaskDeletePopover';
import { TaskUpdatePopover } from '@/components/dashboard-tasks/board-view/task/task-controls/task-update/TaskUpdatePopover';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskControlsProps {
  task: IGetTaskResponse;
}
const TaskControlsComponent = ({ task }: ITaskControlsProps) => (
  <div className={s.controls}>
    <TaskDeletePopover task={task} />
    <TaskUpdatePopover task={task} />
  </div>
);

export const TaskControls = React.memo(TaskControlsComponent);
