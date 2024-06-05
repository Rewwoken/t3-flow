'use client';

import { DndContext, closestCenter, rectIntersection } from '@dnd-kit/core';
import React from 'react';
import { useDrag } from '@/components/dashboard-tasks/hooks/useDrag';
import { useTasks } from '@/components/dashboard-tasks/hooks/useTasks';
import { Column } from '@/components/dashboard-tasks/board-view/Column';
import { TaskOverlay } from '@/components/dashboard-tasks/board-view/TaskOverlay';
import { groupTasks } from '@/components/dashboard-tasks/utils/group';
import { Skeleton } from '@/components/ui/Skeleton';

const dtf = new Intl.DateTimeFormat('en');
const todayDate = dtf.format(Date.now());

export const BoardView = () => {
	const { data } = useTasks();

	const tasks = React.useMemo(() => {
		return groupTasks(data);
	}, [data]);

	const { active, handleDragStart, handleDragOver, handleDragEnd } = useDrag();

	// TODO: skeleton design
	if (!data) return <Skeleton />;

	return (
		<>
			<p className='mb-4 text-xl'>Today is {todayDate}</p>
			<ul className='flex h-full'>
				<DndContext
					collisionDetection={rectIntersection}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					<Column
						title='Overdue'
						id='overdue'
						tasks={tasks.overdue}
					/>
					<Column
						title='No date'
						id='noDate'
						tasks={tasks.noDate}
					/>
					<Column
						title='Today'
						id='today'
						tasks={tasks.today}
					/>
					<Column
						title='Tomorrow'
						id='tomorrow'
						tasks={tasks.tomorrow}
					/>
					<Column
						title='This week'
						id='thisWeek'
						tasks={tasks.thisWeek}
					/>
					<Column
						title='Later'
						id='later'
						tasks={tasks.later}
					/>
					<TaskOverlay active={active} />
				</DndContext>
			</ul>
		</>
	);
};
