'use client';

import clsx from 'clsx';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
	route: string;
	text: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
}

export const SidebarLink = ({ route, icon: Icon, text }: SidebarLinkProps) => {
	const pathname = usePathname();

	return (
		<li
			className={clsx('border-l-2 px-2 py-1 hover:bg-muted/10', {
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
					size={40}
				/>
				<span className='text-xl'>{text}</span>
			</Link>
		</li>
	);
};
