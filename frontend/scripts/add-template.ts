import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'app');
const EXCLUDED_PAGES = ['login', 'get-started'];

function addTemplateToPage(filePath: string) {
	const content = fs.readFileSync(filePath, 'utf8');

	// Skip if already has Template
	if (content.includes('import Template')) {
		return;
	}

	// Add Template import
	const newContent = content.replace(
		"'use client';",
		`'use client';\n\nimport Template from '@/components/layout/Template';`
	);

	// Wrap content with Template
	const wrappedContent = newContent.replace(
		/export default function .*?\{([\s\S]*?)return \(([\s\S]*?)\);/m,
		(match, beforeReturn, returnContent) => {
			return `export default function ${match.split('function ')[1].split('{')[0]}{${beforeReturn}return (\n\t<Template>${returnContent}</Template>\n);`;
		}
	);

	fs.writeFileSync(filePath, wrappedContent);
}

function processDirectory(dir: string) {
	const entries = fs.readdirSync(dir, {
		withFileTypes: true,
	});

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			// Skip excluded pages
			if (EXCLUDED_PAGES.includes(entry.name)) {
				continue;
			}
			processDirectory(fullPath);
		} else if (entry.name === 'page.tsx') {
			addTemplateToPage(fullPath);
		}
	}
}

processDirectory(PAGES_DIR);
