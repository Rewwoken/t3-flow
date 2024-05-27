import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
	return <main className='flex h-full items-center justify-center'>{children}</main>;
}
