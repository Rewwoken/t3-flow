import { handleTime } from '@/components/dashboard-timer/utils/handleTime';

interface TimerIntervalsProps {
	totalSeconds: number;
	intervalsCount: number;
}
export const TimerIntervals = ({
	totalSeconds,
	intervalsCount,
}: TimerIntervalsProps) => {
	const { hours, minutes, seconds } = handleTime(totalSeconds);
	const completedIntervals = hours;
	const restIntervals = intervalsCount - completedIntervals;

	return (
		<ol className='mt-6 flex w-full justify-between gap-x-2'>
			{completedIntervals >= 1 &&
				new Array(completedIntervals).fill(null).map((_, index) => (
					<li
						key={index}
						className='size-6 rounded-md border-2 border-primary bg-primary'
					/>
				))}
			<li className='size-6 rounded-md border-2 border-accent'>
				<div
					style={{ width: (minutes / 60) * 100 + '%' }}
					className='h-full rounded-l-sm bg-accent'
				></div>
			</li>
			{restIntervals - 1 >= 1 &&
				new Array(restIntervals - 1).fill(null).map((_, index) => (
					<li
						key={index}
						className='size-6 rounded-md border-2 border-primary'
					/>
				))}
		</ol>
	);
};
