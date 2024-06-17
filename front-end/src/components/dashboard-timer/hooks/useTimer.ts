'use client';

import React from 'react';
import { useCreateTimerSession } from '@/components/dashboard-timer/hooks/queries/useCreateTimerSession';
import { useDeleteTimerSession } from '@/components/dashboard-timer/hooks/queries/useDeleteTimerSession';
import { useTimerSession } from '@/components/dashboard-timer/hooks/queries/useTimerSession';
import { useTimerSettings } from '@/components/dashboard-timer/hooks/queries/useTimerSettings';
import { useUpdateTimerSession } from '@/components/dashboard-timer/hooks/queries/useUpdateTimerSession';

export function useTimer() {
	const { data: settings, isPending: isSettingsPending } = useTimerSettings();
	const { data: session, isPending: isSessionPending } = useTimerSession();
	const { mutate: createSession } = useCreateTimerSession();
	const { mutate: updateSession } = useUpdateTimerSession();
	const { mutate: deleteSession } = useDeleteTimerSession();

	const [totalSeconds, setTotalSeconds] = React.useState(
		session?.totalSeconds ?? 0,
	);
	const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

	React.useEffect(() => {
		setTotalSeconds(session?.totalSeconds!);
	}, [session]);

	const handleStart = () => {
		setTimer(
			setInterval(() => {
				setTotalSeconds((prev) => {
					const nextSeconds = prev + 1;

					return nextSeconds;
				});
			}, 1000),
		);
	};

	const handleReset = () => {
		deleteSession();
	};

	const handlePause = () => {
		if (timer) {
			clearInterval(timer);

			setTimer(null);
		}

		updateSession({ totalSeconds, isCompleted: false });
	};

	return {
		isPending: isSessionPending || isSettingsPending,
		createSession,
		session,
		settings,
		timer,
		totalSeconds,
		handleStart,
		handleReset,
		handlePause,
	};
}
