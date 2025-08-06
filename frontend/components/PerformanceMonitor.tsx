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

		// Check if PerformanceObserver is supported
		if (!('PerformanceObserver' in window)) {
			console.warn(
				'PerformanceObserver not supported'
			);
			return;
		}

		const metrics: PerformanceMetrics = {};

		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				// Log performance metrics
				console.log(
					`${entry.name}: ${entry.startTime}ms`
				);

				// Store metrics for reporting
				switch (entry.name) {
					case 'first-contentful-paint':
						metrics.FCP = entry.startTime;
						break;
					case 'largest-contentful-paint':
						metrics.LCP = entry.startTime;
						break;
					case 'first-input':
						metrics.FID =
							(entry as any).processingStart -
							entry.startTime;
						break;
				}

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
		try {
			observer.observe({
				entryTypes: [
					'paint',
					'largest-contentful-paint',
					'first-input',
					'layout-shift',
				],
			});
		} catch (error) {
			console.warn(
				'Failed to observe performance metrics:',
				error
			);
		}

		// Track Time to First Byte
		if ('PerformanceNavigationTiming' in window) {
			try {
				const navigation =
					performance.getEntriesByType(
						'navigation'
					)[0] as PerformanceNavigationTiming;
				if (navigation) {
					const ttfb =
						navigation.responseStart -
						navigation.requestStart;
					metrics.TTFB = ttfb;
					console.log(`TTFB: ${ttfb}ms`);
				}
			} catch (error) {
				console.warn(
					'Failed to track TTFB:',
					error
				);
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

		try {
			clsObserver.observe({
				entryTypes: ['layout-shift'],
			});
		} catch (error) {
			console.warn('Failed to observe CLS:', error);
		}

		// Report CLS when page is hidden
		const reportCLS = () => {
			if (clsValue > 0) {
				metrics.CLS = clsValue;
				console.log(`CLS: ${clsValue}`);

				// Send to analytics
				if (
					typeof window !== 'undefined' &&
					window.gtag
				) {
					window.gtag('event', 'performance', {
						event_category: 'Web Vitals',
						event_label: 'CLS',
						value:
							Math.round(clsValue * 1000) /
							1000,
					});
				}
			}
		};

		// Report metrics when page is hidden or after 5 seconds
		const reportMetrics = () => {
			reportCLS();

			// Log all collected metrics
			console.log('Performance Metrics:', metrics);

			// Send comprehensive metrics to analytics
			if (
				typeof window !== 'undefined' &&
				window.gtag
			) {
				window.gtag(
					'event',
					'performance_summary',
					{
						event_category: 'Web Vitals',
						FCP: metrics.FCP,
						LCP: metrics.LCP,
						CLS: metrics.CLS,
						FID: metrics.FID,
						TTFB: metrics.TTFB,
					}
				);
			}
		};

		// Report after 5 seconds or when page is hidden
		const timeoutId = setTimeout(reportMetrics, 5000);

		document.addEventListener(
			'visibilitychange',
			() => {
				if (document.visibilityState === 'hidden') {
					clearTimeout(timeoutId);
					reportMetrics();
				}
			}
		);

		// Cleanup
		return () => {
			clearTimeout(timeoutId);
			observer.disconnect();
			clsObserver.disconnect();
		};
	}, []);

	return null;
}
