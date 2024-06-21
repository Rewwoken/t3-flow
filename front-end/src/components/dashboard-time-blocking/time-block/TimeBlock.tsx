import { IconButton, Tooltip } from '@mui/material';
import { X } from 'lucide-react';
import { useDeleteTimeBlock } from '@/components/dashboard-time-blocking/hooks/queries/useDeleteTimeBlock';
import { ITimeBlock } from '@/types/time-block.service.types';

interface ITimeBlockProps {
	data: ITimeBlock;
}
export const TimeBlock = ({ data }: ITimeBlockProps) => {
	const { mutate: deleteBlock } = useDeleteTimeBlock();
	const handleDelete = () => {
		deleteBlock(data.id);
	};

	return (
		<>
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
					onClick={handleDelete}
				>
					<X className='stroke-white' />
				</IconButton>
			</Tooltip>
		</>
	);
};
