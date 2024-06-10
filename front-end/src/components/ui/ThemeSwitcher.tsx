'use client';

import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Skeleton } from './Skeleton';

export const ThemeSwitcher = ({
	className,
	size,
}: React.ComponentProps<'svg'> & { size: number }) => {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

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
			<Moon
				size={size}
				strokeWidth={1}
				onClick={() => setTheme('light')}
				className={clsx(className, 'cursor-pointer select-none')}
			/>
		);

	if (resolvedTheme === 'light')
		return (
			<Sun
				size={size}
				strokeWidth={1}
				onClick={() => setTheme('dark')}
				className={clsx(className, 'cursor-pointer select-none')}
			/>
		);
};
