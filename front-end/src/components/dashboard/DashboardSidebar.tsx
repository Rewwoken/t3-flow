'use client';

import clsx from 'clsx';
import {
	AlarmClock,
	BarChartHorizontalBig,
	CalendarRange,
	ListTodo,
	Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from '@/components/dashboard/index.module.css';
import { DASHBOARD } from '@/constants/routes.constants';

export const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<aside className='border-r'>
			<ul className='space-y-3 py-4'>
				<li className={clsx(s.link, { [s.active]: pathname === DASHBOARD.ROOT })}>
					<Link href={DASHBOARD.ROOT} className='flex items-center gap-2 py-1'>
						<BarChartHorizontalBig strokeWidth={1} size={40} />
						<span className='text-xl'>Dashboard</span>
					</Link>
				</li>
				<li className={clsx(s.link, { [s.active]: pathname === DASHBOARD.TASKS })}>
					<Link href={DASHBOARD.TASKS} className='flex items-center gap-2 py-1'>
						<ListTodo strokeWidth={1} size={40} />
						<span className='text-xl'>Tasks</span>
					</Link>
				</li>
				<li className={clsx(s.link, { [s.active]: pathname === DASHBOARD.TIMER })}>
					<Link href={DASHBOARD.TIMER} className='flex items-center gap-2 py-1'>
						<AlarmClock strokeWidth={1} size={40} />
						<span className='text-xl'>Timer</span>
					</Link>
				</li>
				<li
					className={clsx(s.link, { [s.active]: pathname === DASHBOARD.TIME_BLOCKING })}
				>
					<Link href={DASHBOARD.TIME_BLOCKING} className='flex items-center gap-2 py-1'>
						<CalendarRange strokeWidth={1} size={40} />
						<span className='text-xl'>Time Blocking</span>
					</Link>
				</li>
				<li className={clsx(s.link, { [s.active]: pathname === DASHBOARD.SETTINGS })}>
					<Link href={DASHBOARD.SETTINGS} className='flex items-center gap-2 py-1'>
						<Settings strokeWidth={1} size={40} />
						<span className='text-xl'>Settings</span>
					</Link>
				</li>
			</ul>
		</aside>
	);
};
