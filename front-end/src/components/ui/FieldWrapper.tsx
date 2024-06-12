import clsx from 'clsx';
import React from 'react';

interface IFormFieldProps extends React.ComponentProps<'label'> {
	label: string;
	htmlFor: string;
	error?: string | undefined;
}
export const FieldWrapper = ({
	label,
	error,
	className,
	children,
	htmlFor,
}: IFormFieldProps) => (
	<div
		className='relative w-full'
		title={label}
	>
		<label
			htmlFor={htmlFor}
			className={clsx(
				'absolute -top-2 left-2 select-none px-1 text-xs',
				className,
				{
					'!text-danger': !!error,
				},
			)}
		>
			{label}
		</label>
		{children}
		<p className='ml-2 text-xs text-danger'>{error}</p>
	</div>
);
