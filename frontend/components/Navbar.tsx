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
import { usePathname } from 'next/navigation';

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
const NavigationLinks = memo(
	({ pathname }: { pathname: string }) => (
		<>
			<Link
				href='/'
				className={`relative px-1 text-white/90 transition-all duration-200 ${pathname === '/' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
				prefetch={true}
			>
				Home
			</Link>
			<Link
				href='/about'
				className={`relative px-1 text-white/90 transition-all duration-200 ${pathname === '/about' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
				prefetch={true}
			>
				About
			</Link>
		</>
	)
);

NavigationLinks.displayName = 'NavigationLinks';

// Memoized program dropdown
const ProgramsDropdown = memo(
	({
		isOpen,
		onToggle,
		pathname,
	}: {
		isOpen: boolean;
		onToggle: () => void;
		pathname: string;
	}) => (
		<div className='relative group'>
			<button
				onClick={onToggle}
				className={`relative px-1 text-white/90 flex items-center space-x-1 transition-all duration-200 ${pathname.startsWith('/programs') ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
			>
				<span>Programs</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>

			{/* Desktop Dropdown Menu */}
			<div className='absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
				<div className='py-2'>
					<Link
						href='/programs'
						className={`block px-4 py-2 text-white/90 transition-all duration-200 ${pathname === '/programs' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
						prefetch={true}
					>
						All Programs
					</Link>
					{programSubpages.map((program) => (
						<Link
							key={program.href}
							href={program.href}
							className={`block px-4 py-2 text-white/90 transition-all duration-200 ${pathname === program.href ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
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

function Navbar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [
		isProgramsDropdownOpen,
		setIsProgramsDropdownOpen,
	] = useState(false);

	// Memoized toggle functions
	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const toggleProgramsDropdown = useCallback(() => {
		setIsProgramsDropdownOpen((prev) => !prev);
	}, []);

	return (
		<header className='w-[95%] md:w-[90%] lg:w-[80%] mx-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg'>
			<nav className='px-4 md:px-8 h-20 md:h-24 flex items-center justify-between relative'>
				{/* Logo */}
				<Link
					href='/'
					className='flex items-center justify-center space-x-2 md:space-x-3'
					prefetch={true}
				>
					<Dumbbell className='w-7 h-7 md:w-8 md:h-8 text-brand' />
					<span className='text-xl md:text-3xl font-highman tracking-wider text-brand'>
						HERCULES GYM
					</span>
				</Link>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center space-x-8'>
					<NavigationLinks pathname={pathname} />
					<ProgramsDropdown
						isOpen={isProgramsDropdownOpen}
						onToggle={toggleProgramsDropdown}
						pathname={pathname}
					/>
					<Link
						href='/pricing'
						className={`relative px-1 text-white/90 transition-all duration-200 ${pathname === '/pricing' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
						prefetch={true}
					>
						Pricing
					</Link>
					<Link
						href='/coaches'
						className={`relative px-1 text-white/90 transition-all duration-200 ${pathname === '/coaches' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
						prefetch={true}
					>
						Coaches
					</Link>
					<Link
						href='/blog'
						className={`relative px-1 text-white/90 transition-all duration-200 ${pathname === '/blog' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
						prefetch={true}
					>
						Blog
					</Link>
				</div>

				{/* CTA Buttons */}
				<div className='hidden md:flex items-center space-x-4'>
					<Link href='/login' prefetch={true}>
						<Button
							variant='ghost'
							className='text-white/90 hover:text-brand hover:bg-white/5'
						>
							Login
						</Button>
					</Link>
					<Link
						href='/get-started'
						prefetch={true}
					>
						<Button className='bg-brand hover:bg-brand/80 text-black font-bold'>
							Get Started
						</Button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={toggleMenu}
					className='md:hidden p-2 text-white/90 hover:text-brand transition-colors'
				>
					{isMenuOpen ? (
						<X className='w-6 h-6' />
					) : (
						<Menu className='w-6 h-6' />
					)}
				</button>
			</nav>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className='md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-b-2xl shadow-lg z-50'>
					<div className='px-4 py-6 space-y-4'>
						<Link
							href='/'
							className={`block relative px-1 text-white/90 transition-all duration-200 ${pathname === '/' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
							onClick={toggleMenu}
							prefetch={true}
						>
							Home
						</Link>
						<Link
							href='/about'
							className={`block relative px-1 text-white/90 transition-all duration-200 ${pathname === '/about' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
							onClick={toggleMenu}
							prefetch={true}
						>
							About
						</Link>
						<Link
							href='/programs'
							className={`block relative px-1 text-white/90 transition-all duration-200 ${pathname.startsWith('/programs') ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
							onClick={toggleMenu}
							prefetch={true}
						>
							Programs
						</Link>
						<Link
							href='/pricing'
							className={`block relative px-1 text-white/90 transition-all duration-200 ${pathname === '/pricing' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
							onClick={toggleMenu}
							prefetch={true}
						>
							Pricing
						</Link>
						<Link
							href='/coaches'
							className={`block relative px-1 text-white/90 transition-all duration-200 ${pathname === '/coaches' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
							onClick={toggleMenu}
							prefetch={true}
						>
							Coaches
						</Link>
						<Link
							href='/blog'
							className={`block relative px-1 text-white/90 transition-all duration-200 ${pathname === '/blog' ? 'border-b-2 border-brand text-brand' : 'hover:border-b-2 hover:border-brand hover:text-brand border-b-2 border-transparent'}`}
							onClick={toggleMenu}
							prefetch={true}
						>
							Blog
						</Link>
						<div className='pt-4 space-y-2'>
							<Link
								href='/login'
								onClick={toggleMenu}
								prefetch={true}
							>
								<Button
									variant='ghost'
									className='w-full text-white/90 hover:text-brand hover:bg-white/5'
								>
									Login
								</Button>
							</Link>
							<Link
								href='/get-started'
								onClick={toggleMenu}
								prefetch={true}
							>
								<Button className='w-full bg-brand hover:bg-brand/80 text-black font-bold'>
									Get Started
								</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

export default memo(Navbar);
