import clsx from 'clsx';
import { forwardRef } from 'react';
import s from '@/components/settings/settings.module.css';

// use forwardRef, since register(...) from react-hook-form returns ref
export const SettingsField = forwardRef<
	HTMLInputElement,
	React.ComponentProps<'input'> & {
		label: string;
		message: string | undefined;
		id: string;
	}
>(function SettingsField({ label, message, ...inputProps }, ref) {
	return (
		<div className='relative'>
			<label
				htmlFor={inputProps.id}
				className={clsx(s.label, { 'text-danger': !!message })}
			>
				{label}
			</label>
			<input
				{...inputProps}
				ref={ref}
				className={clsx(s.input, { 'border-danger': !!message })}
			/>
			{message && <p className={s.error}>{message}</p>}
		</div>
	);
});
