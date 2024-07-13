import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { ITimeBlock } from '@/types/time-block.service.types';

interface ITimeBlockProps {
  data: ITimeBlock;
  listeners?: SyntheticListenerMap; // draggable listeners from useSortable(...)
  handleDelete?: () => void;
}
export const TimeBlock = ({
  data,
  listeners,
  handleDelete,
}: ITimeBlockProps) => {
  return (
    <>
      <span
        {...listeners}
        className={clsx('flex h-full items-center pl-2 text-white', {
          'cursor-grab': !!listeners,
        })}
      >
        {data.name}
      </span>
      <Tooltip
        title='Delete'
        placement='right-start'
        arrow
      >
        <IconButton
          type='button'
          size='medium'
          aria-label='Delete this time block'
          onClick={handleDelete}
        >
          <X className='stroke-white' />
        </IconButton>
      </Tooltip>
    </>
  );
};
