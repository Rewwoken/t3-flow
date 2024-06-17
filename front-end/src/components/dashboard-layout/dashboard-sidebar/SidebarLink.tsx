'use client';

import clsx from 'clsx';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
	sidebarWidth: number;
	route: string;
	text: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
}
export const SidebarLink = ({
	sidebarWidth,
	route,
	icon: Icon,
	text,
}: SidebarLinkProps) => {
	const pathname = usePathname();

	return (
		<li
			className={clsx('select-none border-l-2 py-1 pl-3 hover:bg-secondary', {
				'border-l-transparent': pathname !== route,
				'border-l-accent bg-muted/10': pathname === route,
			})}
		>
			<Link
				href={route}
				className='flex items-center gap-2 py-1'
			>
				<Icon
					strokeWidth={1}
					size={50}
				/>
				{sidebarWidth >= 240 && <span className='text-xl'>{text}</span>}
			</Link>
		</li>
	);
};
