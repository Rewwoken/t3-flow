'use client';

import {
	AlarmClock,
	BarChartHorizontalBig,
	CalendarRange,
	ListTodo,
	Settings,
} from 'lucide-react';
import Link from 'next/link';
import { DASHBOARD } from '@/constants/routes.constants';
import { SidebarLink } from './SidebarLink';

export const Sidebar = () => {
	return (
		<aside className='flex flex-col items-center justify-between border-r'>
			<nav>
				<ul className='py-4'>
					<SidebarLink
						icon={BarChartHorizontalBig}
						route={DASHBOARD.ROOT}
						text='Dashboard'
					/>
					<SidebarLink
						icon={ListTodo}
						route={DASHBOARD.TASKS}
						text='Tasks'
					/>
					<SidebarLink
						icon={AlarmClock}
						route={DASHBOARD.TIMER}
						text='Timer'
					/>
					<SidebarLink
						icon={CalendarRange}
						route={DASHBOARD.TIME_BLOCKING}
						text='Time Blocking'
					/>
					<SidebarLink
						icon={Settings}
						route={DASHBOARD.SETTINGS}
						text='Settings'
					/>
				</ul>
			</nav>
			<p className='mb-2 text-sm text-muted/90'>
				Made by&nbsp;
				<Link
					href='https://github.com/Rewwoken'
					target='_blank'
					className='text-muted hover:underline'
				>
					Rewwoken
				</Link>
			</p>
		</aside>
	);
};
