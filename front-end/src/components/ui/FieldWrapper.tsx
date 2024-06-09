import clsx from 'clsx';
import React from 'react';

interface IFormFieldProps extends React.ComponentProps<'label'> {
	label: string;
	error?: string | undefined;
}
export const FieldWrapper = ({
	label,
	error,
	className,
	children,
}: IFormFieldProps) => (
	<div
		className='relative w-full'
		title={label}
	>
		<label
			className={clsx('absolute -top-2 left-2 px-1 text-xs', className, {
				'!text-danger': !!error,
			})}
		>
			{label}
		</label>
		{children}
		<p className='ml-2 text-xs text-danger'>{error}</p>
	</div>
);
