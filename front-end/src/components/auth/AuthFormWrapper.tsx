import Link from 'next/link';
import { PropsWithChildren } from 'react';

type TAuthFormWrapperProps = React.FormHTMLAttributes<HTMLFormElement> & {
	headingText: string;
	buttonText: string;
	linkHref: string;
	linkText: string;
};

export const AuthFormWrapper = ({
	children,
	headingText,
	buttonText,
	linkHref,
	linkText,
	...formProps
}: PropsWithChildren<TAuthFormWrapperProps>) => {
	return (
		<div className='border p-1'>
			<form {...formProps} className='flex flex-col items-center gap-y-4'>
				<h1 className='text-xl'>{headingText}</h1>
				{
					/* ... auth inputs */
					children
				}
				<button type='submit' className='border px-1 self-end'>
					{buttonText}
				</button>
			</form>
			<Link href={linkHref} className='text-sm self-start hover:underline'>
				{linkText}
			</Link>
		</div>
	);
};
