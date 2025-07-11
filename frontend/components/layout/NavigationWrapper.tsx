'use client';

import { usePathname } from 'next/navigation';
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
