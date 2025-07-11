'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function TestToastButton() {
	const testToasts = () => {
		// Test different types of toasts
		toast.success('Success Toast!', {
			description:
				'This is a success message with description.',
			duration: 4000,
		});

		setTimeout(() => {
			toast.error('Error Toast!', {
				description: 'This is an error message.',
				duration: 4000,
			});
		}, 1000);

		setTimeout(() => {
			toast.info('Info Toast!', {
				description:
					'This is an informational message.',
				duration: 4000,
			});
		}, 2000);

		setTimeout(() => {
			toast.warning('Warning Toast!', {
				description: 'This is a warning message.',
				duration: 4000,
			});
		}, 3000);
	};

	return (
		<div className='p-4'>
			<Button
				onClick={testToasts}
				variant='outline'
				className='bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
			>
				🧪 Test Toast Notifications
			</Button>
		</div>
	);
}
