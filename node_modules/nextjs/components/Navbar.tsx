'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dumbbell, Menu, X } from 'lucide-react';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className='w-[95%] md:w-[90%] lg:w-[80%] mx-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg'>
			<nav className='px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative'>
				{/* Logo */}
				<Link
					href='/'
					className='flex items-center justify-center space-x-2 md:space-x-3'
				>
					<Dumbbell className='w-7 h-7 md:w-8 md:h-8 text-brand' />
					<span className='text-xl md:text-3xl font-highman tracking-wider text-brand'>
						HERCULES GYM
					</span>
				</Link>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center space-x-8'>
					<Link
						href='/'
						className='text-white/90 hover:text-brand transition-colors'
					>
						HOME
					</Link>
					<Link
						href='/about'
						className='text-white/90 hover:text-brand transition-colors'
					>
						ABOUT
					</Link>
					<Link
						href='/programs'
						className='text-white/90 hover:text-brand transition-colors group relative'
					>
						PROGRAMS
						<span className='inline-block ml-1 transition-transform group-hover:rotate-180'>
							▼
						</span>
					</Link>
					<Link
						href='/pricing'
						className='text-white/90 hover:text-brand transition-colors'
					>
						PRICING
					</Link>
					<Link
						href='/blog'
						className='text-white/90 hover:text-brand transition-colors'
					>
						BLOG
					</Link>
				</div>

				{/* Desktop CTA Buttons */}
				<div className='hidden md:flex items-center space-x-4'>
					<Link href='/login'>
						<Button
							variant='outline'
							className='rounded-lg border-white text-white bg-transparent hover:bg-transparent transition-colors'
						>
							Login
						</Button>
					</Link>
					<Link href='/get-started'>
						<Button className='rounded-lg bg-brand text-black hover:bg-brand/80 transition-colors'>
							Signup
						</Button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() =>
						setIsMenuOpen(!isMenuOpen)
					}
					className='md:hidden text-white/90 hover:text-brand transition-colors p-2'
				>
					{isMenuOpen ? (
						<X className='w-6 h-6' />
					) : (
						<Menu className='w-6 h-6' />
					)}
				</button>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className='absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg md:hidden'>
						<div className='flex flex-col space-y-4'>
							<Link
								href='/'
								className='text-white/90 hover:text-brand transition-colors py-2 px-4 rounded-lg hover:bg-white/5'
								onClick={() =>
									setIsMenuOpen(false)
								}
							>
								HOME
							</Link>
							<Link
								href='/about'
								className='text-white/90 hover:text-brand transition-colors py-2 px-4 rounded-lg hover:bg-white/5'
								onClick={() =>
									setIsMenuOpen(false)
								}
							>
								ABOUT
							</Link>
							<Link
								href='/programs'
								className='text-white/90 hover:text-brand transition-colors py-2 px-4 rounded-lg hover:bg-white/5'
								onClick={() =>
									setIsMenuOpen(false)
								}
							>
								PROGRAMS
							</Link>
							<Link
								href='/pricing'
								className='text-white/90 hover:text-brand transition-colors py-2 px-4 rounded-lg hover:bg-white/5'
								onClick={() =>
									setIsMenuOpen(false)
								}
							>
								PRICING
							</Link>
							<Link
								href='/blog'
								className='text-white/90 hover:text-brand transition-colors py-2 px-4 rounded-lg hover:bg-white/5'
								onClick={() =>
									setIsMenuOpen(false)
								}
							>
								BLOG
							</Link>
							<div className='pt-4 flex flex-col space-y-3'>
								<Link href='/login'>
									<Button
										variant='outline'
										className='w-full rounded-lg border-white text-white bg-transparent hover:bg-transparent transition-colors'
									>
										Login
									</Button>
								</Link>
								<Link href='/get-started'>
									<Button className='w-full rounded-lg bg-brand text-black hover:bg-brand/80 transition-colors'>
										Signup
									</Button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
