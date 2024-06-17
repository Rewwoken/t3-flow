'use client';

import { Pause, TimerIcon, TimerReset } from 'lucide-react';
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
		timer,
		totalSeconds,
		handleStart,
		handleReset,
		handlePause,
	} = useTimer();

	const { minutes, seconds } = handleTime(totalSeconds);

	// TODO: add Skeleton
	if (isPending) return <Skeleton />;

	const timerMessage = session?.isCompleted
		? 'Your session has been completed!'
		: !timer
			? 'Your session has been paused!'
			: minutes < settings?.workInterval
				? 'Time to work!'
				: 'Break time!';

	if (!session) {
		return (
			<main className='flex items-center justify-center'>
				<button onClick={() => createSession()}>Create session</button>
			</main>
		);
	}

	return (
		<main className='flex items-center justify-center'>
			<div className='flex w-[500px] flex-col items-center gap-y-1 rounded-md bg-secondary p-5'>
				<header className='flex items-center gap-x-2'>
					<h2 className='text-4xl'>Your timer!</h2>
					<TimerIcon size={37} />
				</header>
				<span>{timerMessage}</span>
				<div className='mt-6 flex w-3/4 items-center justify-center rounded-md bg-muted/10 py-4 text-8xl'>
					<span>{String(minutes).padStart(2, '0')}</span>
					<span className='relative bottom-2 mx-4'>:</span>
					<span>{String(seconds).padStart(2, '0')}</span>
				</div>
				{settings && (
					<TimerIntervals
						intervalsCount={settings?.intervalsCount}
						totalSeconds={totalSeconds || 0}
					/>
				)}
				<div className='mt-6 flex w-full gap-2'>
					<button
						onClick={handleStart}
						disabled={!!timer}
						className={s.button}
					>
						<TimerIcon className='stroke-white' />
						<span className='text-xl text-white'>Start</span>
					</button>
					<button
						onClick={handleReset}
						className={s.button}
					>
						<TimerReset className='stroke-white' />
						<span className='text-xl text-white'>Reset</span>
					</button>
					<button
						disabled={!timer}
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
