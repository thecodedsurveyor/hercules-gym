import { motion } from 'framer-motion';
import {
	Utensils,
	Leaf,
	Fish,
	Wheat,
	Milk,
	Heart,
	AlertTriangle,
} from 'lucide-react';

interface DietaryPreferencesStepProps {
	data: any;
	updateData: (data: any) => void;
}

const dietaryOptions = [
	{
		id: 'none',
		title: 'No Restrictions',
		description:
			'I eat everything and have no dietary restrictions',
		icon: <Utensils className='w-6 h-6' />,
		color: 'from-gray-500/20 to-gray-600/20',
		borderColor: 'border-gray-500/30',
		category: 'general',
	},
	{
		id: 'vegetarian',
		title: 'Vegetarian',
		description: 'No meat, but includes dairy and eggs',
		icon: <Leaf className='w-6 h-6' />,
		color: 'from-green-500/20 to-emerald-500/20',
		borderColor: 'border-green-500/30',
		category: 'lifestyle',
	},
	{
		id: 'vegan',
		title: 'Vegan',
		description: 'No animal products whatsoever',
		icon: <Leaf className='w-6 h-6' />,
		color: 'from-green-600/20 to-green-700/20',
		borderColor: 'border-green-600/30',
		category: 'lifestyle',
	},
	{
		id: 'pescatarian',
		title: 'Pescatarian',
		description:
			'Vegetarian diet that includes fish and seafood',
		icon: <Fish className='w-6 h-6' />,
		color: 'from-blue-500/20 to-cyan-500/20',
		borderColor: 'border-blue-500/30',
		category: 'lifestyle',
	},
	{
		id: 'keto',
		title: 'Ketogenic (Keto)',
		description:
			'High fat, low carb diet (typically <20g carbs/day)',
		icon: <Heart className='w-6 h-6' />,
		color: 'from-purple-500/20 to-pink-500/20',
		borderColor: 'border-purple-500/30',
		category: 'diet',
	},
	{
		id: 'paleo',
		title: 'Paleo',
		description:
			'Whole foods, no processed foods, grains, or legumes',
		icon: <Utensils className='w-6 h-6' />,
		color: 'from-orange-500/20 to-red-500/20',
		borderColor: 'border-orange-500/30',
		category: 'diet',
	},
	{
		id: 'gluten-free',
		title: 'Gluten-Free',
		description:
			'Avoiding wheat, barley, rye and other gluten-containing grains',
		icon: <Wheat className='w-6 h-6' />,
		color: 'from-yellow-500/20 to-amber-500/20',
		borderColor: 'border-yellow-500/30',
		category: 'allergy',
	},
	{
		id: 'lactose-intolerant',
		title: 'Lactose Intolerant',
		description:
			'Avoiding dairy products due to lactose intolerance',
		icon: <Milk className='w-6 h-6' />,
		color: 'from-blue-400/20 to-blue-500/20',
		borderColor: 'border-blue-400/30',
		category: 'allergy',
	},
];

const categories = {
	general: 'General',
	lifestyle: 'Lifestyle Choices',
	diet: 'Specific Diets',
	allergy: 'Allergies & Intolerances',
};

export default function DietaryPreferencesStep({
	data,
	updateData,
}: DietaryPreferencesStepProps) {
	const selectedPreferences =
		data.dietaryPreferences || [];

	const togglePreference = (preferenceId: string) => {
		let newPreferences;

		// If "No Restrictions" is selected, clear all others
		if (preferenceId === 'none') {
			newPreferences = selectedPreferences.includes(
				'none'
			)
				? []
				: ['none'];
		} else {
			// If selecting any other option, remove "No Restrictions"
			const filteredPreferences =
				selectedPreferences.filter(
					(pref: string) => pref !== 'none'
				);

			if (
				filteredPreferences.includes(preferenceId)
			) {
				newPreferences = filteredPreferences.filter(
					(pref: string) => pref !== preferenceId
				);
			} else {
				newPreferences = [
					...filteredPreferences,
					preferenceId,
				];
			}
		}

		updateData({ dietaryPreferences: newPreferences });
	};

	const groupedOptions = Object.entries(categories).map(
		([categoryKey, categoryName]) => ({
			category: categoryKey,
			name: categoryName,
			options: dietaryOptions.filter(
				(option) => option.category === categoryKey
			),
		})
	);

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
						<Utensils className='w-8 h-8 text-brand' />
					</div>
				</div>
				<p className='text-gray-300 max-w-lg mx-auto'>
					Tell us about your dietary preferences
					and restrictions. This helps us
					recommend meals that fit your lifestyle
					and nutritional needs.
				</p>
			</motion.div>

			{/* Dietary Options by Category */}
			<div className='space-y-8'>
				{groupedOptions.map((group, groupIndex) => (
					<motion.div
						key={group.category}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.1 * groupIndex,
						}}
						className='space-y-4'
					>
						<h3 className='text-lg font-semibold text-white mb-4'>
							{group.name}
						</h3>

						<div className='grid gap-4'>
							{group.options.map(
								(option, index) => {
									const isSelected =
										selectedPreferences.includes(
											option.id
										);

									return (
										<motion.div
											key={option.id}
											initial={{
												opacity: 0,
												x: -20,
											}}
											animate={{
												opacity: 1,
												x: 0,
											}}
											transition={{
												delay:
													0.05 *
													index,
											}}
											onClick={() =>
												togglePreference(
													option.id
												)
											}
											className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${
							isSelected
								? `bg-gradient-to-r ${option.color} ${option.borderColor} border-opacity-100`
								: 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
						}
                    `}
										>
											<div className='flex items-start space-x-4'>
												<div
													className={`p-3 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-gray-700/50'}`}
												>
													<div
														className={
															isSelected
																? 'text-white'
																: 'text-gray-400'
														}
													>
														{
															option.icon
														}
													</div>
												</div>
												<div className='flex-1'>
													<h4
														className={`font-semibold mb-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}
													>
														{
															option.title
														}
													</h4>
													<p
														className={`text-sm ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}
													>
														{
															option.description
														}
													</p>
												</div>
												{isSelected && (
													<div className='text-white text-xl'>
														✓
													</div>
												)}
											</div>
										</motion.div>
									);
								}
							)}
						</div>
					</motion.div>
				))}
			</div>

			{/* Conflicting Selections Warning */}
			{selectedPreferences.includes('vegan') &&
				selectedPreferences.includes('keto') && (
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.95,
						}}
						animate={{ opacity: 1, scale: 1 }}
						className='bg-amber-500/10 border border-amber-500/30 rounded-lg p-4'
					>
						<div className='flex items-start space-x-3'>
							<AlertTriangle className='w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5' />
							<div>
								<h4 className='text-amber-300 font-medium mb-1'>
									Challenging Combination
								</h4>
								<p className='text-sm text-amber-200'>
									Combining vegan and keto
									diets can be
									challenging. We&apos;ll
									focus on high-fat
									plant-based foods, but
									options may be limited.
									Consider consulting with
									a nutritionist.
								</p>
							</div>
						</div>
					</motion.div>
				)}

			{/* Multiple Restrictions Notice */}
			{selectedPreferences.length > 3 &&
				!selectedPreferences.includes('none') && (
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.95,
						}}
						animate={{ opacity: 1, scale: 1 }}
						className='bg-blue-500/10 border border-blue-500/30 rounded-lg p-4'
					>
						<div className='flex items-start space-x-3'>
							<AlertTriangle className='w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5' />
							<div>
								<h4 className='text-blue-300 font-medium mb-1'>
									Multiple Restrictions
								</h4>
								<p className='text-sm text-blue-200'>
									With multiple dietary
									restrictions, we&apos;ll
									work hard to find
									suitable meal options.
									You might want to
									consider working with
									our nutritionist for
									personalized guidance.
								</p>
							</div>
						</div>
					</motion.div>
				)}

			{/* Benefits Summary */}
			{selectedPreferences.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className='bg-brand/10 border border-brand/20 rounded-xl p-6'
				>
					<h4 className='text-white font-semibold mb-3'>
						How This Helps
					</h4>
					<div className='grid md:grid-cols-2 gap-4 text-sm text-gray-300'>
						<div className='space-y-2'>
							<div className='flex items-start space-x-2'>
								<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
								<span>
									Personalized meal
									recommendations that fit
									your lifestyle
								</span>
							</div>
							<div className='flex items-start space-x-2'>
								<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
								<span>
									Recipe suggestions with
									ingredient substitutions
								</span>
							</div>
						</div>
						<div className='space-y-2'>
							<div className='flex items-start space-x-2'>
								<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
								<span>
									Nutritionally balanced
									meals within your
									restrictions
								</span>
							</div>
							<div className='flex items-start space-x-2'>
								<div className='w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0'></div>
								<span>
									Shopping lists tailored
									to your dietary needs
								</span>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Selection Summary */}
			{selectedPreferences.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className='bg-gray-800/50 rounded-lg p-4 border border-gray-700/50'
				>
					<h4 className='text-white font-medium mb-2'>
						Your Dietary Profile
					</h4>
					<div className='flex flex-wrap gap-2'>
						{selectedPreferences.map(
							(prefId: string) => {
								const option =
									dietaryOptions.find(
										(opt) =>
											opt.id ===
											prefId
									);
								return option ? (
									<span
										key={prefId}
										className='bg-brand/20 text-brand px-3 py-1 rounded-full text-sm font-medium'
									>
										{option.title}
									</span>
								) : null;
							}
						)}
					</div>
					<p className='text-xs text-gray-400 mt-2'>
						You can always update these
						preferences later in your profile
						settings.
					</p>
				</motion.div>
			)}
		</div>
	);
}
