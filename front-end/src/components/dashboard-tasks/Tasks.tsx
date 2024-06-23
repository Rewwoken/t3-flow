'use client';

import { Divider } from '@mui/material';
import React from 'react';
import { useDragTasks } from '@/components/dashboard-tasks/hooks/useDragTasks';
import { initialGroups } from '@/components/dashboard-tasks/hooks/useTaskGroups';
import { TasksTabs } from '@/components/dashboard-tasks/TasksTabs';
import { BoardView } from '@/components/dashboard-tasks/board-view/BoardView';
import { TableView } from '@/components/dashboard-tasks/table-view/TableView';
import type { ITaskGroups, TView } from '@/types/task.types';

interface ITaskGroupsContext {
	taskGroups: ITaskGroups;
	setTaskGroups: React.Dispatch<React.SetStateAction<ITaskGroups>>;
}
export const TaskGroupsContext = React.createContext<ITaskGroupsContext>({
	taskGroups: initialGroups,
	setTaskGroups: () => {},
});
export const Tasks = () => {
	const {
		active,
		taskGroups,
		setTaskGroups,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
	} = useDragTasks();

	const [view, setView] = React.useState<TView>('board'); // TODO: save value to localStorage
	const handleChange = (e: React.SyntheticEvent, newView: TView) => {
		setView(newView);
	};

	return (
		<main className='w-full overflow-hidden'>
			<TasksTabs
				view={view}
				handleChange={handleChange}
			/>
			<Divider className='mb-4' />
			<TaskGroupsContext.Provider value={{ taskGroups, setTaskGroups }}>
				{view === 'table' && <TableView />}
				{view === 'board' && (
					<BoardView
						active={active}
						taskGroups={taskGroups}
						handleDragStart={handleDragStart}
						handleDragOver={handleDragOver}
						handleDragEnd={handleDragEnd}
					/>
				)}
			</TaskGroupsContext.Provider>
		</main>
	);
};
