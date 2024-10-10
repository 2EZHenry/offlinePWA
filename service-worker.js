// service-worker.js
const CACHE_NAME = "pwa-cache-v3";
const OFFLINE_URL = "offline.html";
const urlsToCache = [
	"/",
	"/index.html",
	"/styles.css",
	"/app.js",
	"/offline.html",
	"/icon-192x192.png",
	"/icon-512x512.png",
];

// self.addEventListener("install", (event) => {
// 	console.log("Service Worker installing...");
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => {
// 			return cache.addAll(urlsToCache);
// 		})
// 	);
// });

// Existing install event
self.addEventListener("install", (event) => {
	console.log("Service Worker installing...");

	// Use the addAllBypassCache function to cache resources with 'reload'
	event.waitUntil(addAllBypassCache(CACHE_NAME, urlsToCache));
});

// Updated addAllBypassCache function to bypass cache using 'cache: reload'
async function addAllBypassCache(cacheName, urls) {
	const cache = await caches.open(cacheName);

	// Force each request to bypass the cache using 'cache: reload'
	const requests = urls.map((url) => new Request(url, { cache: "reload" }));

	// Add all requests to cache
	await cache.addAll(requests);
}

self.addEventListener("activate", (event) => {
	console.log("Service Worker activating...");
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// OLD CODE
// self.addEventListener("fetch", (event) => {
// 	console.log("Service Worker intercepting fetch request:", event.request.url);
// 	if (event.request.mode === "navigate") {
// 		event.respondWith(
// 			(async () => {
// 				try {
// 					const networkResponse = await fetch(event.request);
// 					console.log("Network response:", networkResponse);
// 					return networkResponse;
// 				} catch (error) {
// 					console.log("Fetch failed; returning offline page instead.", error);
// 					const cache = await caches.open(CACHE_NAME);
// 					const cachedResponse = await cache.match(OFFLINE_URL);
// 					console.log("Cached response:", cachedResponse);
// 					return (
// 						cachedResponse ||
// 						new Response("Offline page not found", {
// 							status: 404,
// 							statusText: "Not Found",
// 						})
// 					);
// 				}
// 			})()
// 		);
// 	} else if (
// 		event.request.destination === "image" ||
// 		event.request.destination === "style"
// 	) {
// 		event.respondWith(
// 			caches.open(CACHE_NAME).then((cache) => {
// 				return cache.match(event.request);
// 			})
// 		);
// 		// return;
// 	} else {
// 		return;
// 	}
// });

self.addEventListener("fetch", (event) => {
	console.log("Service Worker intercepting fetch request:", event.request.url);

	// Handle navigation requests (e.g., full-page requests)
	if (event.request.mode === "navigate") {
		event.respondWith(
			(async () => {
				try {
					const networkResponse = await fetch(event.request);
					console.log("Network response:", networkResponse);
					return networkResponse;
				} catch (error) {
					console.log("Fetch failed; returning offline page instead.", error);
					const cache = await caches.open(CACHE_NAME);
					const cachedResponse = await cache.match(OFFLINE_URL);
					console.log("Cached response:", cachedResponse);
					return (
						cachedResponse ||
						new Response("Offline page not found", {
							status: 404,
							statusText: "Not Found",
						})
					);
				}
			})()
		);
	}
	// Handle image and style requests (and similar)
	else if (
		event.request.destination === "image" ||
		event.request.destination === "style"
	) {
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) => {
				return cache.match(event.request).then((cachedResponse) => {
					// If the resource is cached, return it
					if (cachedResponse) {
						return cachedResponse;
					}
					// Otherwise, fetch from the network and cache it
					return fetch(event.request)
						.then((networkResponse) => {
							cache.put(event.request, networkResponse.clone());
							return networkResponse;
						})
						.catch((error) => {
							console.error("Fetching resource failed:", error);
							return new Response(null, {
								status: 500,
								statusText: "Fetch failed",
							});
						});
				});
			})
		);
	} else {
		// For other requests, let the network handle them
		event.respondWith(fetch(event.request));
	}
});
