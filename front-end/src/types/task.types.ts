import type { IGetTaskResponse } from '@/types/task.service';

export type TView = 'table' | 'board';

export type TTaskGroupId =
  | 'completed'
  | 'noDate'
  | 'overdue'
  | 'today'
  | 'tomorrow'
  | 'theseTwoWeeks'
  | 'later';

export interface IColumnData {
  id: TTaskGroupId;
  title: string;
  dateSpan: string;
}

export interface ITaskGroups extends Record<TTaskGroupId, IGetTaskResponse[]> {}

export interface IStartPositionRef {
  colId: TTaskGroupId | null;
  index: number | null;
}

export interface ICreateTaskFields {
  name: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  isCompleted: boolean;
}

export interface IUpdateTaskFields {
  name: string;
  priority: 'low' | 'medium' | 'high';
  dueDay: Date | null;
  dueTime: Date | null;
  isCompleted: boolean;
}

export interface IPopover {
  x: number;
  y: number;
  isVisible: boolean;
}

export interface IRequiredToUpdateTaskData {
  isCompleted: boolean;
  dueDate: Date | string | null;
}
