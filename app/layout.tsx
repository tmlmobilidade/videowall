/* * */

/* * */

import { Providers } from '@/providers/providers';
import { Inter } from 'next/font/google';
import { type PropsWithChildren } from 'react';

/* * */

import '@/styles/reset.css';
import '@/styles/variables.css';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400', '600', '900'],
});

export const metadata = {
	description: 'Internal Carris Metropolitana dashboard',
	metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
	title: 'CM Videowall',
};

/* * */

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html className={inter.variable}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
