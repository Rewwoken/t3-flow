import { DragOverlay } from '@dnd-kit/core';
import clsx from 'clsx';
import React from 'react';
import { TimeBlock } from '@/components/dashboard-time-blocking/time-block/TimeBlock';
import s from '@/components/dashboard-time-blocking/time-block/time-block.module.css';
import { ITimeBlock } from '@/types/time-block.service.types';

interface ITimeBlockOverlayProps {
	active: ITimeBlock | null;
}
const TimeBlockOverlayComponent = ({ active }: ITimeBlockOverlayProps) => (
	<DragOverlay
		style={{ backgroundColor: active?.color }}
		className={clsx(s.container, 'cursor-grabbing')}
		wrapperElement='li'
	>
		{active && <TimeBlock data={active} />}
	</DragOverlay>
);

export const TimeBlockOverlay = React.memo(TimeBlockOverlayComponent);
