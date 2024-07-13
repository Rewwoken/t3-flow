'use client';

import { DndContext, rectIntersection } from '@dnd-kit/core';
import React from 'react';
import { useDragTimeBlocks } from '@/components/dashboard-time-blocking/hooks/useDragTimeBlocks';
import { Blocks } from '@/components/dashboard-time-blocking/Blocks';
import { TimeBlockOverlay } from '@/components/dashboard-time-blocking/TimeBlockOverlay';
import { TimeBlockCreateForm } from '@/components/dashboard-time-blocking/time-block-create/TimeBlockCreateForm';
import { Skeleton } from '@/components/ui/Skeleton';
import { IGetTimeBlocksResponse } from '@/types/time-block.service.types';

interface ITimeBlocksContext {
  timeBlocks: IGetTimeBlocksResponse;
  setTimeBlocks: React.Dispatch<React.SetStateAction<IGetTimeBlocksResponse>>;
}
export const TimeBlocksContext = React.createContext<ITimeBlocksContext>({
  timeBlocks: [],
  setTimeBlocks: () => {},
});

export const TimeBlocking = () => {
  const {
    active,
    timeBlocks,
    setTimeBlocks,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    isPending,
  } = useDragTimeBlocks();

  if (isPending) return <Skeleton />;

  return (
    <main className='flex items-center justify-center'>
      <DndContext
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <TimeBlocksContext.Provider value={{ timeBlocks, setTimeBlocks }}>
          <div className='flex gap-x-4'>
            <Blocks />
            <TimeBlockCreateForm />
          </div>
        </TimeBlocksContext.Provider>
        <TimeBlockOverlay active={active} />
      </DndContext>
    </main>
  );
};
