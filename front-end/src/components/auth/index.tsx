import { Loader } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import React from 'react';

const AuthWrapper = ({ children }: React.PropsWithChildren) => (
	<div className='border p-1 flex flex-col items-center'>{children}</div>
);

const AuthHeading = ({ children }: React.PropsWithChildren) => (
	<h1 className='text-xl'>{children}</h1>
);

const AuthForm = ({ children, ...props }: React.ComponentPropsWithoutRef<'form'>) => (
	<form {...props} className='flex flex-col gap-y-2 my-2'>
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
			<label htmlFor={props.id} className='absolute text-xs bg-bckg -top-2 left-2 px-1'>
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
		<span className='w-full px-1 p-0.5 bg-red-500/30 text-red-500 rounded-md'>
			{children}
		</span>
	);
};

const AuthSubmit = ({
	isLoading,
	children,
}: React.ComponentProps<'button'> & { isLoading: boolean }) => (
	<button disabled={isLoading} type='submit' className='border py-1 w-full text-center'>
		{isLoading ? <Loader size={24} className='animate-spin mx-auto' /> : children}
	</button>
);

const AuthLink = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => (
	<Link {...props} className='text-sm self-start hover:underline'>
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
