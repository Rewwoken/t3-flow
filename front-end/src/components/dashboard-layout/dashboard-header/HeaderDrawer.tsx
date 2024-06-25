'use client';

import { Button, ButtonGroup, Divider, Drawer } from '@mui/material';
import clsx from 'clsx';
import { LogOut, Moon, SlidersHorizontal, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useUser } from '@/components/dashboard-layout/dashboard-header/hooks/useUser';
import { authService } from '@/services/auth.service';
import { AUTH } from '@/constants/routes.constants';

export const HeaderDrawer = () => {
	const [open, setOpen] = React.useState(false);
	const { data: user, isPending } = useUser();
	const { theme, setTheme } = useTheme();
	const router = useRouter();

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const logOut = async () => {
		await authService.logout();

		router.push(AUTH.LOGIN);
	};

	return (
		<>
			<Button
				onClick={toggleDrawer(true)}
				variant='text'
			>
				<SlidersHorizontal className='stroke-foreground' />
			</Button>
			<Drawer
				open={open}
				anchor='right'
				onClose={toggleDrawer(false)}
			>
				<aside className='relative h-full w-72 bg-background'>
					<h2 className='p-2 text-xl'>Account</h2>
					<Divider className='mb-3' />
					<ul className='grid grid-cols-[auto,1fr] grid-rows-2 gap-x-2 p-4'>
						<li className='row-span-2 flex size-11 items-center justify-center rounded-sm bg-primary'>
							<span className='m-auto select-none text-4xl text-white'>
								{user?.name?.charAt(0).toUpperCase() || 'A'}
							</span>
						</li>
						<li>{user?.name || 'Anonymous'}</li>
						<li className='text-muted'>{user?.email}</li>
					</ul>
					<h2 className='p-2 text-xl'>Settings</h2>
					<Divider className='mb-3' />
					<ul className='flex flex-col p-4'>
						<ButtonGroup
							component='li'
							variant='contained'
						>
							<Button
								title='Set light theme'
								onClick={() => setTheme('light')}
								disabled={theme === 'light'}
								className='w-full'
							>
								<Sun
									size={27}
									className={clsx({ 'stroke-white': theme !== 'light' })}
								/>
							</Button>
							<Button
								title='Set dark theme'
								onClick={() => setTheme('dark')}
								disabled={theme === 'dark'}
								className='w-full'
							>
								<Moon
									size={27}
									className={clsx({ 'stroke-white': theme !== 'dark' })}
								/>
							</Button>
						</ButtonGroup>
					</ul>
					<Button
						onClick={logOut}
						className='absolute bottom-2 flex w-full items-center gap-x-2'
						variant='text'
					>
						<span className='whitespace-nowrap text-lg'>Log Out</span>
						<LogOut size={23} />
					</Button>
				</aside>
			</Drawer>
		</>
	);
};
