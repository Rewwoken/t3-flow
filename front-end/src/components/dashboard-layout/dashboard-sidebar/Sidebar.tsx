'use client';

import Link from 'next/link';
import React, { DragEventHandler } from 'react';
import { SidebarLink } from '@/components/dashboard-layout/dashboard-sidebar/SidebarLink';
import { links } from '@/components/dashboard-layout/dashboard-sidebar/sidebar.data';
import { DASHBOARD } from '@/constants/routes.constants';

export const Sidebar = () => {
	const [width, setWidth] = React.useState(250);

	React.useEffect(() => {
		const widthFromStorage = localStorage.getItem('sidebar-width');

		if (widthFromStorage) {
			setWidth(Number(widthFromStorage));
		}
	}, []);

	const onDragStart: DragEventHandler<HTMLDivElement> = (e) => {
		e.dataTransfer.setDragImage(new Image(), 0, 0); // Empty image
	};

	const onDrag: DragEventHandler<HTMLDivElement> = (e) => {
		const { pageX } = e;

		if (!pageX) return null;

		if (pageX >= 250 && pageX <= 1000) {
			setWidth(pageX);
		} else if (pageX < 250) {
			setWidth(85);
		}
	};

	const onDragEnd: DragEventHandler<HTMLDivElement> = () => {
		localStorage.setItem('sidebar-width', String(width));
	};

	return (
		<aside
			style={{ width }}
			className='relative flex flex-col items-center justify-center'
		>
			<Link
				href={DASHBOARD.ABOUT}
				className='absolute top-2 text-sm'
			>
				About
			</Link>
			<nav className='flex size-full flex-col justify-center'>
				<ul className='w-full space-y-8'>
					{links.map((linkProps) => (
						<SidebarLink
							key={linkProps.route}
							sidebarWidth={width}
							{...linkProps}
						/>
					))}
				</ul>
			</nav>
			<small className='absolute bottom-2 text-center text-xs'>
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
			<div
				className='group absolute -right-3 h-[98%] w-2 hover:cursor-e-resize'
				draggable={true}
				onDragStart={onDragStart}
				onDrag={onDrag}
				onDragEnd={onDragEnd}
			>
				<div className='h-full w-0.5 delay-100 group-hover:bg-white'></div>
			</div>
		</aside>
	);
};
