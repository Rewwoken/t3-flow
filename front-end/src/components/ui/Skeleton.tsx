import clsx from 'clsx';

export const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={clsx('animate-pulse rounded-md bg-secondary/20', className)}
		{...props}
	/>
);
