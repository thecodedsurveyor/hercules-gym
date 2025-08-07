// Optimized framer-motion imports - only import what we actually use
export { motion, AnimatePresence } from 'framer-motion';

// Pre-configured motion variants for common animations
export const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
};

export const fadeIn = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.3 },
};

export const slideInUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.4, ease: 'easeOut' },
};

export const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};
