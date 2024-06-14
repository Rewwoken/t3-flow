import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/global.css';
import Providers from '@/app/providers';
import { WEBSITE_NAME } from '@/constants/seo.constants';

const inter = Inter({ subsets: ['latin'] }); // TODO: change font

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
		<html
			lang='en'
			suppressHydrationWarning={true}
		>
			<body className={clsx(inter.className, 'h-screen overflow-y-hidden p-2')}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
