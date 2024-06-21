import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface ITaskControlProps extends React.PropsWithChildren {
	title: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const TaskControl = ({
	title,
	onClick,
	children,
}: ITaskControlProps) => {
	return (
		<Tooltip
			title={title}
			placement='right-start'
			arrow
		>
			<IconButton
				type='button'
				size='small'
				aria-label={title}
				onClick={onClick}
			>
				{children}
			</IconButton>
		</Tooltip>
	);
};
