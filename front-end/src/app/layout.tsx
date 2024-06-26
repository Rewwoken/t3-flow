import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/global.css';
import { Providers } from '@/app/providers';
import { WEBSITE_NAME } from '@/constants/seo.constants';

export const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

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
			suppressHydrationWarning={true} // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
		>
			<body className={clsx(inter.className, 'h-screen overflow-y-hidden p-2')}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
