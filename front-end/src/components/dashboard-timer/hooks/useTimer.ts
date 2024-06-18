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
	const timerRef = React.useRef<NodeJS.Timeout | null>(null);
	const [totalSeconds, setTotalSeconds] = React.useState(0);

	React.useEffect(() => {
		setTotalSeconds(session?.totalSeconds ?? 0);
	}, [session]);

	const handleTimeChange = () => {
		setTotalSeconds((prev) => {
			const nextTotalSeconds = prev + 1;

			if (
				timerRef.current &&
				settings?.intervalsCount &&
				nextTotalSeconds >= settings?.intervalsCount * 3600
			) {
				clearInterval(timerRef.current);
				timerRef.current = null;

				updateSession({ totalSeconds: nextTotalSeconds, isCompleted: true });
			}

			return nextTotalSeconds;
		});
	};

	const handleStart = () => {
		timerRef.current = setInterval(handleTimeChange, 1000);
	};

	const handleReset = () => {
		deleteSession();
	};

	const handlePause = () => {
		if (!timerRef.current) return null;

		clearInterval(timerRef.current);

		timerRef.current = null;

		updateSession({
			totalSeconds,
			isCompleted: false,
		});
	};

	return {
		isPending: isSessionPending || isSettingsPending,
		createSession,
		session,
		settings,
		timerRef,
		totalSeconds,
		setTotalSeconds,
		handleStart,
		handleReset,
		handlePause,
	};
}
