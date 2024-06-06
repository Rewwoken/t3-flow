import clsx from 'clsx';
import React from 'react';

interface IFormFieldProps extends React.ComponentProps<'label'> {
	label: string;
	message?: string | undefined;
}
export const FieldWrapper = ({
	label,
	message,
	className,
	children,
	...props
}: IFormFieldProps) => (
	<div className='relative w-full'>
		<label
			{...props}
			className={clsx('absolute -top-2 left-2 px-1 text-xs', className, {
				'text-danger': !!message,
			})}
		>
			{label}
		</label>
		{children}
		<p className='ml-2 text-xs text-danger'>{message}</p>
	</div>
);
