'use client';

import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Skeleton } from '@/components/ui/Skeleton';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import s from '@/styles/dashboard.module.css';
import { authService } from '@/services/auth.service';
import { AUTH, DASHBOARD } from '@/constants/routes.constants';
import { WEBSITE_NAME } from '@/constants/seo.constants';
import { useProfile } from '@/hooks/useProfile';

export const DashBoardHeader = () => {
	const router = useRouter();
	const { data, isLoading } = useProfile();

	const logOut = async () => {
		await authService.logout();

		router.push(AUTH.LOGIN);
	};

	return (
		<header
			className={clsx(s.header, 'flex items-center justify-between border-b px-12 py-4')}
		>
			<h1>
				<Link href={DASHBOARD.ROOT} className='flex items-center gap-2'>
					<Logo className='size-14 fill-text' />
					<span className='text-2xl'>{WEBSITE_NAME}</span>
				</Link>
			</h1>
			{isLoading ? (
				<Skeleton className='h-full w-80' />
			) : (
				<ul className='flex items-center gap-x-4'>
					<li className='flex size-12 items-center justify-center rounded-sm bg-accent text-4xl'>
						<span>{data?.profile.name.charAt(0)}</span>
					</li>
					<li className='flex flex-col justify-center'>
						<span className='font-semibold'>{data?.profile.name}</span>
						<span className='text-secondary'>{data?.profile.email}</span>
					</li>
					<li>
						<ThemeSwitcher size={40} className='my-1' />
					</li>
					<li className='cursor-pointer transition-all active:scale-90' onClick={logOut}>
						<LogOut size={40} strokeWidth={1} />
					</li>
				</ul>
			)}
		</header>
	);
};
