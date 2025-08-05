/** @type {import('next').NextConfig} */
const nextConfig = {
	// Remove static export to enable SSR and optimizations
	// output: 'export', // REMOVED - enables SSR, SSG, and other optimizations

	eslint: {
		ignoreDuringBuilds: true,
	},

	// Enable experimental optimizations
	experimental: {
		// Enable optimized router scrolling
		optimizeRouterScrolling: true,
		// Enable package import optimization
		optimizePackageImports: [
			'lucide-react',
			'@radix-ui/react-icons',
		],
		// Enable webpack memory optimizations
		webpackMemoryOptimizations: true,
		// Enable turbo for faster builds
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
		// Enable concurrent features
		concurrentFeatures: true,
		// Enable server components
		serverComponentsExternalPackages: [
			'@prisma/client',
		],
	},

	// Optimize images
	images: {
		// Enable image optimization
		unoptimized: false, // ENABLED - enables automatic image optimization
		domains: [
			'images.unsplash.com',
			'picsum.photos',
			'images.pexels.com',
		],
		deviceSizes: [
			640, 750, 828, 1080, 1200, 1920, 2048, 3840,
		],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days for better caching
		// Enable modern image formats
		formats: ['image/webp', 'image/avif'],
		// Optimize image loading
		loader: 'default',
		// Enable blur placeholder
		placeholder: 'blur',
		// Enable priority loading for above-the-fold images
		priority: true,
	},

	// Enable compression
	compress: true,

	// Optimize bundle
	swcMinify: true,

	// Enable source maps for development only
	productionBrowserSourceMaps: false,

	// Optimize webpack
	webpack: (config, { dev, isServer }) => {
		// Optimize bundle splitting
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
						priority: 10,
					},
					common: {
						name: 'common',
						minChunks: 2,
						chunks: 'all',
						priority: 5,
					},
					// Separate React and Next.js
					react: {
						test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
						name: 'react',
						chunks: 'all',
						priority: 20,
					},
					// Separate UI libraries
					ui: {
						test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
						name: 'ui',
						chunks: 'all',
						priority: 15,
					},
				},
			};
		}

		// Optimize for production
		if (!dev) {
			config.optimization.minimize = true;
			config.optimization.minimizer =
				config.optimization.minimizer || [];
		}

		return config;
	},

	// Enable headers for better caching
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
			{
				source: '/_next/static/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/_next/image/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/api/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=300, s-maxage=600',
					},
				],
			},
		];
	},

	// Enable redirects for better SEO and performance
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
