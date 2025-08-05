'use client';

import { motion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
	return (
		<main className='bg-black min-h-screen py-20'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='max-w-4xl mx-auto'
				>
					<div className='mb-2'>
						<ChevronsRight className='w-12 h-12 md:w-24 md:h-24 text-brand' />
					</div>
					<h1 className='text-4xl md:text-6xl font-bold mb-8'>
						PRIVACY{' '}
						<span className='text-brand'>
							POLICY
						</span>
					</h1>

					<div className='prose prose-invert max-w-none'>
						<p className='text-gray-300 text-lg mb-8'>
							Last updated: June 15, 2024
						</p>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								1. Information We Collect
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									At Hercules Gym, we
									collect various types of
									information to provide
									you with the best
									possible fitness
									experience:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Personal
										identification
										information (Name,
										email address, phone
										number)
									</li>
									<li>
										Demographic
										information (Age,
										gender, fitness
										goals)
									</li>
									<li>
										Health and fitness
										data (Physical
										measurements,
										workout history,
										fitness assessments)
									</li>
									<li>
										Payment information
										(Credit card
										details, billing
										address)
									</li>
									<li>
										Usage data (How you
										interact with our
										facilities and
										services)
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								2. How We Use Your
								Information
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									We use the collected
									information for the
									following purposes:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Personalize your
										workout and
										nutrition plans
									</li>
									<li>
										Process your
										membership and
										payments
									</li>
									<li>
										Send you important
										updates about our
										services
									</li>
									<li>
										Improve our
										facilities and
										services
									</li>
									<li>
										Communicate with you
										about promotions and
										events
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								3. Data Security
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									We implement robust
									security measures to
									protect your personal
									information:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Encryption of
										sensitive data
									</li>
									<li>
										Regular security
										assessments
									</li>
									<li>
										Restricted access to
										personal information
									</li>
									<li>
										Secure data storage
										systems
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								4. Your Rights
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									You have the right to:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Access your personal
										information
									</li>
									<li>
										Correct inaccurate
										data
									</li>
									<li>
										Request deletion of
										your data
									</li>
									<li>
										Opt-out of marketing
										communications
									</li>
									<li>
										Export your data
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								5. Cookies and Tracking
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									We use cookies and
									similar tracking
									technologies to enhance
									your experience on our
									website. These help us
									understand how you
									interact with our
									services and allow us to
									improve functionality.
								</p>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								6. Third-Party Services
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									We may use third-party
									services for:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Payment processing
									</li>
									<li>Analytics</li>
									<li>
										Email communications
									</li>
									<li>
										Fitness tracking
										integration
									</li>
								</ul>
								<p>
									These services have
									their own privacy
									policies and handling
									practices.
								</p>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								7. Contact Us
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									If you have any
									questions about this
									Privacy Policy, please
									contact us at:
								</p>
								<ul className='list-none space-y-2'>
									<li>
										Email:
										privacy@herculesgym.com
									</li>
									<li>
										Phone: +234 816 522
										9396
									</li>
									<li>
										Address: Plot 2425
										Herbert Macaulay
										Way, Wuse Zone 4,
										Abuja - Nigeria
									</li>
								</ul>
							</div>
						</section>
					</div>
				</motion.div>
			</div>
		</main>
	);
}
