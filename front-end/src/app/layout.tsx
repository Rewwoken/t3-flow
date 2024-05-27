import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WEBSITE_NAME } from '@/constants/seo.constants';
import '@/app/globals.css';
import Providers from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	icons: '/logo.svg',
	title: {
		default: WEBSITE_NAME,
		template: `%s | ${WEBSITE_NAME}`,
	},
	description: 'A website for planning your time with ease.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={clsx(inter.className, 'h-screen overflow-hidden')}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
