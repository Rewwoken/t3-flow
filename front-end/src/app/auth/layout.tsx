import { PropsWithChildren } from 'react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<>
			<ThemeSwitcher
				size={40}
				className='absolute right-2 top-2'
			/>
			<main className='flex h-screen items-center justify-center'>
				{children}
			</main>
		</>
	);
}
