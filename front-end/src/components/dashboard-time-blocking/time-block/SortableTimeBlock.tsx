import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import React from 'react';
import { useDeleteTimeBlock } from '@/components/dashboard-time-blocking/hooks/queries/useDeleteTimeBlock';
import { TimeBlocksContext } from '@/components/dashboard-time-blocking/TimeBlocking';
import { TimeBlock } from '@/components/dashboard-time-blocking/time-block/TimeBlock';
import s from '@/components/dashboard-time-blocking/time-block/time-block.module.css';
import { ITimeBlock } from '@/types/time-block.service.types';

interface ITimeBlockProps {
  block: ITimeBlock;
}
export const SortableTimeBlock = ({ block }: ITimeBlockProps) => {
  const { setTimeBlocks } = React.useContext(TimeBlocksContext);
  const { mutate: deleteBlock } = useDeleteTimeBlock({
    onSuccess: () => {
      setTimeBlocks((prev) => {
        const index = prev.findIndex((item) => item.id === block.id);

        return prev.toSpliced(index, 1);
      });
    },
  });

  const handleDelete = () => {
    deleteBlock(block.id);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: { type: 'block', block },
  });

  const style = {
    backgroundColor: block.color,
    height: block.minutes * 0.7 + 'px',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={clsx(s.container, {
        [s.dragged]: isDragging,
      })}
    >
      <TimeBlock
        data={block}
        listeners={listeners}
        handleDelete={handleDelete}
      />
    </li>
  );
};
