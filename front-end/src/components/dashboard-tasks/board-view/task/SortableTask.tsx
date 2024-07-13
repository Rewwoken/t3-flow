import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { TaskControls } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskControls';
import { TaskPriority } from '@/components/dashboard-tasks/board-view/task/task-data/TaskPriority';
import { TaskText } from '@/components/dashboard-tasks/board-view/task/task-data/TaskText';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import type { IGetTaskResponse } from '@/types/task.service';
import type { TTaskGroupId } from '@/types/task.types';

interface ISortableItemProps {
  colId: TTaskGroupId;
  taskId: string;
  task: IGetTaskResponse;
}
export const SortableTask = ({ colId, taskId, task }: ISortableItemProps) => {
  const {
    transform,
    transition,
    setNodeRef,
    attributes,
    isDragging,
    listeners,
  } = useSortable({
    id: taskId,
    data: {
      type: 'task',
      colId,
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      style={style}
      className={clsx(s.task, {
        [s.skeleton]: isDragging,
        'italic line-through': task.isCompleted,
      })}
    >
      <TaskPriority
        {...listeners}
        priority={task.priority}
      />
      <TaskText
        {...listeners}
        name={task.name}
        priority={task.priority}
        dueDate={task.dueDate}
      />
      <TaskControls task={task} />
    </li>
  );
};
