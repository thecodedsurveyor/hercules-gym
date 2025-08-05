'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
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
	{
		id: 7,
		title: 'Supplements Guide: What Actually Works for Muscle Building',
		excerpt:
			'A science-based review of the most effective supplements for muscle growth, strength, and performance enhancement.',
		category: 'Supplements',
		author: 'Dr. Alex Martinez',
		authorRole: 'Sports Medicine Specialist',
		authorImage:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'June 1, 2024',
		readTime: '11 min read',
		featured: false,
	},
	{
		id: 8,
		title: 'Building a Home Gym: Essential Equipment for Every Budget',
		excerpt:
			'Create an effective home workout space with the right equipment, from budget-friendly options to premium setups.',
		category: 'Equipment',
		author: 'Sarah Johnson',
		authorRole: 'Fitness Equipment Expert',
		authorImage:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
		image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
		date: 'May 30, 2024',
		readTime: '14 min read',
		featured: false,
	},
];

export default function BlogPage() {
	const [searchQuery, setSearchQuery] = useState('');

	// Filter posts based on search query
	const filteredPosts = useMemo(() => {
		if (!searchQuery.trim()) {
			return blogPosts;
		}

		const query = searchQuery.toLowerCase();
		return blogPosts.filter(
			(post) =>
				post.title.toLowerCase().includes(query) ||
				post.excerpt
					.toLowerCase()
					.includes(query) ||
				post.category
					.toLowerCase()
					.includes(query) ||
				post.author.toLowerCase().includes(query)
		);
	}, [searchQuery]);

	const featuredPosts = filteredPosts.filter(
		(post) => post.featured
	);
	const regularPosts = filteredPosts.filter(
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
								value={searchQuery}
								onChange={(e) =>
									setSearchQuery(
										e.target.value
									)
								}
								className='bg-gray-900 border-gray-800 pl-12 pr-4 py-6 text-white placeholder:text-gray-500 rounded-full focus:border-brand/50 focus:ring-brand/20'
							/>
							<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5' />
						</div>
					</motion.div>
				</div>
			</section>

			{/* Search Results Indicator */}
			{searchQuery && (
				<section className='py-4'>
					<div className='container mx-auto px-4'>
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='text-center'
						>
							<p className='text-gray-400'>
								{filteredPosts.length === 0
									? `No articles found for "${searchQuery}"`
									: `Found ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} for "${searchQuery}"`}
							</p>
						</motion.div>
					</div>
				</section>
			)}

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
						{featuredPosts.length > 0 ? (
							featuredPosts.map((post) => (
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
												{
													post.category
												}
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
												{post.date}{' '}
												·{' '}
												{
													post.readTime
												}
											</div>
											<Button className='bg-brand hover:bg-brand/80 text-black'>
												Read More
												<ChevronRight className='w-4 h-4 ml-2' />
											</Button>
										</div>
									</div>
								</motion.article>
							))
						) : (
							<div className='col-span-2 text-center py-12'>
								<p className='text-gray-400 text-lg'>
									No featured articles
									match your search.
								</p>
							</div>
						)}
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
						{regularPosts.length > 0 ? (
							regularPosts.map((post) => (
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
												{
													post.category
												}
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
										<Button className='w-full bg-brand hover:bg-brand/80 text-black'>
											Read Article
											<ChevronRight className='w-4 h-4 ml-2' />
										</Button>
									</div>
								</motion.article>
							))
						) : (
							<div className='col-span-3 text-center py-12'>
								<p className='text-gray-400 text-lg'>
									No articles match your
									search criteria.
								</p>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className='py-16'>
				<div className='container mx-auto px-4'>
					<div className='max-w-2xl mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 shadow-xl'
						>
							<div className='text-center mb-6'>
								<div className='inline-flex items-center justify-center w-16 h-16 bg-brand/20 rounded-full mb-4'>
									<svg
										className='w-8 h-8 text-brand'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<h2 className='text-2xl md:text-3xl font-bold mb-3'>
									Stay Updated with{' '}
									<span className='text-brand'>
										Expert Insights
									</span>
								</h2>
								<p className='text-gray-400 text-sm md:text-base leading-relaxed'>
									Get weekly fitness tips,
									workout guides, and
									nutrition advice
									delivered to your inbox.
								</p>
							</div>

							<div className='space-y-4'>
								<div className='flex flex-col sm:flex-row gap-3'>
									<Input
										type='email'
										placeholder='Enter your email address'
										className='flex-1 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-brand/50 focus:ring-brand/20'
									/>
									<Button className='bg-brand hover:bg-brand/80 text-black font-medium px-6 py-2.5 whitespace-nowrap transition-all duration-200'>
										Subscribe
									</Button>
								</div>
								<p className='text-xs text-gray-500 text-center'>
									No spam, unsubscribe at
									any time. We respect
									your privacy.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
}
