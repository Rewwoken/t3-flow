import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { X } from 'lucide-react';
import s from '@/components/dashboard-time-blocking/time-block/time-block.module.css';
import { ICreateTimeBlockFields } from '@/types/time-block.types';

interface IDraggableTimeBlockProps {
	data: ICreateTimeBlockFields;
	isValid: boolean;
}
export const NewTimeBlock = ({ data, isValid }: IDraggableTimeBlockProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: 'new-block',
		data: {
			type: 'block',
			block: data,
		},
		disabled: !isValid,
	});

	const style = {
		backgroundColor: data.color,
		height:
			(70 < data.minutes && data.minutes < 720 ? data.minutes * 0.7 : 50) +
			'px',
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={clsx(s.container, {
				'opacity-75': !isValid,
				[s.dragged]: isDragging,
			})}
		>
			<span
				className={clsx('flex h-full items-center pl-2 text-white', {
					'cursor-grab': isValid,
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
				>
					<X className='stroke-white' />
				</IconButton>
			</Tooltip>
		</li>
	);
};
