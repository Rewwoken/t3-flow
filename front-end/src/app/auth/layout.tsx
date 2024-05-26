import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
	return <main className='flex justify-center items-center h-full'>{children}</main>;
}
