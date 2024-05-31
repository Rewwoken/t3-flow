'use client';

import { useUser } from '@/hooks/useUser';
import { Skeleton } from '../ui/Skeleton';

export const Statistics = () => {
	const { data, isLoading } = useUser();

	// TODO: skeleton | after complete page design
	if (isLoading) return <Skeleton />;

	return (
		<>
			<h1>Statistics</h1>
			<ul>
				<li>
					<span>Total tasks: </span>
					<span>{data?.statistics.totalTasks}</span>
				</li>
				<li>
					<span>Completed tasks: </span>
					<span>{data?.statistics.completedTasks}</span>
				</li>
				<li>
					<span>Today tasks: </span>
					<span>{data?.statistics.todayTasks}</span>
				</li>
				<li>
					<span>This week tasks: </span>
					<span>{data?.statistics.thisWeekTasks}</span>
				</li>
				<li>
					<span>This time blocks: </span>
					<span>{data?.statistics.totalTimeBlocks}</span>
				</li>
				<li>
					<span>This time blocks duration: </span>
					<span>{data?.statistics.totalTimeBlocksDuration}</span>
				</li>
			</ul>
		</>
	);
};
