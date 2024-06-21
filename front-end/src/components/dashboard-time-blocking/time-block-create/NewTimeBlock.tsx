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
		transform: CSS.Transform.toString(transform),
		transition,
		backgroundColor: data.color,
	};

	const handleReset = () => {};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={clsx(s.container, 'bg-green-500', {
				'opacity-75': !isValid,
				[s.dragged]: isDragging,
			})}
		>
			<span className='text-white'>{data.name}</span>
			<Tooltip
				title='Delete'
				placement='right-start'
				arrow
			>
				<IconButton
					type='button'
					size='medium'
					aria-label='Delete this time block'
					onClick={handleReset}
				>
					<X className='stroke-white' />
				</IconButton>
			</Tooltip>
		</li>
	);
};
