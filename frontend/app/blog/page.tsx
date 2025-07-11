'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	ChevronsRight,
	Search,
	ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const blogPosts = [
	{
		id: 1,
		title: 'The Science Behind Muscle Growth: Understanding Hypertrophy',
		excerpt:
			'Dive deep into the biological mechanisms that drive muscle growth and learn how to optimize your training for maximum gains.',
		category: 'Training Science',
		author: 'Dr. Sarah Chen',
		authorRole: 'Exercise Physiologist',
		authorImage:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 15, 2024',
		readTime: '8 min read',
		featured: true,
	},
	{
		id: 2,
		title: 'Nutrition Myths Debunked: The Truth About Protein Intake',
		excerpt:
			'Separating fact from fiction when it comes to protein consumption, supplements, and muscle building.',
		category: 'Nutrition',
		author: 'Mike Thompson',
		authorRole: 'Sports Nutritionist',
		authorImage:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 12, 2024',
		readTime: '6 min read',
		featured: true,
	},
	{
		id: 3,
		title: 'The Ultimate Guide to Recovery: Sleep, Nutrition, and Active Rest',
		excerpt:
			'Learn how to optimize your recovery for better performance and continuous progress in your fitness journey.',
		category: 'Recovery',
		author: 'Lisa Rodriguez',
		authorRole: 'Recovery Specialist',
		authorImage:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 10, 2024',
		readTime: '10 min read',
		featured: false,
	},
	{
		id: 4,
		title: 'Mastering Compound Lifts: Form, Technique, and Programming',
		excerpt:
			'A comprehensive guide to perfecting your form on the big lifts and designing an effective training program.',
		category: 'Training',
		author: 'John Doe',
		authorRole: 'Strength Coach',
		authorImage:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 8, 2024',
		readTime: '12 min read',
		featured: false,
	},
	{
		id: 5,
		title: 'Mental Toughness: The Psychology of Peak Performance',
		excerpt:
			'Develop the mindset of a champion and learn techniques to overcome mental barriers in your training.',
		category: 'Psychology',
		author: 'Dr. James Wilson',
		authorRole: 'Sports Psychologist',
		authorImage:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 5, 2024',
		readTime: '7 min read',
		featured: false,
	},
	{
		id: 6,
		title: 'HIIT vs LISS: Choosing the Right Cardio for Your Goals',
		excerpt:
			'Compare different cardio approaches and learn how to implement them effectively in your training routine.',
		category: 'Cardio',
		author: 'Emma Davis',
		authorRole: 'Cardio Specialist',
		authorImage:
			'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 3, 2024',
		readTime: '9 min read',
		featured: false,
	},
];

export default function BlogPage() {
	const featuredPosts = blogPosts.filter(
		(post) => post.featured
	);
	const regularPosts = blogPosts.filter(
		(post) => !post.featured
	);

	return (
		<main className='bg-black min-h-screen pb-16 pt-32'>
			{/* Hero Section */}
			<section className='relative py-20'>
				<div className='absolute inset-0 bg-gradient-to-b from-gray-900 to-black'></div>
				<div className='container mx-auto px-4 relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='max-w-4xl mx-auto text-center'
					>
						<h1 className='text-4xl md:text-6xl font-bold mb-6'>
							FITNESS KNOWLEDGE{' '}
							<span className='text-brand'>
								HUB
							</span>
						</h1>
						<p className='text-gray-300 text-lg md:text-xl leading-relaxed mb-8'>
							Expert insights, training tips,
							and the latest in fitness
							science to help you achieve your
							goals.
						</p>
						<div className='relative max-w-2xl mx-auto'>
							<Input
								type='text'
								placeholder='Search articles...'
								className='bg-gray-900 border-gray-800 pl-12 pr-4 py-6 text-white placeholder:text-gray-500 rounded-full'
							/>
							<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
						</div>
					</motion.div>
				</div>
			</section>

			{/* Featured Posts */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='mb-2'>
						<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
					</div>
					<h2 className='text-3xl md:text-5xl font-bold mb-8'>
						FEATURED{' '}
						<span className='text-brand'>
							ARTICLES
						</span>
					</h2>
					<div className='grid md:grid-cols-2 gap-8'>
						{featuredPosts.map((post) => (
							<motion.article
								key={post.id}
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								className='group bg-gray-900 rounded-3xl overflow-hidden'
							>
								<div className='relative h-64'>
									<Image
										src={post.image}
										alt={post.title}
										fill
										className='object-cover transition-transform duration-500 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent'></div>
									<div className='absolute top-4 left-4'>
										<span className='bg-brand text-black px-3 py-1 rounded-full text-sm font-medium'>
											{post.category}
										</span>
									</div>
								</div>
								<div className='p-6'>
									<div className='flex items-center gap-4 mb-4'>
										<Image
											src={
												post.authorImage
											}
											alt={
												post.author
											}
											width={40}
											height={40}
											className='rounded-full'
										/>
										<div>
											<h4 className='font-medium'>
												{
													post.author
												}
											</h4>
											<p className='text-sm text-gray-400'>
												{
													post.authorRole
												}
											</p>
										</div>
									</div>
									<h3 className='text-xl font-bold mb-3'>
										{post.title}
									</h3>
									<p className='text-gray-400 mb-4'>
										{post.excerpt}
									</p>
									<div className='flex items-center justify-between'>
										<div className='text-sm text-gray-400'>
											{post.date} ·{' '}
											{post.readTime}
										</div>
										<Button className='bg-brand hover:bg-brand/80 text-black'>
											Read More
											<ChevronRight className='w-4 h-4 ml-2' />
										</Button>
									</div>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</section>

			{/* Regular Posts Grid */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<h2 className='text-3xl font-bold mb-8'>
						LATEST ARTICLES
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{regularPosts.map((post) => (
							<motion.article
								key={post.id}
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
								}}
								className='bg-gray-900 rounded-2xl overflow-hidden'
							>
								<div className='relative h-48'>
									<Image
										src={post.image}
										alt={post.title}
										fill
										className='object-cover'
									/>
									<div className='absolute top-4 left-4'>
										<span className='bg-brand text-black px-3 py-1 rounded-full text-sm font-medium'>
											{post.category}
										</span>
									</div>
								</div>
								<div className='p-6'>
									<div className='flex items-center gap-3 mb-3'>
										<Image
											src={
												post.authorImage
											}
											alt={
												post.author
											}
											width={32}
											height={32}
											className='rounded-full'
										/>
										<div className='text-sm'>
											<span className='font-medium'>
												{
													post.author
												}
											</span>
											<span className='text-gray-400'>
												{' '}
												·{' '}
												{
													post.readTime
												}
											</span>
										</div>
									</div>
									<h3 className='text-lg font-bold mb-2'>
										{post.title}
									</h3>
									<p className='text-gray-400 text-sm mb-4 line-clamp-2'>
										{post.excerpt}
									</p>
									<Button
										variant='outline'
										className='w-full border-gray-800 hover:bg-gray-800'
									>
										Read Article
										<ChevronRight className='w-4 h-4 ml-2' />
									</Button>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='bg-gray-900 rounded-3xl p-8 md:p-12'>
						<div className='mx-auto text-center'>
							<h2 className='text-2xl md:text-4xl font-bold mb-4'>
								GET THE LATEST{' '}
								<span className='text-brand'>
									FITNESS INSIGHTS
								</span>
							</h2>
							<p className='text-gray-400 mb-6'>
								Subscribe to our newsletter
								for expert tips, workout
								guides, and nutrition advice
								delivered straight to your
								inbox.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Input
									type='email'
									placeholder='Enter your email'
									className='bg-black border-gray-800 text-white placeholder:text-gray-500'
								/>
								<Button className='bg-brand hover:bg-brand/80 text-black whitespace-nowrap'>
									Subscribe Now
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
