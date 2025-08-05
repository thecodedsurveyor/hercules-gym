const CACHE_NAME = 'hercules-gym-images-v1';
const IMAGE_CACHE_NAME = 'hercules-gym-unsplash-images-v1';

// Install event - cache static assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(['/', '/offline.html']);
		})
	);
});

// Fetch event - handle image caching
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Handle Unsplash images
	if (
		url.hostname === 'images.unsplash.com' ||
		url.hostname === 'picsum.photos'
	) {
		event.respondWith(handleImageRequest(request));
		return;
	}

	// Handle other requests
	event.respondWith(
		caches.match(request).then((response) => {
			return response || fetch(request);
		})
	);
});

async function handleImageRequest(request) {
	const cache = await caches.open(IMAGE_CACHE_NAME);
	const cachedResponse = await cache.match(request);

	if (cachedResponse) {
		return cachedResponse;
	}

	try {
		const response = await fetch(request);

		if (response.ok) {
			// Clone the response before caching
			const responseToCache = response.clone();
			cache.put(request, responseToCache);
		}

		return response;
	} catch (error) {
		// Return a fallback image if network fails
		const fallbackResponse = await cache.match(
			'/fallback-image.jpg'
		);
		if (fallbackResponse) {
			return fallbackResponse;
		}

		// Create a simple fallback response
		return new Response(
			`<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">
          Image not available offline
        </text>
      </svg>`,
			{
				headers: {
					'Content-Type': 'image/svg+xml',
				},
			}
		);
	}
}

// Clean up old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (
						cacheName !== CACHE_NAME &&
						cacheName !== IMAGE_CACHE_NAME
					) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
