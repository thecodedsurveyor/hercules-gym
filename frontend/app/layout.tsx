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
});

export const metadata: Metadata = {
	title: 'Hercules Gym - Stronger Every Day | Personal Training & Fitness Programs',
	description:
		'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities. Join Hercules Gym today and start your journey to a stronger, healthier you.',
	keywords:
		'gym, fitness, personal training, workout, health, exercise, bodybuilding, cardio, weight lifting, strength training, yoga, nutrition, wellness, Mumbai gym, fitness center',
	authors: [{ name: 'Hercules Gym' }],
	creator: 'Hercules Gym',
	publisher: 'Hercules Gym',
	robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
	openGraph: {
		title: 'Hercules Gym - Stronger Every Day',
		description:
			'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities.',
		type: 'website',
		locale: 'en_US',
		siteName: 'Hercules Gym',
		url: 'https://herculesgym.com',
		images: [
			{
				url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
				width: 1200,
				height: 630,
				alt: 'Hercules Gym - Modern fitness facility with state-of-the-art equipment',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Hercules Gym - Stronger Every Day',
		description:
			'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities.',
		images: [
			'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
		],
		creator: '@herculesgym',
		site: '@herculesgym',
	},
	viewport:
		'width=device-width, initial-scale=1, maximum-scale=5',
	themeColor: '#c4ff00',
	manifest: '/manifest.json',
	alternates: {
		canonical: 'https://herculesgym.com',
	},
	other: {
		'google-site-verification':
			'your-google-verification-code',
		'msapplication-TileColor': '#c4ff00',
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style':
			'black-translucent',
		'apple-mobile-web-app-title': 'Hercules Gym',
	},
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

				{/* Structured Data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context':
								'https://schema.org',
							'@type': 'HealthClub',
							name: 'Hercules Gym',
							description:
								'Transform your body and mind with our expert personal training, diverse fitness programs, and state-of-the-art facilities.',
							url: 'https://herculesgym.com',
							logo: 'https://herculesgym.com/logo.png',
							image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
							telephone: '+91-XXXXXXXXXX',
							address: {
								'@type': 'PostalAddress',
								streetAddress:
									'Your Street Address',
								addressLocality: 'Mumbai',
								addressRegion:
									'Maharashtra',
								postalCode: '400001',
								addressCountry: 'IN',
							},
							geo: {
								'@type': 'GeoCoordinates',
								latitude: '19.0760',
								longitude: '72.8777',
							},
							openingHours:
								'Mo-Su 06:00-22:00',
							priceRange: '₹₹',
							amenityFeature: [
								{
									'@type':
										'LocationFeatureSpecification',
									name: 'Personal Training',
									value: true,
								},
								{
									'@type':
										'LocationFeatureSpecification',
									name: 'Cardio Equipment',
									value: true,
								},
								{
									'@type':
										'LocationFeatureSpecification',
									name: 'Strength Training',
									value: true,
								},
							],
							sameAs: [
								'https://instagram.com/herculesgym',
								'https://facebook.com/herculesgym',
								'https://twitter.com/herculesgym',
							],
						}),
					}}
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
