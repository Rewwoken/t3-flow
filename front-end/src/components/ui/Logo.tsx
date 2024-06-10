import clsx from 'clsx';

export const Logo = ({ className, ...props }: React.ComponentProps<'svg'>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 256 271'
			className={clsx('select-none fill-text', className)}
			{...props}
		>
			<path d='M215.907 38.502 256 61.648v147.837l-106.71 61.564v-46.236l66.617-38.474V38.502ZM149.289 0l40.093 23.146V174.11l-40.093 23.118v-43.64h-42.578v117.405l-40.093-23.202V96.94l40.093-23.146v43.946h42.578V0Zm-42.578 0v46.236L40.093 84.71v147.837L0 209.401V61.564L106.71 0Z' />
		</svg>
	);
};
