'use client';

import { motion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';

export default function TermsPage() {
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
						TERMS OF{' '}
						<span className='text-brand'>
							USE
						</span>
					</h1>

					<div className='prose prose-invert max-w-none'>
						<p className='text-gray-300 text-lg mb-8'>
							Last updated: June 15, 2024
						</p>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								1. Membership Terms
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									By becoming a member of
									Hercules Gym, you agree
									to the following terms:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Membership is
										non-transferable and
										non-refundable
									</li>
									<li>
										Members must be at
										least 18 years old
										or accompanied by a
										guardian
									</li>
									<li>
										Members must
										complete a health
										assessment before
										starting any program
									</li>
									<li>
										Membership can be
										frozen for up to 3
										months per year with
										valid reason
									</li>
									<li>
										30-day notice
										required for
										membership
										cancellation
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								2. Facility Rules
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									All members must adhere
									to the following rules:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Proper workout
										attire and
										closed-toe shoes
										required
									</li>
									<li>
										Wipe down equipment
										after use
									</li>
									<li>
										Return weights and
										equipment to
										designated areas
									</li>
									<li>
										No unauthorized
										personal training or
										coaching
									</li>
									<li>
										Respect other
										members and staff
									</li>
									<li>
										Follow posted safety
										guidelines
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								3. Payment Terms
							</h2>
							<div className='space-y-4 text-gray-300'>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Monthly membership
										fees are due on the
										1st of each month
									</li>
									<li>
										Late payments may
										result in membership
										suspension
									</li>
									<li>
										Returned payment fee
										of ₹500 will be
										charged
									</li>
									<li>
										Price changes will
										be notified 30 days
										in advance
									</li>
									<li>
										Additional services
										billed separately
										from membership
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								4. Liability and Risk
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									Members acknowledge that
									exercise and use of gym
									facilities carries
									inherent risks. By using
									our facilities:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										You accept
										responsibility for
										your own safety
									</li>
									<li>
										You agree to follow
										proper equipment
										usage guidelines
									</li>
									<li>
										You certify being
										physically fit for
										exercise
									</li>
									<li>
										You waive certain
										legal rights against
										the gym
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								5. Personal Training
							</h2>
							<div className='space-y-4 text-gray-300'>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										24-hour cancellation
										notice required for
										sessions
									</li>
									<li>
										Late cancellations
										will be charged full
										session fee
									</li>
									<li>
										Personal training
										packages expire
										after 6 months
									</li>
									<li>
										Sessions are
										non-transferable
										between members
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								6. Privacy and Recording
							</h2>
							<div className='space-y-4 text-gray-300'>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Photography/videography
										requires staff
										permission
									</li>
									<li>
										Security cameras
										operate 24/7 for
										safety
									</li>
									<li>
										Member information
										handled per Privacy
										Policy
									</li>
									<li>
										Social media posts
										must respect others'
										privacy
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								7. Termination
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									Hercules Gym reserves
									the right to terminate
									membership for:
								</p>
								<ul className='list-disc pl-6 space-y-2'>
									<li>
										Violation of gym
										rules or policies
									</li>
									<li>
										Inappropriate or
										dangerous behavior
									</li>
									<li>
										Non-payment of fees
									</li>
									<li>
										Providing false
										information
									</li>
								</ul>
							</div>
						</section>

						<section className='mb-12'>
							<h2 className='text-2xl font-bold mb-4'>
								8. Contact Information
							</h2>
							<div className='space-y-4 text-gray-300'>
								<p>
									For questions about
									these terms, please
									contact us:
								</p>
								<ul className='list-none space-y-2'>
									<li>
										Email:
										legal@herculesgym.com
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
