import { DragOverlay } from '@dnd-kit/core';
import { TimeBlock } from '@/components/dashboard-time-blocking/time-block/TimeBlock';
import s from '@/components/dashboard-time-blocking/time-block/time-block.module.css';
import { ITimeBlock } from '@/types/time-block.service.types';

interface ITimeBlockOverlayProps {
	active: ITimeBlock | null;
}
export const TimeBlockOverlay = ({ active }: ITimeBlockOverlayProps) => {
	// TODO: memo
	return (
		<DragOverlay
			style={{ backgroundColor: active?.color }}
			className={s.container}
			wrapperElement='li'
		>
			{active && <TimeBlock data={active} />}
		</DragOverlay>
	);
};
