'use client';

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
	const { active, taskGroups, handleDragStart, handleDragOver, handleDragEnd } =
		useDragTasks();

	const [view, setView] = React.useState<TView>('board-view'); // TODO: save value to localStorage
	const handleChange = (e: React.SyntheticEvent, newView: TView) => {
		setView(newView);
	};

	return (
		<main className='w-full overflow-hidden'>
			<TasksTabs
				view={view}
				handleChange={handleChange}
			/>
			{view === 'table-view' && <TableView />}
			{view === 'board-view' && (
				<BoardView
					active={active}
					taskGroups={taskGroups}
					handleDragStart={handleDragStart}
					handleDragOver={handleDragOver}
					handleDragEnd={handleDragEnd}
				/>
			)}
		</main>
	);
};
