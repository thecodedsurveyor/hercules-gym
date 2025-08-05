'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
	FCP?: number;
	LCP?: number;
	CLS?: number;
	FID?: number;
	TTFB?: number;
}

export default function PerformanceMonitor() {
	useEffect(() => {
		// Only run in production
		if (process.env.NODE_ENV !== 'production') return;

		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				// Log performance metrics
				console.log(
					`${entry.name}: ${entry.startTime}ms`
				);

				// Send to analytics service (replace with your analytics)
				if (
					typeof window !== 'undefined' &&
					window.gtag
				) {
					window.gtag('event', 'performance', {
						event_category: 'Web Vitals',
						event_label: entry.name,
						value: Math.round(entry.startTime),
					});
				}
			}
		});

		// Observe Core Web Vitals
		observer.observe({
			entryTypes: [
				'paint',
				'largest-contentful-paint',
				'first-input',
				'layout-shift',
			],
		});

		// Track First Contentful Paint
		if ('PerformanceObserver' in window) {
			const paintObserver = new PerformanceObserver(
				(list) => {
					for (const entry of list.getEntries()) {
						if (
							entry.name ===
							'first-contentful-paint'
						) {
							console.log(
								`FCP: ${entry.startTime}ms`
							);
						}
					}
				}
			);
			paintObserver.observe({
				entryTypes: ['paint'],
			});
		}

		// Track Time to First Byte
		if ('PerformanceNavigationTiming' in window) {
			const navigation = performance.getEntriesByType(
				'navigation'
			)[0] as PerformanceNavigationTiming;
			if (navigation) {
				const ttfb =
					navigation.responseStart -
					navigation.requestStart;
				console.log(`TTFB: ${ttfb}ms`);
			}
		}

		// Track Cumulative Layout Shift
		let clsValue = 0;
		let clsEntries: PerformanceEntry[] = [];

		const clsObserver = new PerformanceObserver(
			(list) => {
				for (const entry of list.getEntries()) {
					if (!entry.hadRecentInput) {
						clsValue += (entry as any).value;
						clsEntries.push(entry);
					}
				}
			}
		);

		clsObserver.observe({
			entryTypes: ['layout-shift'],
		});

		// Report CLS when page is hidden
		const reportCLS = () => {
			if (clsValue > 0) {
				console.log(`CLS: ${clsValue}`);
			}
		};

		document.addEventListener(
			'visibilitychange',
			reportCLS
		);
		window.addEventListener('beforeunload', reportCLS);

		return () => {
			observer.disconnect();
			clsObserver.disconnect();
			document.removeEventListener(
				'visibilitychange',
				reportCLS
			);
			window.removeEventListener(
				'beforeunload',
				reportCLS
			);
		};
	}, []);

	return null;
}
