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
			'framer-motion',
			'@radix-ui/react-icons',
		],
		// Enable webpack memory optimizations
		webpackMemoryOptimizations: true,
		// Enable server components
		serverComponentsExternalPackages: [
			'@prisma/client',
		],
		// Enable turbo
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
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
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days for better caching
		// Enable modern image formats
		formats: ['image/webp', 'image/avif'],
		// Optimize image loading
		loader: 'default',
		// Enable blur placeholder
		placeholder: 'blur',
		// Add content security policy
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
	},

	// Enable compression
	compress: true,

	// Optimize bundle
	swcMinify: true,

	// Enable source maps for development
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
					framer: {
						test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
						name: 'framer-motion',
						chunks: 'all',
						priority: 20,
					},
					radix: {
						test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
						name: 'radix-ui',
						chunks: 'all',
						priority: 15,
					},
				},
			};
		}

		// Optimize for performance
		config.optimization.minimize = true;
		config.optimization.minimizer =
			config.optimization.minimizer || [];

		// Add performance hints
		config.performance = {
			hints: dev ? false : 'warning',
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		};

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
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
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
				source: '/images/(.*)',
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
						value: 'public, max-age=3600, s-maxage=3600',
					},
				],
			},
		];
	},

	// Enable redirects for SEO
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true,
			},
		];
	},

	// Enable rewrites for better routing
	async rewrites() {
		return [
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap',
			},
		];
	},

	// Enable PWA
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === 'development',
	},
};

module.exports = nextConfig;
