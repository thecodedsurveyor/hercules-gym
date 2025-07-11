import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	RadioGroup,
	RadioGroupItem,
} from '@/components/ui/radio-group';
import { User, Ruler, Scale, Calendar } from 'lucide-react';

interface BasicInfoStepProps {
	data: any;
	updateData: (data: any) => void;
}

export default function BasicInfoStep({
	data,
	updateData,
}: BasicInfoStepProps) {
	const handleInputChange = (
		field: string,
		value: string | number
	) => {
		updateData({ [field]: value });
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
						<User className='w-8 h-8 text-brand' />
					</div>
				</div>
				<p className='text-gray-300 max-w-lg mx-auto'>
					Let&apos;s get to know you better to
					personalize your fitness experience.
					This information helps us create the
					perfect workout and nutrition plans for
					you.
				</p>
			</motion.div>

			{/* Form Fields */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className='grid md:grid-cols-2 gap-6'
			>
				{/* Age */}
				<div className='space-y-3'>
					<Label className='text-white flex items-center gap-2'>
						<Calendar className='w-4 h-4 text-brand' />
						Age
					</Label>
					<Input
						type='number'
						placeholder='Enter your age'
						value={data.age || ''}
						onChange={(e) =>
							handleInputChange(
								'age',
								parseInt(e.target.value) ||
									0
							)
						}
						className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
						min='13'
						max='100'
					/>
					<p className='text-xs text-gray-500'>
						We use this to tailor exercise
						intensity and recommendations
					</p>
				</div>

				{/* Gender */}
				<div className='space-y-3'>
					<Label className='text-white flex items-center gap-2'>
						<User className='w-4 h-4 text-brand' />
						Gender
					</Label>
					<RadioGroup
						value={data.gender}
						onValueChange={(value) =>
							handleInputChange(
								'gender',
								value
							)
						}
						className='flex space-x-6'
					>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='male'
								id='male'
							/>
							<Label
								htmlFor='male'
								className='text-gray-300 cursor-pointer'
							>
								Male
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='female'
								id='female'
							/>
							<Label
								htmlFor='female'
								className='text-gray-300 cursor-pointer'
							>
								Female
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem
								value='other'
								id='other'
							/>
							<Label
								htmlFor='other'
								className='text-gray-300 cursor-pointer'
							>
								Other
							</Label>
						</div>
					</RadioGroup>
					<p className='text-xs text-gray-500'>
						Helps us calculate caloric needs and
						body composition
					</p>
				</div>

				{/* Height */}
				<div className='space-y-3'>
					<Label className='text-white flex items-center gap-2'>
						<Ruler className='w-4 h-4 text-brand' />
						Height (cm)
					</Label>
					<Input
						type='number'
						placeholder='Enter your height in cm'
						value={data.height || ''}
						onChange={(e) =>
							handleInputChange(
								'height',
								parseFloat(
									e.target.value
								) || 0
							)
						}
						className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
						min='120'
						max='250'
					/>
					<p className='text-xs text-gray-500'>
						Example: 175 cm (5&apos;9&quot;)
					</p>
				</div>

				{/* Weight */}
				<div className='space-y-3'>
					<Label className='text-white flex items-center gap-2'>
						<Scale className='w-4 h-4 text-brand' />
						Weight (kg)
					</Label>
					<Input
						type='number'
						placeholder='Enter your weight in kg'
						value={data.weight || ''}
						onChange={(e) =>
							handleInputChange(
								'weight',
								parseFloat(
									e.target.value
								) || 0
							)
						}
						className='bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-brand focus:ring-brand'
						min='30'
						max='300'
						step='0.1'
					/>
					<p className='text-xs text-gray-500'>
						Example: 70.5 kg (155 lbs)
					</p>
				</div>
			</motion.div>

			{/* BMI Display */}
			{data.height && data.weight && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					className='bg-brand/10 border border-brand/20 rounded-xl p-4'
				>
					<div className='text-center'>
						<h4 className='text-white font-semibold mb-2'>
							Your BMI
						</h4>
						<div className='text-2xl font-bold text-brand mb-1'>
							{(
								data.weight /
								(data.height / 100) ** 2
							).toFixed(1)}
						</div>
						<p className='text-sm text-gray-400'>
							Body Mass Index - We&apos;ll use
							this to personalize your plan
						</p>
					</div>
				</motion.div>
			)}

			{/* Privacy Note */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className='bg-gray-800/30 rounded-lg p-4 border border-gray-700/50'
			>
				<div className='flex items-start space-x-3'>
					<div className='w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0'></div>
					<div>
						<h4 className='text-white font-medium mb-1'>
							Privacy & Security
						</h4>
						<p className='text-sm text-gray-400 leading-relaxed'>
							Your personal information is
							encrypted and secure. We use
							this data only to create
							personalized fitness
							recommendations and track your
							progress. You can update or
							delete this information at any
							time in your profile settings.
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
