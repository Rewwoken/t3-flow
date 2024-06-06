import {
	AlarmClock,
	BarChartHorizontalBig,
	CalendarRange,
	ListTodo,
	Settings,
} from 'lucide-react';
import { DASHBOARD } from '@/constants/routes.constants';

export const links = [
	{
		icon: BarChartHorizontalBig,
		route: DASHBOARD.ROOT,
		text: 'Dashboard',
	},
	{
		icon: ListTodo,
		route: DASHBOARD.TASKS_BOARD,
		text: 'Tasks',
	},
	{
		icon: AlarmClock,
		route: DASHBOARD.TIMER,
		text: 'Timer',
	},
	{
		icon: CalendarRange,
		route: DASHBOARD.TIME_BLOCKING,
		text: 'Time Blocking',
	},
	{
		icon: Settings,
		route: DASHBOARD.SETTINGS,
		text: 'Settings',
	},
];
