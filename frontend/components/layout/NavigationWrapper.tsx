'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function NavigationWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// Routes that don't need navigation (auth pages and authenticated app pages)
	const isAuthPage =
		pathname === '/login' ||
		pathname === '/get-started';

	// Authenticated routes that don't need the main navigation
	const isAuthenticatedRoute =
		pathname === '/dashboard' ||
		pathname === '/profile' ||
		pathname === '/settings' ||
		pathname === '/onboarding' ||
		pathname.startsWith('/dashboard/') ||
		pathname.startsWith('/profile/') ||
		pathname.startsWith('/settings/');

	const shouldHideNavbar =
		isAuthPage || isAuthenticatedRoute;

	// Prefetch common routes for better performance
	useEffect(() => {
		// Prefetch common routes when component mounts
		const prefetchRoutes = async () => {
			// Only prefetch if we're on a page that might navigate to these routes
			if (!isAuthPage && !isAuthenticatedRoute) {
				// Prefetch common routes
				const routesToPrefetch = [
					'/dashboard',
					'/profile',
					'/programs',
					'/about',
					'/pricing',
				];

				// Use dynamic imports to prefetch routes
				routesToPrefetch.forEach((route) => {
					// This will trigger Next.js to prefetch the route
					const link =
						document.createElement('link');
					link.rel = 'prefetch';
					link.href = route;
					document.head.appendChild(link);
				});
			}
		};

		prefetchRoutes();
	}, [isAuthPage, isAuthenticatedRoute]);

	return (
		<>
			{!shouldHideNavbar && (
				<div className='fixed top-4 left-4 right-4 z-50'>
					<Navbar />
				</div>
			)}
			{children}
		</>
	);
}
