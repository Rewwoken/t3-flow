'use client';

import React from 'react';
import { useProfile } from '@/components/dashboard-charts/hooks/useProfile';
import { Skeleton } from '@/components/ui/Skeleton';
import { IGetProfileResponse } from '@/types/user.service.types';
import { TaskCharts } from '@/components/dashboard-charts/task-charts/TaskCharts';

export const ChartsContext = React.createContext<IGetProfileResponse>(
	{} as IGetProfileResponse,
);

export const Charts = () => {
	const { data, isPending } = useProfile();

	if (isPending || !data) return <Skeleton />;

	return (
		<main className='!bg-transparent'>
			<ChartsContext.Provider value={data}>
				<TaskCharts />
			</ChartsContext.Provider>
		</main>
	);
};
45;
