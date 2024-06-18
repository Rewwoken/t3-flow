'use client';

import { Pause, TimerIcon, TimerReset } from 'lucide-react';
import React from 'react';
import { useTimer } from '@/components/dashboard-timer/hooks/useTimer';
import { TimerIntervals } from '@/components/dashboard-timer/TimerIntervals';
import s from '@/components/dashboard-timer/timer.module.css';
import { handleTime } from '@/components/dashboard-timer/utils/handleTime';
import { Skeleton } from '@/components/ui/Skeleton';

export const Timer = () => {
	const {
		isPending,
		createSession,
		session,
		settings,
		timerRef,
		totalSeconds,
		setTotalSeconds,
		handleStart,
		handleReset,
		handlePause,
	} = useTimer();

	const { minutes, seconds } = handleTime(totalSeconds);

	const timerMessage = React.useMemo(() => {
		if (session?.isCompleted) return 'Your session has been completed!';

		if (!timerRef.current) return 'Your session has been paused!';

		if (settings?.workInterval && minutes < settings?.workInterval) {
			return 'Time to work!';
		} else {
			return 'Break time!';
		}
	}, [minutes, session?.isCompleted, settings?.workInterval, timerRef]);

	// TODO: add Skeleton
	if (isPending) return <Skeleton className='w-[500px]' />;

	if (!session) {
		return (
			<main className='flex items-center justify-center'>
				<button onClick={() => createSession()}>Create session</button>
			</main>
		);
	}

	return (
		<main className='flex items-center justify-center'>
			<div className='flex w-[500px] flex-col items-center gap-y-2 rounded-md bg-secondary p-5'>
				<header className='flex items-center gap-x-2'>
					<h2 className='text-4xl'>Your timer!</h2>
					<TimerIcon size={37} />
				</header>
				<span>{timerMessage}</span>
				<span className='mt-2 italic text-muted'>
					Work for {settings?.workInterval} min - Break for&nbsp;
					{settings?.breakInterval} min
				</span>
				<div className='flex w-3/4 items-center justify-center rounded-md bg-muted/10 py-4 text-8xl'>
					<span>
						{session.isCompleted ? '00' : String(minutes).padStart(2, '0')}
					</span>
					<span className='relative bottom-2 mx-4'>:</span>
					<span>
						{session.isCompleted ? '00' : String(seconds).padStart(2, '0')}
					</span>
				</div>
				{settings && (
					<TimerIntervals
						totalSeconds={totalSeconds || 0}
						setTotalSeconds={setTotalSeconds}
						intervalsCount={settings?.intervalsCount}
						isCompleted={session.isCompleted}
					/>
				)}
				<div className='mt-6 flex w-full gap-2'>
					<button
						type='button'
						onClick={handleStart}
						disabled={!!timerRef.current || session.isCompleted}
						className={s.button}
					>
						<TimerIcon className='stroke-white' />
						<span className='text-xl text-white'>Start</span>
					</button>
					<button
						type='button'
						onClick={handleReset}
						className={s.button}
					>
						<TimerReset className='stroke-white' />
						<span className='text-xl text-white'>Reset</span>
					</button>
					<button
						type='button'
						disabled={!timerRef.current}
						onClick={handlePause}
						className={s.button}
					>
						<Pause className='stroke-white' />
						<span className='text-xl text-white'>Pause</span>
					</button>
				</div>
			</div>
		</main>
	);
};
