import { Loader } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import React from 'react';

const AuthWrapper = ({ children }: React.PropsWithChildren) => (
	<div className='flex flex-col items-center border p-1'>{children}</div>
);

const AuthHeading = ({ children }: React.PropsWithChildren) => (
	<h1 className='text-xl'>{children}</h1>
);

const AuthForm = ({ children, ...props }: React.ComponentPropsWithoutRef<'form'>) => (
	<form {...props} className='my-2 flex flex-col gap-y-2'>
		{children}
	</form>
);

// use forwardRef, since register(...) from react-hook-form returns ref
const AuthInput = React.forwardRef<
	HTMLInputElement,
	React.ComponentPropsWithoutRef<'input'> & {
		label: string;
		message: string | undefined;
		id: string;
	}
>(function AuthInput({ label, message, ...props }, ref) {
	return (
		<div className='relative'>
			<label htmlFor={props.id} className='absolute -top-2 left-2 bg-bckg px-1 text-xs'>
				{label}
			</label>
			<input {...props} ref={ref} className='border p-1' />
			<p className='text-xs text-red-500'>{message}</p>
		</div>
	);
});

const AuthMessage = ({ children }: React.PropsWithChildren) => {
	if (!children) return null;

	return (
		<span className='w-full rounded-md bg-red-500/30 p-0.5 px-1 text-red-500'>
			{children}
		</span>
	);
};

const AuthSubmit = ({
	isLoading,
	children,
}: React.ComponentProps<'button'> & { isLoading: boolean }) => (
	<button disabled={isLoading} type='submit' className='w-full border py-1 text-center'>
		{isLoading ? <Loader size={24} className='mx-auto animate-spin' /> : children}
	</button>
);

const AuthLink = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => (
	<Link {...props} className='self-start text-sm hover:underline'>
		{children}
	</Link>
);

export const Auth = Object.assign(AuthWrapper, {
	Heading: AuthHeading,
	Form: AuthForm,
	Input: AuthInput,
	Message: AuthMessage,
	Submit: AuthSubmit,
	Link: AuthLink,
});
