'use client';

import React from 'react';
import { useProfile } from '@/components/dashboard-charts/hooks/useProfile';
import s from '@/components/dashboard-charts/charts.module.css';
import { TaskDays } from '@/components/dashboard-charts/graphics/TaskDays';
import { TaskGroups } from '@/components/dashboard-charts/graphics/TaskGroups';
import { TaskCompleted } from '@/components/dashboard-charts/pies/TaskCompleted';
import { TaskPriorities } from '@/components/dashboard-charts/pies/TaskPriorities';
import { TaskSession } from '@/components/dashboard-charts/pies/TaskSession';
import { TaskSettings } from '@/components/dashboard-charts/pies/TimerSettings';
import { Skeleton } from '@/components/ui/Skeleton';
import { IGetProfileResponse } from '@/types/user.service.types';

export const ChartsContext = React.createContext<IGetProfileResponse>(
	{} as IGetProfileResponse,
);

export const Charts = () => {
	const { data, isPending } = useProfile();

	if (isPending || !data) return <Skeleton />;

	return (
		<main className='!bg-transparent'>
			<ChartsContext.Provider value={data}>
				<section className={s.container}>
					<TaskGroups />
					<TaskDays />
					<TaskPriorities />
					<TaskCompleted />
					<TaskSettings />
					<TaskSession />
				</section>
			</ChartsContext.Provider>
		</main>
	);
};
