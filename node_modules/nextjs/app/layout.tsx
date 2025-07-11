import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/providers/query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Hercules Gym - Stronger Every Day | Personal Training & Fitness Programs',
	description:
		'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities. Join Hercules Gym today and start your journey to a stronger, healthier you.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='scroll-smooth'>
			<body
				className={cn(
					inter.className,
					'min-h-screen bg-black text-white antialiased flex flex-col'
				)}
			>
				<QueryProvider>
					<NavigationWrapper>
						{children}
					</NavigationWrapper>
					<Toaster
						theme='dark'
						position='top-center'
						richColors
						closeButton
						expand={true}
						duration={4000}
					/>
				</QueryProvider>
			</body>
		</html>
	);
}
