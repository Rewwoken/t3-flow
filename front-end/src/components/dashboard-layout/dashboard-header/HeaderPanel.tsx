'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/Skeleton';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { authService } from '@/services/auth.service';
import { AUTH } from '@/constants/routes.constants';

export const HeaderPanel = () => {
	const router = useRouter();
	const { data: user, isPending } = useUser();

	const logOut = async () => {
		await authService.logout();

		router.push(AUTH.LOGIN);
	};

	if (isPending) {
		return (
			<div className='flex h-14 items-center gap-x-4'>
				<Skeleton className='size-12 rounded-sm' />
				<div className='flex w-40 flex-col justify-center gap-y-2'>
					<Skeleton className='h-4 w-3/4 rounded-sm' />
					<Skeleton className='h-4 w-full rounded-sm' />
				</div>
				<Skeleton className='size-11 rounded-md' />
				<Skeleton className='size-11 rounded-md' />
			</div>
		);
	}

	return (
		<ul className='flex h-14 items-center gap-x-4'>
			<li className='flex size-12 items-center justify-center rounded-sm bg-primary text-4xl'>
				<span className='select-none text-white'>
					{user?.name?.charAt(0).toUpperCase() || 'A'}
				</span>
			</li>
			<li className='flex flex-col justify-center'>
				<span className='font-semibold'>{user?.name || 'Anonymous'}</span>
				<span className='text-muted'>{user?.email}</span>
			</li>
			<li>
				<ThemeSwitcher
					size={44}
					className='my-1'
				/>
			</li>
			<li>
				<button onClick={logOut}>
					<LogOut
						size={44}
						strokeWidth={1}
					/>
				</button>
			</li>
		</ul>
	);
};
