'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/Skeleton';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { authService } from '@/services/auth.service';
import { AUTH } from '@/constants/routes.constants';

export const HeaderButtons = () => {
	const router = useRouter();
	const { data, isPending } = useUser();

	const logOut = async () => {
		await authService.logout();

		router.push(AUTH.LOGIN);
	};

	if (isPending) {
		return <Skeleton className='h-full w-80' />;
	}

	return (
		<ul className='flex items-center gap-x-4'>
			<li className='flex size-12 items-center justify-center rounded-sm bg-accent text-4xl'>
				<span>{data?.profile.name.charAt(0)}</span>
			</li>
			<li className='flex flex-col justify-center'>
				<span className='font-semibold'>{data?.profile.name}</span>
				<span className='text-muted'>{data?.profile.email}</span>
			</li>
			<li>
				<ThemeSwitcher
					size={40}
					className='my-1'
				/>
			</li>
			<li
				className='cursor-pointer transition-all active:scale-90'
				onClick={logOut}
			>
				<LogOut
					size={40}
					strokeWidth={1}
				/>
			</li>
		</ul>
	);
};
