import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { TView } from '@/types/task.types';

interface ITaskTabsProps {
	view: TView;
	handleChange: (e: React.SyntheticEvent, value: any) => void;
}
const TasksTabsComponent = ({ view, handleChange }: ITaskTabsProps) => {
	return (
		<Tabs
			value={view}
			onChange={handleChange}
			className='w-full rounded-md'
		>
			<Tab
				label='Table'
				value='table-view'
				className='w-1/2 max-w-none rounded-bl-md'
				disabled
			/>
			<Tab
				label='Board'
				value='board-view'
				className='w-1/2 max-w-none rounded-br-md'
			/>
		</Tabs>
	);
};

export const TasksTabs = React.memo(TasksTabsComponent, arePropsEqual);

function arePropsEqual(
	oldProps: Readonly<ITaskTabsProps>,
	newProps: Readonly<ITaskTabsProps>,
) {
	return oldProps.view === newProps.view;
}
