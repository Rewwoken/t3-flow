import clsx from 'clsx';
import { Loader } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import { forwardRef } from 'react';

const AuthWrapper = ({ children }: React.PropsWithChildren) => (
	<div className='rounded-md border p-4'>{children}</div>
);

const AuthHeading = ({ children }: React.PropsWithChildren) => (
	<h1 className='mb-6 w-full border-b-2 border-b-accent text-center text-xl font-semibold'>
		{children}
	</h1>
);

const AuthForm = ({ children, ...props }: React.ComponentProps<'form'>) => (
	<form {...props} className='my-2 flex flex-col gap-y-3'>
		{children}
	</form>
);

// use forwardRef, since register(...) from react-hook-form returns ref
const AuthField = forwardRef<
	HTMLInputElement,
	React.ComponentProps<'input'> & {
		label: string;
		message: string | undefined;
		id: string;
	}
>(function AuthField({ label, message, ...props }, ref) {
	return (
		<div className='relative'>
			<label
				htmlFor={props.id}
				className={clsx('absolute -top-2 left-2 bg-background px-1 text-xs', {
					'text-danger': !!message,
				})}
			>
				{label}
			</label>
			<input
				{...props}
				ref={ref}
				className={clsx('rounded-sm border p-1 outline-accent', {
					'border-danger': !!message,
				})}
			/>
			<p className='ml-2 text-xs text-danger'>{message}</p>
		</div>
	);
});

const AuthMessage = ({ children }: React.PropsWithChildren) => {
	if (!children) return null;

	return (
		<span className='w-full rounded-sm bg-danger/20 p-0.5 px-1 text-danger'>
			{children}
		</span>
	);
};

const AuthSubmit = ({
	isLoading,
	isValid,
	children,
}: React.PropsWithChildren & { isLoading: boolean; isValid: boolean }) => (
	<button
		disabled={isLoading || !isValid}
		type='submit'
		className={clsx(
			'w-full rounded-sm border py-1 text-antiAccent text-white transition-all duration-100 active:scale-95',
			{
				'bg-secondary/10 text-secondary/80': isLoading || !isValid,
				'border-accent bg-accent/70 hover:bg-accent': !isLoading && isValid,
			},
		)}
	>
		{isLoading ? <Loader size={24} className='mx-auto animate-spin' /> : children}
	</button>
);

const AuthLink = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => (
	<Link {...props} className='text-sm text-secondary hover:underline'>
		{children}
	</Link>
);

export default Object.assign(AuthWrapper, {
	Heading: AuthHeading,
	Form: AuthForm,
	Field: AuthField,
	Message: AuthMessage,
	Submit: AuthSubmit,
	Link: AuthLink,
});
