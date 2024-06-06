import { Header } from '@/components/dashboard-layout/dashboard-header/Header';
import { Sidebar } from '@/components/dashboard-layout/dashboard-sidebar/Sidebar';

export const Layout = ({ children }: React.PropsWithChildren) => (
	<div className='grid h-full grid-cols-[auto_1fr] grid-rows-[auto_1fr]'>
		<Header />
		<Sidebar />
		<main className='overflow-x-scroll p-2'>{children}</main>
	</div>
);
