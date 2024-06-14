import { Header } from '@/components/dashboard-layout/dashboard-header/Header';
import { Sidebar } from '@/components/dashboard-layout/dashboard-sidebar/Sidebar';
import s from '@/components/dashboard-layout/layout.module.css';

export const Layout = ({ children }: React.PropsWithChildren) => (
	<div className={s.layout}>
		<Header />
		<Sidebar />
		<main className={s.main}>{children}</main>
	</div>
);
