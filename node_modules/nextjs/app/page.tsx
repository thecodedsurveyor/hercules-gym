'use client';

import HeroSection from '@/components/landing/HeroSection';
import ServicesTicker from '@/components/landing/ServicesTicker';
import PersonalTrainingSection from '@/components/landing/PersonalTrainingSection';
import ProgramsSection from '@/components/landing/ProgramsSection';
import PricingSection from '@/components/landing/PricingSection';
import TeamSection from '@/components/landing/TeamSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import BlogSection from '@/components/landing/BlogSection';
import InstagramSection from '@/components/landing/InstagramSection';
import NewsletterSection from '@/components/landing/NewsletterSection';
import Template from '@/components/layout/Template';

export default function Home() {
	return (
		<Template>
			<div className='min-h-screen bg-black text-white overflow-x-hidden'>
				<HeroSection />
				<ServicesTicker />
				<PersonalTrainingSection />
				<ProgramsSection />
				<PricingSection />
				<TeamSection />
				<TestimonialsSection />
				<CTASection />
				<BlogSection />
				<InstagramSection />
				<NewsletterSection />
			</div>
		</Template>
	);
}
