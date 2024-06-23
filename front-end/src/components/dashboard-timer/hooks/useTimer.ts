/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDeleteTimerSession } from '@/components/dashboard-timer/hooks/queries/useDeleteTimerSession';
import { useUpdateTimerSession } from '@/components/dashboard-timer/hooks/queries/useUpdateTimerSession';
import { handleTime } from '@/components/dashboard-timer/utils/handleTime';

export function useTimer(initialSeconds: number, intervalsCount: number) {
	const totalSecondsRef = React.useRef(initialSeconds);
	const { mutate: updateSession } = useUpdateTimerSession();
	const { mutate: deleteSession } = useDeleteTimerSession();
	const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

	const initialTime = React.useMemo(() => handleTime(initialSeconds), []);

	const [hours, setHours] = React.useState(initialTime.hours);
	const [minutes, setMinutes] = React.useState(initialTime.minutes);
	const [seconds, setSeconds] = React.useState(initialTime.seconds);

	const incrementSeconds = () => {
		setSeconds((prev) => {
			const next = prev + 1;

			return next === 60 ? 0 : next;
		});
	};

	const incrementMinutes = () => {
		setMinutes((prev) => {
			const next = prev + 1;

			return next === 60 ? 0 : next;
		});
	};

	const incrementHours = () => {
		setHours((prev) => {
			const next = prev + 1;

			if (next >= intervalsCount && timer) {
				clearInterval(timer);
				setTimer(null);

				updateSession({
					isCompleted: true,
					totalSeconds: intervalsCount * 3600,
				});
			}

			return next;
		});
	};

	React.useEffect(() => {
		if (timer && seconds === 0) incrementMinutes();
	}, [seconds]);

	React.useEffect(() => {
		if (timer && minutes === 0) incrementHours();
	}, [minutes]);

	React.useEffect(() => {
		totalSecondsRef.current = hours * 3600 + minutes * 60 + seconds;
	}, [seconds, minutes, hours]);

	const handleStart = () => {
		if (timer) return null;

		const interval = setInterval(incrementSeconds, 1000);
		setTimer(interval);
	};

	const handleReset = () => {
		deleteSession();
	};

	const handlePause = () => {
		if (!timer) return null;

		updateSession({
			isCompleted: false,
			totalSeconds: totalSecondsRef.current,
		});

		clearInterval(timer);
		setTimer(null);
	};

	return {
		seconds,
		minutes,
		hours,
		timer,
		handleStart,
		handleReset,
		handlePause,
	};
}
