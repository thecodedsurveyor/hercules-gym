'use client';
import { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Dumbbell,
	Menu,
	X,
	ChevronDown,
} from 'lucide-react';

// Memoized program subpages to prevent re-renders
const programSubpages = [
	{
		name: 'Regular Workout',
		href: '/programs/regular-workout',
	},
	{
		name: 'Bodybuilding',
		href: '/programs/bodybuilding',
	},
	{ name: 'Cardio', href: '/programs/cardio' },
	{
		name: 'Weight Lifting',
		href: '/programs/weight-lifting',
	},
];

// Memoized navigation links
const NavigationLinks = memo(() => (
	<>
		<Link
			href='/'
			className='text-white/90 hover:text-brand transition-colors'
			prefetch={true}
		>
			HOME
		</Link>
		<Link
			href='/about'
			className='text-white/90 hover:text-brand transition-colors'
			prefetch={true}
		>
			ABOUT
		</Link>
	</>
));

NavigationLinks.displayName = 'NavigationLinks';

// Memoized program dropdown
const ProgramsDropdown = memo(
	({
		isOpen,
		onToggle,
	}: {
		isOpen: boolean;
		onToggle: () => void;
	}) => (
		<div className='relative group'>
			<button
				onClick={onToggle}
				className='text-white/90 hover:text-brand transition-colors flex items-center space-x-1'
			>
				<span>PROGRAMS</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{/* Desktop Dropdown Menu */}
			<div className='absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
				<div className='py-2'>
					<Link
						href='/programs'
						className='block px-4 py-2 text-white/90 hover:text-brand hover:bg-white/5 transition-colors'
						prefetch={true}
					>
						All Programs
					</Link>
					{programSubpages.map((program) => (
						<Link
							key={program.href}
							href={program.href}
							className='block px-4 py-2 text-white/90 hover:text-brand hover:bg-white/5 transition-colors'
							prefetch={true}
						>
							{program.name}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
);

ProgramsDropdown.displayName = 'ProgramsDropdown';

// Memoized mobile menu
const MobileMenu = memo(
	({
		isOpen,
		onClose,
	}: {
		isOpen: boolean;
		onClose: () => void;
	}) => (
		<div
			className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
		>
			<div className='flex flex-col h-full'>
				<div className='flex items-center justify-between p-6 border-b border-white/10'>
					<Link
						href='/'
						className='flex items-center space-x-2'
						onClick={onClose}
					>
						<Dumbbell className='w-8 h-8 text-brand' />
						<span className='text-xl font-bold text-white'>
							Hercules Gym
						</span>
					</Link>
					<button
						onClick={onClose}
						className='text-white/90 hover:text-brand transition-colors'
					>
						<X className='w-6 h-6' />
					</button>
				</div>
				<nav className='flex-1 p-6 space-y-6'>
					<Link
						href='/'
						className='block text-white/90 hover:text-brand transition-colors text-lg'
						onClick={onClose}
					>
						HOME
					</Link>
					<Link
						href='/about'
						className='block text-white/90 hover:text-brand transition-colors text-lg'
						onClick={onClose}
					>
						ABOUT
					</Link>
					<div className='space-y-2'>
						<span className='block text-white/90 text-lg font-medium'>
							PROGRAMS
						</span>
						{programSubpages.map((program) => (
							<Link
								key={program.href}
								href={program.href}
								className='block text-white/70 hover:text-brand transition-colors ml-4'
								onClick={onClose}
							>
								{program.name}
							</Link>
						))}
					</div>
				</nav>
			</div>
		</div>
	)
);

MobileMenu.displayName = 'MobileMenu';

const Navbar = memo(() => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProgramsOpen, setIsProgramsOpen] =
		useState(false);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const togglePrograms = useCallback(() => {
		setIsProgramsOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	return (
		<header className='fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link
						href='/'
						className='flex items-center space-x-2'
					>
						<Dumbbell className='w-8 h-8 text-brand' />
						<span className='text-xl font-bold text-white'>
							Hercules Gym
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<NavigationLinks />
						<ProgramsDropdown
							isOpen={isProgramsOpen}
							onToggle={togglePrograms}
						/>
						<Link
							href='/pricing'
							className='text-white/90 hover:text-brand transition-colors'
							prefetch={true}
						>
							PRICING
						</Link>
						<Link
							href='/coaches'
							className='text-white/90 hover:text-brand transition-colors'
							prefetch={true}
						>
							COACHES
						</Link>
						<Link
							href='/blog'
							className='text-white/90 hover:text-brand transition-colors'
							prefetch={true}
						>
							BLOG
						</Link>
					</nav>

					{/* CTA Buttons */}
					<div className='hidden md:flex items-center space-x-4'>
						<Link href='/login' prefetch={true}>
							<Button
								variant='ghost'
								className='text-white/90 hover:text-brand hover:bg-white/5'
							>
								LOGIN
							</Button>
						</Link>
						<Link
							href='/get-started'
							prefetch={true}
						>
							<Button className='bg-brand hover:bg-brand/90 text-white'>
								GET STARTED
							</Button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						className='md:hidden text-white/90 hover:text-brand transition-colors'
					>
						<Menu className='w-6 h-6' />
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<MobileMenu
					isOpen={isMenuOpen}
					onClose={closeMenu}
				/>
			)}
		</header>
	);
});

Navbar.displayName = 'Navbar';

export default Navbar;
