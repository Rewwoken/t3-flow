import Link from 'next/link';
import { HeaderDrawer } from '@/components/dashboard-layout/dashboard-header/HeaderDrawer';
import { Logo } from '@/components/ui/Logo';
import { DASHBOARD } from '@/constants/routes.constants';
import { WEBSITE_NAME } from '@/constants/seo.constants';

export const Header = () => {
	return (
		<header className='col-start-1 col-end-3 flex items-center justify-between px-12 py-4'>
			<h1>
				<Link
					href={DASHBOARD.CHARTS}
					className='flex items-center gap-2'
				>
					<Logo className='size-10 fill-foreground' />
					<span className='text-2xl'>{WEBSITE_NAME}</span>
				</Link>
			</h1>
			<HeaderDrawer />
		</header>
	);
};
