'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
	return (
		<section className='relative min-h-screen flex items-center justify-center py-20 md:py-32'>
			{/* Background Image */}
			<div
				className='absolute inset-0 bg-cover bg-center bg-no-repeat'
				style={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
				}}
			>
				<div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent'></div>
			</div>

			{/* Content */}
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='space-y-8 md:space-y-10'
					>
						{/* Main Heading */}
						<div className='space-y-4'>
							<motion.div
								initial={{
									opacity: 0,
									x: -20,
								}}
								animate={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									delay: 0.3,
									duration: 0.8,
								}}
								className='relative'
							>
								<div className='absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-brand'></div>
								<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-highman font-bold tracking-tight'>
									<span className='inline text-gray-200'>
										STRONGER{' '}
									</span>
									<span className='inline bg-gradient-to-r from-brand to-brand/80 bg-clip-text text-transparent'>
										EVERY DAY
									</span>
								</h1>
							</motion.div>

							<motion.h2
								initial={{
									opacity: 0,
									x: -20,
								}}
								animate={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									delay: 0.5,
									duration: 0.8,
								}}
								className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-highman font-bold leading-tight'
							>
								START{' '}
								<span className='text-brand'>
									YOUR FITNESS
								</span>
								<br />
								JOURNEY NOW
							</motion.h2>
						</div>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.7,
								duration: 0.8,
							}}
							className='text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed'
						>
							Get{' '}
							<span className='text-brand font-semibold'>
								personalized training
							</span>{' '}
							sessions tailored just for you.
							Whether you want to lose weight,
							build strength, or develop
							healthy habits, our expert
							trainers are here to guide your
							transformation.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.9,
								duration: 0.8,
							}}
							className='flex flex-col sm:flex-row gap-4'
						>
							<Button
								className='w-full md:w-auto bg-brand hover:bg-brand/80 text-black text-base md:text-lg px-6 md:px-8 py-4 md:py-3 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-brand/25'
								onClick={() =>
									(window.location.href =
										'/get-started')
								}
							>
								Get Started Today
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
