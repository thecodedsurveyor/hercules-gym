const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...');

// Run bundle analyzer
try {
	execSync('npx @next/bundle-analyzer', {
		stdio: 'inherit',
	});
	console.log('✅ Bundle analysis completed!');
} catch (error) {
	console.error(
		'❌ Bundle analysis failed:',
		error.message
	);
}

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

console.log('\n📦 Dependency Analysis:');
console.log('Large dependencies (>1MB estimated):');

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

largeDeps.forEach((dep) => {
	if (dependencies[dep]) {
		console.log(`  - ${dep}: ${dependencies[dep]}`);
	}
});

console.log('\n💡 Optimization Recommendations:');
console.log(
	'1. Consider code splitting for large components'
);
console.log('2. Use dynamic imports for heavy libraries');
console.log('3. Optimize images with next/image');
console.log('4. Implement proper caching strategies');
console.log('5. Use React.memo for expensive components');
