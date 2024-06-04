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
			<p>User id: {data?.id}</p>
		</>
	);
};
