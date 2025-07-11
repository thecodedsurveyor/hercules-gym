import React, { useState } from 'react';
import { Send } from 'lucide-react';

const NewsletterSection = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle email submission logic here
		console.log('Email submitted:', email);
		setEmail('');
	};

	return (
		<section className='bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<div className='bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 md:p-10 text-center shadow-2xl'>
					{/* Main Heading */}
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight'>
						GET{' '}
						<span className='text-brand'>
							FITNESS TIPS
						</span>{' '}
						IN YOUR INBOX
					</h2>

					{/* Description */}
					<p className='text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto'>
						Join our community for exclusive
						workout tips, nutrition advice, and
						member success stories.
					</p>

					{/* Email Signup Form */}
					<form
						onSubmit={handleSubmit}
						className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
					>
						<div className='flex-1'>
							<input
								type='email'
								value={email}
								onChange={(e) =>
									setEmail(e.target.value)
								}
								placeholder='Your email'
								required
								className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent backdrop-blur-sm transition-all duration-200 text-sm md:text-base'
							/>
						</div>
						<button
							type='submit'
							className='bg-brand hover:bg-brand/80 text-black px-6 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25 whitespace-nowrap flex items-center justify-center gap-2'
						>
							Subscribe
							<Send className='w-4 h-4' />
						</button>
					</form>

					{/* Trust Indicators */}
					<div className='mt-6 md:mt-8 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-gray-400'>
						<span className='flex items-center'>
							<svg
								className='w-4 h-4 mr-1'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
								<path
									fillRule='evenodd'
									d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
									clipRule='evenodd'
								/>
							</svg>
							Weekly Newsletter
						</span>
						<span className='flex items-center'>
							<svg
								className='w-4 h-4 mr-1'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
									clipRule='evenodd'
								/>
							</svg>
							No Spam
						</span>
						<span className='flex items-center'>
							<svg
								className='w-4 h-4 mr-1'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
									clipRule='evenodd'
								/>
							</svg>
							Unsubscribe Anytime
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewsletterSection;
