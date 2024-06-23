'use client';

import { Tab, Tabs } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { links } from '@/components/dashboard-layout/dashboard-sidebar/sidebar.data';
import { ROOT } from '@/constants/routes.constants';

export const Sidebar = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<aside className='flex flex-col justify-between py-2'>
			<Link
				href={ROOT.BASE_URL}
				className='text-center text-sm hover:underline'
			>
				Main
			</Link>
			<Tabs
				orientation='vertical'
				value={pathname}
			>
				{links.map(({ route, label }) => (
					<Tab
						key={route}
						label={label}
						value={route}
						onClick={() => router.push(route)}
						className={clsx('hover:bg-secondary', {
							'bg-secondary': pathname === route,
						})}
					/>
				))}
			</Tabs>
			<small className='text-center text-xs'>
				<span>Made by&nbsp;</span>
				<Link
					href='https://github.com/Rewwoken'
					target='_blank'
					className='text-muted hover:underline'
				>
					Rewwoken
				</Link>
				<br />
				<Link
					href='https://github.com/Rewwoken/horizon'
					target='_blank'
					className='text-muted hover:underline'
				>
					Open source
				</Link>
			</small>
		</aside>
	);
};
