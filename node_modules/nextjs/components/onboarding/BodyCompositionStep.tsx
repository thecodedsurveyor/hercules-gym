import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	Ruler,
	Info,
	HelpCircle,
	SkipForward,
	Percent,
	Check,
} from 'lucide-react';

interface BodyCompositionStepProps {
	data: any;
	updateData: (data: any) => void;
}

const bodyFatRanges = {
	male: {
		essential: '2-5%',
		athlete: '6-13%',
		fitness: '14-17%',
		average: '18-24%',
		obese: '25%+',
	},
	female: {
		essential: '10-13%',
		athlete: '14-20%',
		fitness: '21-24%',
		average: '25-31%',
		obese: '32%+',
	},
};

export default function BodyCompositionStep({
	data,
	updateData,
}: BodyCompositionStepProps) {
	const [showBodyFatInfo, setShowBodyFatInfo] =
		useState(false);
	const [showMeasurementsInfo, setShowMeasurementsInfo] =
		useState(false);
	const [isSkipped, setIsSkipped] = useState(false);

	const handleMeasurementChange = (
		field: string,
		value: string
	) => {
		const numValue = parseFloat(value) || null;
		updateData({
			measurements: {
				...data.measurements,
				[field]: numValue,
			},
		});
	};

	const handleBodyFatChange = (value: string) => {
		const numValue = parseFloat(value) || null;
		updateData({ bodyFatPercentage: numValue });
	};

	const handleSkipStep = () => {
		setIsSkipped(true);
		updateData({
			bodyFatPercentage: null,
			measurements: {},
		});
	};

	return (
		<div className='space-y-8'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='text-center space-y-2'
			>
				<div className='flex justify-center mb-4'>
					<div className='bg-brand/10 p-3 rounded-full'>
						<Ruler className='w-8 h-8 text-brand' />
					</div>
				</div>
				<h3 className='text-xl font-semibold text-white mb-2'>
					Body Composition (Optional)
				</h3>
				<p className='text-gray-300 max-w-lg mx-auto'>
					This information is{' '}
					<span className='text-brand font-medium'>
						optional but recommended
					</span>
					. It helps us give you more precise
					recommendations and track your progress
					more effectively.
				</p>
			</motion.div>

			{/* Skip Option */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='flex justify-center'
			>
				<Button
					variant='outline'
					onClick={handleSkipStep}
					className={`flex items-center gap-2 ${
						isSkipped
							? 'bg-green-600/90 border-green-700 text-black'
							: 'bg-gray-600/90 border-gray-700 text-black hover:bg-gray-700'
					}`}
				>
					{isSkipped ? (
						<>
							<Check className='w-4 h-4' />
							Skipped - Continue below
						</>
					) : (
						<>
							<SkipForward className='w-4 h-4' />
							Skip this step for now
						</>
					)}
				</Button>
			</motion.div>

			{/* Body Fat Percentage */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='space-y-4'
			>
				<div className='flex items-center justify-between'>
					<Label className='text-white flex items-center gap-2'>
						<Percent className='w-4 h-4 text-brand' />
						Body Fat Percentage
					</Label>
					<Button
						variant='ghost'
						size='sm'
						onClick={() =>
							setShowBodyFatInfo(
								!showBodyFatInfo
							)
						}
						className='text-gray-400 hover:text-white'
					>
						<HelpCircle className='w-4 h-4' />
					</Button>
				</div>

				<Input
					type='number'
					placeholder='Enter your body fat % (if known)'
					value={data.bodyFatPercentage || ''}
					onChange={(e) =>
						handleBodyFatChange(e.target.value)
					}
					className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
					min='1'
					max='50'
					step='0.1'
				/>

				{showBodyFatInfo && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{
							opacity: 1,
							height: 'auto',
						}}
						exit={{ opacity: 0, height: 0 }}
						className='bg-blue-500/10 border border-blue-500/30 rounded-lg p-4'
					>
						<div className='flex items-start space-x-3'>
							<Info className='w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5' />
							<div>
								<h4 className='text-white font-medium mb-2'>
									Body Fat Percentage
									Guide
								</h4>
								<p className='text-sm text-gray-300 mb-3'>
									If you don&apos;t know
									your exact body fat
									percentage, you can
									estimate using visual
									guides online or body
									composition scales.
								</p>

								{data.gender && (
									<div className='space-y-2'>
										<p className='text-sm font-medium text-blue-300'>
											Ranges for{' '}
											{data.gender ===
											'male'
												? 'Men'
												: data.gender ===
													  'female'
													? 'Women'
													: 'Adults'}
											:
										</p>
										<div className='grid grid-cols-2 gap-2 text-xs'>
											{Object.entries(
												bodyFatRanges[
													data.gender as keyof typeof bodyFatRanges
												] ||
													bodyFatRanges.male
											).map(
												([
													category,
													range,
												]) => (
													<div
														key={
															category
														}
														className='flex justify-between'
													>
														<span className='text-gray-400 capitalize'>
															{
																category
															}

															:
														</span>
														<span className='text-gray-300'>
															{
																range
															}
														</span>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</motion.div>

			{/* Body Measurements */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className='space-y-4'
			>
				<div className='flex items-center justify-between'>
					<Label className='text-white flex items-center gap-2'>
						<Ruler className='w-4 h-4 text-brand' />
						Body Measurements (cm)
					</Label>
					<Button
						variant='ghost'
						size='sm'
						onClick={() =>
							setShowMeasurementsInfo(
								!showMeasurementsInfo
							)
						}
						className='text-gray-400 hover:text-white'
					>
						<HelpCircle className='w-4 h-4' />
					</Button>
				</div>

				{showMeasurementsInfo && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{
							opacity: 1,
							height: 'auto',
						}}
						exit={{ opacity: 0, height: 0 }}
						className='bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4'
					>
						<div className='flex items-start space-x-3'>
							<Info className='w-5 h-5 text-green-400 flex-shrink-0 mt-0.5' />
							<div>
								<h4 className='text-white font-medium mb-2'>
									How to Measure
								</h4>
								<div className='space-y-2 text-sm text-gray-300'>
									<div>
										<strong>
											Waist:
										</strong>{' '}
										Measure at the
										narrowest point,
										usually just above
										the belly button
									</div>
									<div>
										<strong>
											Chest:
										</strong>{' '}
										Measure around the
										fullest part of your
										chest
									</div>
									<div>
										<strong>
											Arms:
										</strong>{' '}
										Measure around the
										largest part of your
										upper arm (bicep)
									</div>
									<div>
										<strong>
											Thighs:
										</strong>{' '}
										Measure around the
										largest part of your
										thigh
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}

				<div className='grid md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<Label className='text-gray-300'>
							Waist
						</Label>
						<Input
							type='number'
							placeholder='Waist measurement'
							value={
								data.measurements?.waist ||
								''
							}
							onChange={(e) =>
								handleMeasurementChange(
									'waist',
									e.target.value
								)
							}
							className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
							min='50'
							max='200'
							step='0.1'
						/>
					</div>

					<div className='space-y-2'>
						<Label className='text-gray-300'>
							Chest
						</Label>
						<Input
							type='number'
							placeholder='Chest measurement'
							value={
								data.measurements?.chest ||
								''
							}
							onChange={(e) =>
								handleMeasurementChange(
									'chest',
									e.target.value
								)
							}
							className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
							min='60'
							max='200'
							step='0.1'
						/>
					</div>

					<div className='space-y-2'>
						<Label className='text-gray-300'>
							Arms (Bicep)
						</Label>
						<Input
							type='number'
							placeholder='Arm measurement'
							value={
								data.measurements?.arms ||
								''
							}
							onChange={(e) =>
								handleMeasurementChange(
									'arms',
									e.target.value
								)
							}
							className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
							min='20'
							max='60'
							step='0.1'
						/>
					</div>

					<div className='space-y-2'>
						<Label className='text-gray-300'>
							Thighs
						</Label>
						<Input
							type='number'
							placeholder='Thigh measurement'
							value={
								data.measurements?.thighs ||
								''
							}
							onChange={(e) =>
								handleMeasurementChange(
									'thighs',
									e.target.value
								)
							}
							className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
							min='30'
							max='100'
							step='0.1'
						/>
					</div>
				</div>
			</motion.div>

			{/* Benefits Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className='bg-brand/10 border border-brand/20 rounded-xl p-6'
			>
				<h4 className='text-white font-semibold mb-3'>
					Why This Helps
				</h4>
				<div className='grid md:grid-cols-2 gap-4 text-sm text-gray-300'>
					<div className='space-y-2'>
						<div className='flex items-start space-x-2'>
							<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
							<span>
								More accurate calorie and
								macro calculations
							</span>
						</div>
						<div className='flex items-start space-x-2'>
							<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
							<span>
								Precise progress tracking
								over time
							</span>
						</div>
					</div>
					<div className='space-y-2'>
						<div className='flex items-start space-x-2'>
							<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
							<span>
								Customized workout intensity
								recommendations
							</span>
						</div>
						<div className='flex items-start space-x-2'>
							<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
							<span>
								Better body composition
								change tracking
							</span>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Note */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className='text-center'
			>
				<p className='text-xs text-gray-500'>
					<strong>Note:</strong> You can always
					add or update these measurements later
					in your profile settings. Even partial
					information helps us create better
					recommendations for you.
				</p>
			</motion.div>
		</div>
	);
}
