// service-worker.js
const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
	"/",
	"/index.html",
	"/styles.css",
	"/app.js",
	"offline.html",
];

// Install the service worker and cache resources
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

const putInCache = async (request, response) => {
	const cache = await caches.open("v1");
	await cache.put(request, response);
};

function createCacheBustedRequest(url) {
	let request = new Request(url, { cache: "reload" });
	// See https://fetch.spec.whatwg.org/#concept-request-mode
	// This is not yet supported in Chrome as of M48, so we need to explicitly
	// check to see if the cache: "reload" option had any effect.
	if ("cache" in request) {
		return request;
	}

	// If { cache: "reload" } didn't have any effect, append a cache-busting URL
	// parameter instead.
	var bustedUrl = new URL(url, self.location.href);
	bustedUrl.search += (bustedUrl.search ? "&" : "") + "cachebust=" + Date.now();
	return new Request(bustedUrl);
}

self.addEventListener("fetch", (event) => {
	// We only want to call event.respondWith() if this is a navigation request
	// for an HTML page.
	if (
		event.request.mode === "navigate" ||
		// request.mode of "navigate" is unfortunately not supported in Chrome
		// versions older than 49, so we need to include a less precise fallback,
		// which checks for a GET request with an Accept: text/html header.
		(event.request.method === "GET" &&
			event.request.headers.get("accept").indexOf("text/html") > -1)
		// event.request.headers.get("accept").includes("text/html")
	) {
		console.log("Handling fetch event for", event.request.url);
		event.respondWith(
			fetch(createCacheBustedRequest(event.request.url)).catch((error) => {
				// The catch is only triggered if fetch() throws an exception, which
				// will most likely happen due to the server being unreachable.
				// If fetch() returns a valid HTTP response with an response code in
				// the 4xx or 5xx range, the catch() will NOT be called.
				// If you need custom handling for 4xx or 5xx errors, see
				// https://github.com/GoogleChrome/samples/tree/gh-pages/
				// service-worker/fallback-response
				alert("OFFLINE!");
				console.log("Fetch failed; returning offline page instead.", error);
				return caches.match("offline.html");
			})
		);
	}

	// If our if() condition is false, then this fetch handler won"t intercept
	// the request.
	// If there are any other fetch handlers registered, they will get a chance
	// to call event.respondWith().
	// If no fetch handlers call event.respondWith(), the request will be
	// handled by the browser as if there were no service worker involvement.
});

// Activate and clean up old caches
self.addEventListener("activate", (event) => {
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
