import { DragOverlay } from '@dnd-kit/core';
import clsx from 'clsx';
import { PencilLine, Trash2 } from 'lucide-react';
import React from 'react';
import { TaskControl } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskControl';
import { TaskPriority } from '@/components/dashboard-tasks/board-view/task/task-data/TaskPriority';
import { TaskText } from '@/components/dashboard-tasks/board-view/task/task-data/TaskText';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskOverlayProps {
  active: IGetTaskResponse | null;
}
const TaskOverlayComponent = ({ active }: ITaskOverlayProps) => {
  return (
    <DragOverlay
      wrapperElement='li'
      className={clsx(s.task, 'hover:cursor-grabbing')}
    >
      {active && (
        <>
          <TaskPriority priority={active.priority} />
          <TaskText
            name={active.name}
            priority={active.priority}
            dueDate={active.dueDate}
          />
          <div className={s.controls}>
            <TaskControl title='Delete'>
              <Trash2
                strokeWidth={1.5}
                className='stroke-muted'
              />
            </TaskControl>
            <TaskControl title='Update'>
              <PencilLine
                strokeWidth={1.5}
                className='stroke-muted'
              />
            </TaskControl>
          </div>
        </>
      )}
    </DragOverlay>
  );
};

export const TaskOverlay = React.memo(TaskOverlayComponent);
