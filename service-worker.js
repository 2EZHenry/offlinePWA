// service-worker.js
const CACHE_NAME = "pwa-cache-v1";
const OFFLINE_URL = "offline.html";
const urlsToCache = [
	"/",
	"/index.html",
	"/styles.css",
	"/app.js",
	"/offline.html",
];

self.addEventListener("install", (event) => {
	console.log("Service Worker installing...");
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

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

self.addEventListener("fetch", (event) => {
	console.log("Service Worker intercepting fetch request:", event.request.url);

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
});
