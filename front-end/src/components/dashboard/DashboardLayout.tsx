import clsx from 'clsx';
import { DashBoardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import s from '@/components/dashboard/index.module.css';

export const DashboardLayout = ({ children }: React.PropsWithChildren) => (
	<div className={clsx(s.layout, 'h-full')}>
		<DashBoardHeader />
		<DashboardSidebar />
		<main>{children}</main>
	</div>
);
