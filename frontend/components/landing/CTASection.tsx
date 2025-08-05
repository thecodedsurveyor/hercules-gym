'use client';

import { Button } from '@/components/ui/button';

export default function CTASection() {
	return (
		<section
			className='py-12 md:py-20 bg-cover bg-center relative'
			style={{
				backgroundImage:
					'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
			}}
		>
			<div className='absolute inset-0 bg-black/70'></div>
			<div className='container mx-auto px-4 md:px-6 relative z-10 text-center'>
				<h2 className='text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6'>
					PERSONALIZED WORKOUT PLANS
					<br className='hidden sm:block' /> AND
					<span className='text-brand'>
						{' '}
						ACHIEVE
					</span>{' '}
					YOUR GOALS.
				</h2>
				<p className='text-sm sm:text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto'>
					Progress customization and goal
					achievements within just 8-12 weeks for
					those looking to focus on advanced
					training.
				</p>
				<Button
					className='w-full sm:w-auto bg-brand text-black hover:bg-brand/80 text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
					onClick={() =>
						(window.location.href = '/about')
					}
				>
					Contact Us
				</Button>
			</div>
		</section>
	);
}
