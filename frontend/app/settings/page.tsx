'use client';

import React, { useState, useEffect } from 'react';
import {
	Trophy,
	Settings,
	Bell,
	Shield,
	User,
	Moon,
	Sun,
	Lock,
	Mail,
	Smartphone,
	Globe,
	Eye,
	EyeOff,
	Save,
	ArrowLeft,
	Trash2,
	Download,
	Upload,
} from 'lucide-react';

interface UserData {
	id: string;
	name: string;
	email: string;
	profileImage?: string;
}

interface SettingsData {
	notifications: {
		workout: boolean;
		meal: boolean;
		achievements: boolean;
		social: boolean;
		emailNotifications: boolean;
		pushNotifications: boolean;
	};
	privacy: {
		profileVisibility: 'public' | 'private' | 'friends';
		showProgress: boolean;
		showStats: boolean;
		showAchievements: boolean;
	};
	preferences: {
		theme: 'light' | 'dark' | 'system';
		language: string;
		timezone: string;
		units: 'metric' | 'imperial';
	};
	account: {
		twoFactorEnabled: boolean;
		dataExport: boolean;
	};
}

export default function SettingsPage() {
	const [userData, setUserData] =
		useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [activeTab, setActiveTab] =
		useState('notifications');
	const [showPassword, setShowPassword] = useState(false);
	const [settings, setSettings] = useState<SettingsData>({
		notifications: {
			workout: true,
			meal: true,
			achievements: true,
			social: false,
			emailNotifications: true,
			pushNotifications: true,
		},
		privacy: {
			profileVisibility: 'public',
			showProgress: true,
			showStats: true,
			showAchievements: true,
		},
		preferences: {
			theme: 'dark',
			language: 'en',
			timezone: 'UTC',
			units: 'metric',
		},
		account: {
			twoFactorEnabled: false,
			dataExport: false,
		},
	});

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (!user) {
			window.location.href = '/login';
			return;
		}

		try {
			const parsedUser = JSON.parse(user);
			setUserData(parsedUser);

			// Load settings from localStorage or use defaults
			const savedSettings =
				localStorage.getItem('userSettings');
			if (savedSettings) {
				setSettings(JSON.parse(savedSettings));
			}
		} catch (error) {
			console.error(
				'Error parsing user data:',
				error
			);
			window.location.href = '/login';
		} finally {
			setLoading(false);
		}
	}, []);

	const themeClasses = {
		bg: {
			primary: isDarkMode
				? 'bg-gray-900'
				: 'bg-gray-50',
			secondary: isDarkMode
				? 'bg-gray-800'
				: 'bg-white',
			tertiary: isDarkMode
				? 'bg-gray-700'
				: 'bg-gray-100',
			card: isDarkMode ? 'bg-gray-800' : 'bg-white',
			gradient:
				'bg-gradient-to-r from-blue-600 to-purple-600',
		},
		text: {
			primary: isDarkMode
				? 'text-white'
				: 'text-gray-900',
			secondary: isDarkMode
				? 'text-gray-300'
				: 'text-gray-600',
			tertiary: isDarkMode
				? 'text-gray-400'
				: 'text-gray-500',
			muted: isDarkMode
				? 'text-gray-500'
				: 'text-gray-400',
		},
		border: {
			primary: isDarkMode
				? 'border-gray-700'
				: 'border-gray-200',
			secondary: isDarkMode
				? 'border-gray-600'
				: 'border-gray-300',
		},
		hover: {
			bg: isDarkMode
				? 'hover:bg-gray-700'
				: 'hover:bg-gray-50',
			card: isDarkMode
				? 'hover:bg-gray-700'
				: 'hover:bg-gray-50',
		},
	};

	const handleSettingsChange = (
		section: keyof SettingsData,
		key: string,
		value: any
	) => {
		setSettings((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				[key]: value,
			},
		}));
	};

	const handleSave = () => {
		localStorage.setItem(
			'userSettings',
			JSON.stringify(settings)
		);
		// In a real app, you would save to your backend
		alert('Settings saved successfully!');
	};

	const handleExportData = () => {
		const dataToExport = {
			user: userData,
			settings: settings,
			exportDate: new Date().toISOString(),
		};

		const dataStr = JSON.stringify(
			dataToExport,
			null,
			2
		);
		const dataUri =
			'data:application/json;charset=utf-8,' +
			encodeURIComponent(dataStr);

		const exportFileDefaultName =
			'hercules-gym-data.json';

		const linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute(
			'download',
			exportFileDefaultName
		);
		linkElement.click();
	};

	const tabs = [
		{
			id: 'notifications',
			label: 'Notifications',
			icon: Bell,
		},
		{ id: 'privacy', label: 'Privacy', icon: Shield },
		{
			id: 'preferences',
			label: 'Preferences',
			icon: Settings,
		},
		{ id: 'account', label: 'Account', icon: User },
	];

	if (loading) {
		return (
			<div
				className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} flex items-center justify-center`}
			>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent mx-auto mb-4'></div>
					<p
						className={
							themeClasses.text.secondary
						}
					>
						Loading settings...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary}`}
		>
			{/* Header */}
			<div
				className={`${themeClasses.bg.secondary} ${themeClasses.border.primary} border-b sticky top-0 z-10 transition-colors duration-300`}
			>
				<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() =>
									window.history.back()
								}
								className={`p-2 rounded-lg ${themeClasses.hover.bg} ${themeClasses.text.primary} transition-colors`}
							>
								<ArrowLeft className='w-5 h-5' />
							</button>
							<div className='flex items-center space-x-2'>
								<div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
									<Trophy className='w-5 h-5 text-white' />
								</div>
								<h1
									className={`text-xl font-bold ${themeClasses.text.primary}`}
								>
									Settings
								</h1>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() =>
									setIsDarkMode(
										!isDarkMode
									)
								}
								className={`w-8 h-8 ${isDarkMode ? 'bg-yellow-100' : 'bg-gray-100'} rounded-full flex items-center justify-center ${themeClasses.hover.bg} transition-colors`}
							>
								{isDarkMode ? (
									<Sun className='w-4 h-4 text-yellow-600' />
								) : (
									<Moon className='w-4 h-4 text-gray-600' />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div
						className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300 h-fit`}
					>
						<h2
							className={`text-lg font-bold ${themeClasses.text.primary} mb-4`}
						>
							Settings
						</h2>
						<div className='space-y-2'>
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() =>
										setActiveTab(tab.id)
									}
									className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
										activeTab === tab.id
											? 'bg-blue-600 text-white'
											: `${themeClasses.text.primary} ${themeClasses.hover.bg}`
									}`}
								>
									<tab.icon className='w-5 h-5' />
									<span>{tab.label}</span>
								</button>
							))}
						</div>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3 space-y-6'>
						{/* Notifications Tab */}
						{activeTab === 'notifications' && (
							<div
								className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
							>
								<h3
									className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
								>
									Notification Settings
								</h3>

								<div className='space-y-6'>
									<div>
										<h4
											className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}
										>
											App
											Notifications
										</h4>
										<div className='space-y-4'>
											{Object.entries(
												settings.notifications
											)
												.slice(0, 4)
												.map(
													([
														key,
														value,
													]) => (
														<div
															key={
																key
															}
															className='flex items-center justify-between'
														>
															<div>
																<p
																	className={`${themeClasses.text.primary} font-medium`}
																>
																	{key
																		.charAt(
																			0
																		)
																		.toUpperCase() +
																		key.slice(
																			1
																		)}{' '}
																	Reminders
																</p>
																<p
																	className={`text-sm ${themeClasses.text.secondary}`}
																>
																	Get
																	notifications
																	for{' '}
																	{
																		key
																	}{' '}
																	activities
																</p>
															</div>
															<label className='relative inline-flex items-center cursor-pointer'>
																<input
																	type='checkbox'
																	checked={
																		value
																	}
																	onChange={(
																		e
																	) =>
																		handleSettingsChange(
																			'notifications',
																			key,
																			e
																				.target
																				.checked
																		)
																	}
																	className='sr-only peer'
																/>
																<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
															</label>
														</div>
													)
												)}
										</div>
									</div>

									<div>
										<h4
											className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}
										>
											Delivery Methods
										</h4>
										<div className='space-y-4'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center space-x-3'>
													<Mail className='w-5 h-5 text-blue-600' />
													<div>
														<p
															className={`${themeClasses.text.primary} font-medium`}
														>
															Email
															Notifications
														</p>
														<p
															className={`text-sm ${themeClasses.text.secondary}`}
														>
															Receive
															notifications
															via
															email
														</p>
													</div>
												</div>
												<label className='relative inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														checked={
															settings
																.notifications
																.emailNotifications
														}
														onChange={(
															e
														) =>
															handleSettingsChange(
																'notifications',
																'emailNotifications',
																e
																	.target
																	.checked
															)
														}
														className='sr-only peer'
													/>
													<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
												</label>
											</div>
											<div className='flex items-center justify-between'>
												<div className='flex items-center space-x-3'>
													<Smartphone className='w-5 h-5 text-green-600' />
													<div>
														<p
															className={`${themeClasses.text.primary} font-medium`}
														>
															Push
															Notifications
														</p>
														<p
															className={`text-sm ${themeClasses.text.secondary}`}
														>
															Receive
															push
															notifications
															on
															your
															device
														</p>
													</div>
												</div>
												<label className='relative inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														checked={
															settings
																.notifications
																.pushNotifications
														}
														onChange={(
															e
														) =>
															handleSettingsChange(
																'notifications',
																'pushNotifications',
																e
																	.target
																	.checked
															)
														}
														className='sr-only peer'
													/>
													<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Privacy Tab */}
						{activeTab === 'privacy' && (
							<div
								className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
							>
								<h3
									className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
								>
									Privacy Settings
								</h3>

								<div className='space-y-6'>
									<div>
										<label
											className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
										>
											Profile
											Visibility
										</label>
										<select
											value={
												settings
													.privacy
													.profileVisibility
											}
											onChange={(e) =>
												handleSettingsChange(
													'privacy',
													'profileVisibility',
													e.target
														.value
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value='public'>
												Public
											</option>
											<option value='private'>
												Private
											</option>
											<option value='friends'>
												Friends Only
											</option>
										</select>
									</div>

									<div className='space-y-4'>
										<h4
											className={`text-lg font-semibold ${themeClasses.text.primary}`}
										>
											What others can
											see
										</h4>
										{Object.entries(
											settings.privacy
										)
											.filter(
												([key]) =>
													key !==
													'profileVisibility'
											)
											.map(
												([
													key,
													value,
												]) => (
													<div
														key={
															key
														}
														className='flex items-center justify-between'
													>
														<div>
															<p
																className={`${themeClasses.text.primary} font-medium`}
															>
																{key
																	.replace(
																		/([A-Z])/g,
																		' $1'
																	)
																	.replace(
																		/^./,
																		(
																			str
																		) =>
																			str.toUpperCase()
																	)}
															</p>
															<p
																className={`text-sm ${themeClasses.text.secondary}`}
															>
																Allow
																others
																to
																see
																your{' '}
																{key
																	.replace(
																		/([A-Z])/g,
																		' $1'
																	)
																	.toLowerCase()}
															</p>
														</div>
														<label className='relative inline-flex items-center cursor-pointer'>
															<input
																type='checkbox'
																checked={Boolean(
																	value
																)}
																onChange={(
																	e
																) =>
																	handleSettingsChange(
																		'privacy',
																		key,
																		e
																			.target
																			.checked
																	)
																}
																className='sr-only peer'
															/>
															<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
														</label>
													</div>
												)
											)}
									</div>
								</div>
							</div>
						)}

						{/* Preferences Tab */}
						{activeTab === 'preferences' && (
							<div
								className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
							>
								<h3
									className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
								>
									Preferences
								</h3>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div>
										<label
											className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
										>
											Theme
										</label>
										<select
											value={
												settings
													.preferences
													.theme
											}
											onChange={(e) =>
												handleSettingsChange(
													'preferences',
													'theme',
													e.target
														.value
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value='light'>
												Light
											</option>
											<option value='dark'>
												Dark
											</option>
											<option value='system'>
												System
											</option>
										</select>
									</div>

									<div>
										<label
											className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
										>
											Language
										</label>
										<select
											value={
												settings
													.preferences
													.language
											}
											onChange={(e) =>
												handleSettingsChange(
													'preferences',
													'language',
													e.target
														.value
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value='en'>
												English
											</option>
											<option value='es'>
												Español
											</option>
											<option value='fr'>
												Français
											</option>
											<option value='de'>
												Deutsch
											</option>
										</select>
									</div>

									<div>
										<label
											className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
										>
											Timezone
										</label>
										<select
											value={
												settings
													.preferences
													.timezone
											}
											onChange={(e) =>
												handleSettingsChange(
													'preferences',
													'timezone',
													e.target
														.value
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value='UTC'>
												UTC
											</option>
											<option value='EST'>
												Eastern Time
											</option>
											<option value='PST'>
												Pacific Time
											</option>
											<option value='GMT'>
												Greenwich
												Mean Time
											</option>
										</select>
									</div>

									<div>
										<label
											className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}
										>
											Units
										</label>
										<select
											value={
												settings
													.preferences
													.units
											}
											onChange={(e) =>
												handleSettingsChange(
													'preferences',
													'units',
													e.target
														.value
												)
											}
											className={`w-full px-3 py-2 border rounded-lg ${themeClasses.border.primary} ${themeClasses.bg.tertiary} ${themeClasses.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
										>
											<option value='metric'>
												Metric (kg,
												cm)
											</option>
											<option value='imperial'>
												Imperial
												(lbs, ft)
											</option>
										</select>
									</div>
								</div>
							</div>
						)}

						{/* Account Tab */}
						{activeTab === 'account' && (
							<div
								className={`${themeClasses.bg.card} rounded-xl p-6 shadow-sm ${themeClasses.border.primary} border transition-colors duration-300`}
							>
								<h3
									className={`text-xl font-bold ${themeClasses.text.primary} mb-6`}
								>
									Account Settings
								</h3>

								<div className='space-y-6'>
									<div>
										<h4
											className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}
										>
											Security
										</h4>
										<div className='space-y-4'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center space-x-3'>
													<Lock className='w-5 h-5 text-red-600' />
													<div>
														<p
															className={`${themeClasses.text.primary} font-medium`}
														>
															Two-Factor
															Authentication
														</p>
														<p
															className={`text-sm ${themeClasses.text.secondary}`}
														>
															Add
															extra
															security
															to
															your
															account
														</p>
													</div>
												</div>
												<label className='relative inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														checked={
															settings
																.account
																.twoFactorEnabled
														}
														onChange={(
															e
														) =>
															handleSettingsChange(
																'account',
																'twoFactorEnabled',
																e
																	.target
																	.checked
															)
														}
														className='sr-only peer'
													/>
													<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
												</label>
											</div>
										</div>
									</div>

									<div>
										<h4
											className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}
										>
											Data Management
										</h4>
										<div className='space-y-4'>
											<button
												onClick={
													handleExportData
												}
												className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border rounded-lg ${themeClasses.border.primary} ${themeClasses.text.primary} ${themeClasses.hover.bg} transition-colors`}
											>
												<Download className='w-5 h-5' />
												<span>
													Export
													My Data
												</span>
											</button>
											<button
												onClick={() => {
													if (
														confirm(
															'Are you sure you want to delete your account? This action cannot be undone.'
														)
													) {
														// Handle account deletion
														alert(
															'Account deletion requested. Please contact support.'
														);
													}
												}}
												className='w-full flex items-center justify-center space-x-2 px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors'
											>
												<Trash2 className='w-5 h-5' />
												<span>
													Delete
													Account
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Save Button */}
						<div className='flex justify-end'>
							<button
								onClick={handleSave}
								className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'
							>
								<Save className='w-5 h-5' />
								<span>Save Settings</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
