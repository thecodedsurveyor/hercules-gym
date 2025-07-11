import React from 'react';
import Link from 'next/link';
import {
	Instagram,
	Facebook,
	Twitter,
	Phone,
	Mail,
	MapPin,
	Dumbbell,
} from 'lucide-react';

const Footer = () => {
	const quickLinks = [
		{ name: 'About', href: '/about' },
		{ name: 'Programs', href: '/programs' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'Blog', href: '/blog' },
	];

	const programs = [
		{
			name: 'Weight Lifting',
			href: '/programs#weight-lifting',
		},
		{ name: 'Cardio', href: '/programs#cardio' },
		{
			name: 'Bodybuilding',
			href: '/programs#bodybuilding',
		},
		{
			name: 'Regular Workout',
			href: '/programs#regular-workout',
		},
	];

	const socialLinks = [
		{
			icon: Instagram,
			href: 'https://instagram.com/herculesgym',
			label: 'Instagram',
		},
		{
			icon: Facebook,
			href: 'https://facebook.com/herculesgym',
			label: 'Facebook',
		},
		{
			icon: Twitter,
			href: 'https://twitter.com/herculesgym',
			label: 'Twitter',
		},
	];

	return (
		<footer className='relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden'>
			{/* Large Background Text */}
			<div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
				<div className='text-gray-800/90 font-black text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[24rem] leading-none select-none'>
					HERCULES
				</div>
			</div>

			{/* Main Footer Content */}
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
					{/* Brand Section */}
					<div className='lg:col-span-1'>
						<Link
							href='/'
							className='flex items-center mb-6'
						>
							<Dumbbell className='w-8 h-8 text-brand mr-3' />
							<span className='text-white font-bold text-xl tracking-wide'>
								HERCULES GYM
							</span>
						</Link>

						<p className='text-gray-300 text-sm leading-relaxed mb-6 max-w-xs'>
							Ready to boost your fitness?
							Join us for personalized
							training plans and expert
							guidance. We&apos;re here to
							help you achieve your goals!
						</p>

						{/* Social Links */}
						<div className='flex space-x-4'>
							{socialLinks.map(
								(social, index) => (
									<a
										key={index}
										href={social.href}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={
											social.label
										}
										className='w-10 h-10 bg-gray-700/50 hover:bg-brand text-gray-300 hover:text-black rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-brand/25'
									>
										<social.icon className='w-5 h-5' />
									</a>
								)
							)}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-white font-bold text-lg mb-6 uppercase tracking-wide'>
							Quick Links
						</h3>
						<ul className='space-y-3'>
							{quickLinks.map(
								(link, index) => (
									<li key={index}>
										<Link
											href={link.href}
											className='text-gray-300 hover:text-brand text-sm transition-colors duration-200 hover:translate-x-1 transform inline-block'
										>
											{link.name}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Programs */}
					<div>
						<h3 className='text-white font-bold text-lg mb-6 uppercase tracking-wide'>
							Programs
						</h3>
						<ul className='space-y-3'>
							{programs.map(
								(program, index) => (
									<li key={index}>
										<Link
											href={
												program.href
											}
											className='text-gray-300 hover:text-brand text-sm transition-colors duration-200 hover:translate-x-1 transform inline-block'
										>
											{program.name}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Contact Us */}
					<div>
						<h3 className='text-white font-bold text-lg mb-6 uppercase tracking-wide'>
							Contact Us
						</h3>
						<div className='space-y-4'>
							<div className='flex items-start space-x-3'>
								<Phone className='w-5 h-5 text-brand mt-0.5 flex-shrink-0' />
								<div>
									<a
										href='tel:+919876543210'
										className='text-gray-300 hover:text-brand text-sm transition-colors duration-200'
									>
										+91 98765 43210
									</a>
								</div>
							</div>

							<div className='flex items-start space-x-3'>
								<Mail className='w-5 h-5 text-brand mt-0.5 flex-shrink-0' />
								<div>
									<a
										href='mailto:info@herculesgym.com'
										className='text-gray-300 hover:text-brand text-sm transition-colors duration-200'
									>
										info@herculesgym.com
									</a>
								</div>
							</div>

							<div className='flex items-start space-x-3'>
								<MapPin className='w-5 h-5 text-brand mt-0.5 flex-shrink-0' />
								<div>
									<p className='text-gray-300 text-sm leading-relaxed'>
										Raj Studio, 2nd
										Floor,
										<br />
										Gurugram, India
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='border-t border-gray-700/50 mt-12 pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<div className='text-gray-400 text-sm'>
							Copyright © 2025 Hercules Gym.
							All rights reserved.
						</div>
						<div className='flex space-x-6'>
							<Link
								href='/privacy-policy'
								className='text-gray-400 hover:text-brand text-sm transition-colors duration-200'
							>
								Privacy Policy
							</Link>
							<span className='text-gray-600'>
								|
							</span>
							<Link
								href='/terms'
								className='text-gray-400 hover:text-brand text-sm transition-colors duration-200'
							>
								Terms of Use
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className='absolute top-0 left-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl'></div>
			<div className='absolute bottom-0 right-0 w-48 h-48 bg-brand/3 rounded-full blur-3xl'></div>
		</footer>
	);
};

export default Footer;
