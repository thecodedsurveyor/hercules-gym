const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing bundle size...\n');

// Check if @next/bundle-analyzer is installed
try {
	require('@next/bundle-analyzer');
} catch (error) {
	console.log('Installing @next/bundle-analyzer...');
	execSync(
		'npm install --save-dev @next/bundle-analyzer',
		{ stdio: 'inherit' }
	);
}

// Run bundle analysis
console.log('Running bundle analysis...');
execSync('ANALYZE=true npm run build', {
	stdio: 'inherit',
});

console.log('\n✅ Bundle analysis complete!');
console.log(
	'📊 Check the generated HTML files in the .next/analyze directory for detailed bundle information.'
);
console.log(
	'💡 Look for large dependencies that can be optimized or lazy-loaded.'
);
