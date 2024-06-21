import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { TimeBlock } from '@/components/dashboard-time-blocking/time-block/TimeBlock';
import s from '@/components/dashboard-time-blocking/time-block/time-block.module.css';
import { ITimeBlock } from '@/types/time-block.service.types';

interface ITimeBlockProps {
	block: ITimeBlock;
}
export const SortableTimeBlock = ({ block }: ITimeBlockProps) => {
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
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={clsx(s.container, {
				[s.dragged]: isDragging,
			})}
		>
			<TimeBlock data={block} />
		</li>
	);
};
