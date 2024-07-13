'use client';

import { Popover } from '@mui/material';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { TaskControl } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskControl';
import { TaskDeleteButton } from '@/components/dashboard-tasks/board-view/task/task-controls/task-delete/TaskDeleteButton';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskDeleteProps {
  task: IGetTaskResponse;
}
export const TaskDeletePopover = ({ task }: ITaskDeleteProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'update-task-popover' : undefined;

  return (
    <>
      <TaskControl
        title='Delete'
        onClick={handleClick}
      >
        <Trash2
          strokeWidth={1.5}
          className='stroke-muted'
        />
      </TaskControl>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transitionDuration={200}
      >
        <TaskDeleteButton
          task={task}
          handleClose={handleClose}
        />
      </Popover>
    </>
  );
};
