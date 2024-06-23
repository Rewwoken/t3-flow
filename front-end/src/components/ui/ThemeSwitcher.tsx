'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';
import { Skeleton } from './Skeleton';

export const ThemeSwitcher = ({
	className,
	size,
}: React.ComponentProps<'svg'> & { size: number }) => {
	const [mounted, setMounted] = React.useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	React.useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<Skeleton
				className={className}
				style={{ width: size, height: size }}
			/>
		);
	}

	if (resolvedTheme === 'dark')
		return (
			<button
				onClick={() => setTheme('light')}
				className={className}
				title='Toggle theme'
			>
				<Moon
					size={size}
					strokeWidth={1}
					className='cursor-pointer select-none'
				/>
			</button>
		);

	if (resolvedTheme === 'light')
		return (
			<button
				onClick={() => setTheme('dark')}
				className={className}
				title='Toggle theme'
			>
				<Sun
					size={size}
					strokeWidth={1}
					className='cursor-pointer select-none'
				/>
			</button>
		);
};
