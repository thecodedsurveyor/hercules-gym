import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import Footer from '@/components/landing/Footer';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/providers/query-provider';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Optimize font loading with proper subsets and display
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
});

export const metadata: Metadata = {
	title: 'Hercules Gym - Stronger Every Day | Personal Training & Fitness Programs',
	description:
		'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities. Join Hercules Gym today and start your journey to a stronger, healthier you.',
	keywords:
		'gym, fitness, personal training, workout, health, exercise, bodybuilding, cardio, weight lifting',
	authors: [{ name: 'Hercules Gym' }],
	creator: 'Hercules Gym',
	publisher: 'Hercules Gym',
	robots: 'index, follow',
	openGraph: {
		title: 'Hercules Gym - Stronger Every Day',
		description:
			'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities.',
		type: 'website',
		locale: 'en_US',
		siteName: 'Hercules Gym',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Hercules Gym - Stronger Every Day',
		description:
			'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities.',
	},
	viewport:
		'width=device-width, initial-scale=1, maximum-scale=1',
	themeColor: '#000000',
	manifest: '/manifest.json',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='scroll-smooth'>
			<head>
				{/* Preload critical resources */}
				<link
					rel='preconnect'
					href='https://fonts.googleapis.com'
				/>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					rel='dns-prefetch'
					href='//images.unsplash.com'
				/>
				<link
					rel='dns-prefetch'
					href='//picsum.photos'
				/>
				<link
					rel='dns-prefetch'
					href='//images.pexels.com'
				/>

				{/* Resource hints for better performance */}
				<link
					rel='preload'
					href='/api/dashboard'
					as='fetch'
					crossOrigin='anonymous'
				/>
				<link
					rel='preload'
					href='/api/challenges'
					as='fetch'
					crossOrigin='anonymous'
				/>

				{/* Preload critical routes */}
				<link rel='prefetch' href='/dashboard' />
				<link rel='prefetch' href='/programs' />
				<link rel='prefetch' href='/about' />

				{/* Preload critical images */}
				<link
					rel='preload'
					as='image'
					href='/placeholder-image.jpg'
				/>
			</head>
			<body
				className={cn(
					inter.variable,
					inter.className,
					'min-h-screen bg-black text-white antialiased flex flex-col'
				)}
			>
				<QueryProvider>
					<PerformanceMonitor />
					<ServiceWorkerRegistration />
					<NavigationWrapper>
						{children}
					</NavigationWrapper>
					<Footer />
					<Toaster
						position='top-right'
						richColors
						closeButton
					/>
				</QueryProvider>
			</body>
		</html>
	);
}
