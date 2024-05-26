import React from 'react';

type TAuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	label: string;
};

// use forwardRef, since register(...) from react-hook-form also returns ref
export const AuthInput = React.forwardRef<HTMLInputElement, TAuthInputProps>(
	({ label, id, ...inputProps }, ref) => {
		return (
			<div className='relative'>
				<label htmlFor={id} className='absolute text-xs bg-bckg -top-2 left-2 px-1'>
					{label}
				</label>
				<input {...inputProps} id={id} ref={ref} className='border p-1' />
			</div>
		);
	},
);
