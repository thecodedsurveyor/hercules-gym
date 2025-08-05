const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Performance Audit...\n');

// Check for common performance issues
function checkPerformanceIssues() {
	console.log(
		'🔍 Checking for Common Performance Issues...\n'
	);

	const issues = [];

	// Check for large dependencies
	const packageJson = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, '../package.json'),
			'utf8'
		)
	);
	const dependencies = {
		...packageJson.dependencies,
		...packageJson.devDependencies,
	};

	const largeDeps = [
		'react',
		'react-dom',
		'next',
		'@radix-ui',
		'lucide-react',
		'recharts',
		'date-fns',
		'zod',
		'tailwindcss',
	];

	console.log('📦 Dependency Analysis:');
	largeDeps.forEach((dep) => {
		if (dependencies[dep]) {
			console.log(`  - ${dep}: ${dependencies[dep]}`);
		}
	});

	// Check for image optimization
	const nextConfig = fs.readFileSync(
		path.join(__dirname, '../next.config.js'),
		'utf8'
	);
	if (nextConfig.includes('unoptimized: true')) {
		issues.push('❌ Image optimization is disabled');
	} else {
		console.log('✅ Image optimization is enabled');
	}

	// Check for static export - look for actual output: 'export' not commented
	if (
		nextConfig.includes("output: 'export'") &&
		!nextConfig.includes("// output: 'export'")
	) {
		issues.push(
			'❌ Static export is enabled (disables SSR/SSG)'
		);
	} else {
		console.log(
			'✅ Static export is disabled (SSR/SSG enabled)'
		);
	}

	// Check for experimental optimizations
	if (
		nextConfig.includes('optimizeRouterScrolling: true')
	) {
		console.log(
			'✅ Router scrolling optimization is enabled'
		);
	} else {
		issues.push(
			'⚠️  Router scrolling optimization is not enabled'
		);
	}

	// Check for bundle optimization
	if (nextConfig.includes('swcMinify: true')) {
		console.log('✅ SWC minification is enabled');
	} else {
		issues.push('⚠️  SWC minification is not enabled');
	}

	// Check for compression
	if (nextConfig.includes('compress: true')) {
		console.log('✅ Compression is enabled');
	} else {
		issues.push('⚠️  Compression is not enabled');
	}

	return issues;
}

// Check for performance optimizations in code
function checkCodeOptimizations() {
	console.log('\n🔍 Checking Code Optimizations...\n');

	const optimizations = [];
	const missing = [];

	// Check for lazy loading in dashboard
	const dashboardPath = path.join(
		__dirname,
		'../app/dashboard/page.tsx'
	);
	if (fs.existsSync(dashboardPath)) {
		const dashboardContent = fs.readFileSync(
			dashboardPath,
			'utf8'
		);
		if (
			dashboardContent.includes('lazy(') ||
			dashboardContent.includes('lazy(() => import(')
		) {
			optimizations.push(
				'✅ Lazy loading implemented in dashboard'
			);
		} else {
			missing.push(
				'⚠️  Lazy loading not implemented in dashboard'
			);
		}

		if (dashboardContent.includes('Suspense')) {
			optimizations.push(
				'✅ Suspense boundaries implemented'
			);
		} else {
			missing.push(
				'⚠️  Suspense boundaries not implemented'
			);
		}
	}

	// Check for React.memo usage
	const navbarPath = path.join(
		__dirname,
		'../components/Navbar.tsx'
	);
	if (fs.existsSync(navbarPath)) {
		const navbarContent = fs.readFileSync(
			navbarPath,
			'utf8'
		);
		if (navbarContent.includes('memo(')) {
			optimizations.push(
				'✅ React.memo implemented in Navbar'
			);
		} else {
			missing.push(
				'⚠️  React.memo not implemented in Navbar'
			);
		}
	}

	// Check for performance monitoring
	const performanceMonitorPath = path.join(
		__dirname,
		'../components/PerformanceMonitor.tsx'
	);
	if (fs.existsSync(performanceMonitorPath)) {
		optimizations.push(
			'✅ Performance monitoring component exists'
		);
	} else {
		missing.push(
			'⚠️  Performance monitoring component missing'
		);
	}

	return { optimizations, missing };
}

// Generate performance report
function generateReport(issues, codeChecks) {
	console.log('\n📋 Performance Report:\n');

	const allIssues = [...issues, ...codeChecks.missing];

	if (allIssues.length === 0) {
		console.log('🎉 All performance checks passed!');
		console.log(
			'✅ Your app is optimized for performance'
		);
	} else {
		console.log('⚠️  Performance issues found:');
		allIssues.forEach((issue) => {
			console.log(`  ${issue}`);
		});
	}

	if (codeChecks.optimizations.length > 0) {
		console.log('\n✅ Optimizations implemented:');
		codeChecks.optimizations.forEach((opt) => {
			console.log(`  ${opt}`);
		});
	}

	console.log('\n💡 Optimization Recommendations:');
	console.log(
		'1. Use next/image for automatic image optimization'
	);
	console.log(
		'2. Implement lazy loading for heavy components'
	);
	console.log(
		'3. Use React.memo for expensive components'
	);
	console.log('4. Enable route prefetching');
	console.log('5. Optimize bundle splitting');
	console.log('6. Use proper caching strategies');
	console.log('7. Monitor Core Web Vitals');

	console.log('\n🚀 Next Steps:');
	console.log(
		'1. Run "npm run dev" to start the development server'
	);
	console.log(
		'2. Open http://localhost:3000 in your browser'
	);
	console.log(
		'3. Use Chrome DevTools to check performance'
	);
	console.log(
		'4. Run Lighthouse audit in Chrome DevTools'
	);
	console.log(
		'5. Monitor Core Web Vitals in the Performance tab'
	);
	console.log(
		'6. Use "npm run analyze" to analyze bundle size'
	);
}

// Main execution
function main() {
	// Run checks
	const issues = checkPerformanceIssues();
	const codeChecks = checkCodeOptimizations();

	// Generate report
	generateReport(issues, codeChecks);

	console.log('\n✅ Performance audit completed!');
}

// Run the audit
main();
