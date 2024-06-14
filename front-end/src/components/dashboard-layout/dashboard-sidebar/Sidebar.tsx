'use client';

import Link from 'next/link';
import React from 'react';
import { SidebarLink } from '@/components/dashboard-layout/dashboard-sidebar/SidebarLink';
import { links } from '@/components/dashboard-layout/dashboard-sidebar/sidebar.data';
import { DASHBOARD } from '@/constants/routes.constants';

export const Sidebar = () => {
	const [width, setWidth] = React.useState();

	return (
		<aside className='flex min-w-60 flex-col items-center justify-between py-2'>
			<Link
				href={DASHBOARD.ABOUT}
				className='text-sm'
			>
				About
			</Link>
			<nav className='flex size-full flex-col justify-center'>
				<ul className='w-full space-y-8'>
					{links.map((linkProps) => (
						<SidebarLink
							key={linkProps.route}
							{...linkProps}
						/>
					))}
				</ul>
			</nav>
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
