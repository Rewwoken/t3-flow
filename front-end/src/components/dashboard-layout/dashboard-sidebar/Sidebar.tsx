'use client';

import { Pin, PinOff } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { SidebarLink } from '@/components/dashboard-layout/dashboard-sidebar/SidebarLink';
import { links } from '@/components/dashboard-layout/dashboard-sidebar/sidebar.data';
import { DASHBOARD } from '@/constants/routes.constants';

export const Sidebar = () => {
	const [isPinned, setIsPinned] = React.useState(false);

	const pin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// TODO: pin sidebar logic
		setIsPinned((prev) => !prev);
	};

	return (
		<aside className='flex min-w-60 flex-col items-center justify-between border-r'>
			<div className='flex w-full items-center justify-between p-4'>
				<Link
					href={DASHBOARD.ABOUT}
					className='text-muted hover:underline'
				>
					About
				</Link>
				<button
					type='button'
					title='Toggle sidebar resize'
					onClick={pin}
				>
					{isPinned ? (
						<PinOff className='stroke-muted' />
					) : (
						<Pin className='stroke-muted' />
					)}
				</button>
			</div>
			<nav className='flex h-full flex-col justify-center'>
				<ul className='space-y-8 py-4'>
					{links.map((linkProps) => (
						<SidebarLink
							key={linkProps.route}
							{...linkProps}
						/>
					))}
				</ul>
			</nav>
			<small className='mb-2 text-center text-xs'>
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
