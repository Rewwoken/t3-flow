import React from 'react';

type TAuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	label: string;
};

// use forwardRef, since register(...) from react-hook-form returns ref
export const AuthInput = React.forwardRef<HTMLInputElement, TAuthInputProps>(
	function AuthInput({ label, ...props }, ref) {
		return (
			<div className='relative'>
				<label htmlFor={props.id} className='absolute text-xs bg-bckg -top-2 left-2 px-1'>
					{label}
				</label>
				<input {...props} ref={ref} className='border p-1' />
			</div>
		);
	},
);
