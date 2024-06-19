import { ChevronLeft, ChevronRight } from 'lucide-react';
import { handleTime } from '@/components/dashboard-timer/utils/handleTime';

interface TimerIntervalsProps {
	totalSeconds: number;
	setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
	intervalsCount: number;
	isCompleted: boolean;
}
export const TimerIntervals = ({
	totalSeconds,
	setTotalSeconds,
	intervalsCount,
	isCompleted,
}: TimerIntervalsProps) => {
	const { hours, minutes, seconds } = handleTime(totalSeconds);
	const completedIntervals = hours;
	const restIntervals = intervalsCount - completedIntervals;

	const moveBack = () => {
		setTotalSeconds((prev) => prev - 60 * 5);
	};

	const moveForward = () => {
		setTotalSeconds((prev) => prev + 60 * 5);
	};

	return (
		<div className='mt-4 flex w-full items-center gap-x-4'>
			<button onClick={moveBack}>
				<ChevronLeft />
			</button>
			<ol className='flex w-full justify-between gap-x-2'>
				{completedIntervals >= 1 &&
					new Array(completedIntervals).fill(null).map((_, index) => (
						<li
							key={index}
							className='size-6 rounded-md border-2 border-primary bg-primary'
						/>
					))}
				{!isCompleted && (
					<li className='size-6 rounded-md border-2 border-accent'>
						<div
							style={{ width: (minutes / 60) * 100 + '%' }}
							className='h-full rounded-l-sm bg-accent'
						></div>
					</li>
				)}
				{restIntervals - 1 >= 1 &&
					new Array(restIntervals - 1).fill(null).map((_, index) => (
						<li
							key={index}
							className='size-6 rounded-md border-2 border-primary'
						/>
					))}
			</ol>
			<button onClick={moveForward}>
				<ChevronRight />
			</button>
		</div>
	);
};
