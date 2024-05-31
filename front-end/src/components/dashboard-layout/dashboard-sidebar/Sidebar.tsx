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
			<ul className='mb-2 text-sm text-muted/90'>
				<li>
					<span>Made by&nbsp;</span>
					<Link
						href='https://github.com/Rewwoken'
						target='_blank'
						className='text-muted hover:underline'
					>
						Rewwoken
					</Link>
				</li>
				<li className='text-center text-muted'>
					<Link
						href='https://github.com/Rewwoken/horizon'
						target='_blank'
						className='text-muted hover:underline'
					>
						Open source
					</Link>
				</li>
			</ul>
		</aside>
	);
};
