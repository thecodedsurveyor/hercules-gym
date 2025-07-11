'use client';

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 10, // 10 minutes
						retry: (failureCount, error) => {
							// Don't retry on 4xx errors
							if (
								error instanceof Error &&
								error.message.includes('4')
							) {
								return false;
							}
							return failureCount < 3;
						},
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
