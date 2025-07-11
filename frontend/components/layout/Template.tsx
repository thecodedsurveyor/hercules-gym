'use client';

import Footer from '@/components/landing/Footer';

export default function Template({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main className='flex-grow'>{children}</main>
			<Footer />
		</>
	);
}
