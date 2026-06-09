// service-worker.js
const CACHE_NAME = "pwa-cache-v3.3";
const APP_SCOPE = new URL("./", self.location.href);
const LEGACY_BASE_PATH = "/client/energizer_pwa/";

function normalizeAppPath(path) {
	if (!path || path === "./") {
		return APP_SCOPE.href;
	}

	if (/^https?:\/\//i.test(path)) {
		return path;
	}

	if (path.startsWith(LEGACY_BASE_PATH)) {
		return new URL(path.slice(LEGACY_BASE_PATH.length), APP_SCOPE).toString();
	}

	if (path.startsWith("/")) {
		return new URL(path.slice(1), APP_SCOPE).toString();
	}

	return new URL(path.replace(/^\.\//, ""), APP_SCOPE).toString();
}

const APP_SHELL_URL = normalizeAppPath("index.html");
const OFFLINE_URL = normalizeAppPath("offline.html");
const urlsToCache = [
	"./",
	"./index.html",
	"./offline.html",
	"./styles.css",
	"./app.js",
	"./manifest.json",
	"./favicon.ico",
	"./icon-192x192.png",
	"./icon-512x512.png",
	"./apple-touch-icon.png",
	"/client/energizer_pwa/",
	"/client/energizer_pwa/index.html",
	"/client/energizer_pwa/styles.css",
	"/client/energizer_pwa/app.js",
	"/client/energizer_pwa/offline.html",
	"/client/energizer_pwa/favicon.ico",
	"/client/energizer_pwa/icon-192x192.png",
	"/client/energizer_pwa/icon-512x512.png",
	"/client/energizer_pwa/apple-touch-icon.png",

	"/client/energizer_pwa/images/Ener24_BatteryGuide_LandingPage_BG.jpg",
	"/client/energizer_pwa/images/RedBar.png",
	"/client/energizer_pwa/images/RedBar_Mobile.png",
	"/client/energizer_pwa/images/STEP-1.png",
	"/client/energizer_pwa/images/STEP-2.png",
	"/client/energizer_pwa/images/table.jpg",
	"/client/energizer_pwa/images/filter.gif",
	"/client/energizer_pwa/images/table_mobile.jpg",

	"/client/energizer_pwa/images/Banner/Ener24_BatteryGuide_LandingPage.gif",
	"/client/energizer_pwa/images/Banner/Ener24_BatteryGuide_LandingPage_Mobile_video.gif",

	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Bathroom_Scale.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Blood_Pressure_Monitor.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Calculator.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Camcorder.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Car_Key.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Clock.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Decorative_Lighting.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Digital_Camera.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Digital_Lock.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Door_Chime.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Everyday_Toy.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_everydayuse.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Flameless_Candle.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Game_Controller.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Glucose_Monitor.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Handheld_GPS.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Heart_Rate_Monitor.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_High_Performance.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Keyless_Entry_Remote_Fob.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Keyless_Entry_System.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Kitchen_Scale.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Kitchen_Timer.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Laser.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Occasional_Toy.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Outdoor_Surveillance.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Portable_Radio.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Recharge.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Remote_Control.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Selfie_Stick.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Smart_Health.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Smart_Home_Devices.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Smoke_Alarm.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Specialty.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Talking_Book.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Thermometer.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Torch.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Watch.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Door_Bell.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Headset.svg",
	"/client/energizer_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Mouse.svg",

	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Bathroom_Scale.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Blood_Pressure_Monitor.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Calculator.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Camcorder.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Car_Key.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Clock.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Decorative_Lighting.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Digital_Camera.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Digital_Lock.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Door_Chime.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Everyday_Toy.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_everydayuse.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Flameless_Candle.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Game_Controller.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Glucose_Monitor.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Handheld_GPS.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Heart_Rate_Monitor.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_High_Performance.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Keyless_Entry_Remote_Fob.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Keyless_Entry_System.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Kitchen_Scale.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Kitchen_Timer.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Laser.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Occasional_Toy.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Outdoor_Surveillance.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Portable_Radio.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Recharge.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Remote_Control.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Selfie_Stick.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smart_Health.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smart_Home_Devices.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smoke_Alarm.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Specialty.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Talking_Book.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Thermometer.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Torch.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Watch.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Door_Bell.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Headset.svg",
	"/client/energizer_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Mouse.svg",

	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Max.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_MaxPlus.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Recharge.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Ultimate.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Special1.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Special2.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Special3.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_Special4.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_123.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_186.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_189.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_1616.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_2016.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_2025.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_2032.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_2450.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_A23.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_A27.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_A76.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_CR2.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_E90.png",
	"/client/energizer_pwa/images/energizer_Product/energizer_Product_E96.png",

	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Max.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_MaxPlus.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Recharge.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Ultimate.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Special1.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Special2.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Special3.png",
	"/client/energizer_pwa/images/energizer_Product_Mobile/energizer_Product_Special4.png",

	"/client/energizer_pwa/images/BatteryType/BatteryType_1.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_2.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_4.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_5.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_6.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_7.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_8.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_9.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_123.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_186.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_189.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_1616.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_2016.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_2025.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_2032.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_2450.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_A23.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_A27.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_A76.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_CR2.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_E90.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_E96.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_Lithium.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_Max.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_Maxplus.png",
	"/client/energizer_pwa/images/BatteryType/BatteryType_3_Recharge.png",
].map(normalizeAppPath);

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
	// Force the waiting Service Worker to become active immediately
	self.skipWaiting();
	// Use the addAllBypassCache function to cache resources with 'reload'
	event.waitUntil(addAllBypassCache(CACHE_NAME, urlsToCache));
});

// self.addEventListener("install", (e) => {
// 	e.waitUntil(
// 		caches.open(CACHE_NAME).then(async (cache) => {
// 			let ok,
// 				cats = [],
// 				c = [...urlsToCache];

// 			console.log("ServiceWorker: Caching files:", c.length, c);
// 			try {
// 				ok = await cache.addAll(c);
// 			} catch (err) {
// 				console.error("sw: cache.addAll");
// 				for (let i of c) {
// 					try {
// 						ok = await cache.add(i);
// 					} catch (err) {
// 						console.warn("sw: cache.add", i);
// 					}
// 				}
// 			}

// 			return ok;
// 		})
// 	);

// 	console.log("ServiceWorker installed");
// });

// Updated addAllBypassCache function to bypass cache using 'cache: reload'
async function addAllBypassCache(cacheName, urls) {
	// Estimate storage usage and quota
	// const { usage, quota } = await navigator.storage.estimate();

	// console.log(`Storage used: ${usage} bytes`);
	// console.log(`Total quota: ${quota} bytes`);

	// // Calculate the available storage space
	// const availableSpace = quota - usage;
	// console.log(`Available storage: ${availableSpace} bytes`);

	const cache = await caches.open(cacheName);

	// Force each request to bypass the cache using 'cache: reload'
	const requests = [...new Set(urls)].map(
		(url) => new Request(url, { cache: "reload" })
	);

	// Cache each request independently so one missing asset doesn't break
	// offline installation for the entire app shell.
	await Promise.all(
		requests.map(async (request) => {
			try {
				const response = await fetch(request);

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				await cache.put(request, response);
			} catch (error) {
				console.warn("Skipping failed precache request:", request.url, error);
			}
		})
	);
}

self.addEventListener("activate", (event) => {
	console.log("Service Worker activating...");
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		(async () => {
			const cacheNames = await caches.keys();
			await Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}

					return Promise.resolve();
				})
			);
			await self.clients.claim();
		})()
	);
});

self.addEventListener("message", (event) => {
	if (event.data && event.data.action === "skipWaiting") {
		self.skipWaiting();
	}
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

async function cacheFirst(request) {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(request, { ignoreSearch: true });

	if (cachedResponse) {
		return cachedResponse;
	}

	const networkResponse = await fetch(request);

	if (networkResponse && networkResponse.ok) {
		cache.put(request, networkResponse.clone());
	}

	return networkResponse;
}

self.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") {
		return;
	}

	const requestUrl = new URL(event.request.url);
	const isSameOrigin = requestUrl.origin === self.location.origin;

	console.log("Service Worker intercepting fetch request:", event.request.url);

	if (event.request.mode === "navigate") {
		event.respondWith(
			(async () => {
				const cache = await caches.open(CACHE_NAME);
				const cachedAppShell = await cache.match(APP_SHELL_URL, {
					ignoreSearch: true,
				});

				if (cachedAppShell) {
					return cachedAppShell;
				}

				try {
					const networkResponse = await fetch(event.request);

					if (networkResponse && networkResponse.ok) {
						cache.put(APP_SHELL_URL, networkResponse.clone());
					}

					return networkResponse;
				} catch (error) {
					console.log("Fetch failed; returning offline page instead.", error);
					const cachedOffline = await cache.match(OFFLINE_URL, {
						ignoreSearch: true,
					});

					return (
						cachedOffline ||
						new Response("Offline page not found", {
							status: 404,
							statusText: "Not Found",
						})
					);
				}
			})()
		);
		return;
	}

	if (!isSameOrigin) {
		return;
	}

	event.respondWith(
		cacheFirst(event.request).catch(async () => {
			if (event.request.destination === "document") {
				const cache = await caches.open(CACHE_NAME);
				return cache.match(OFFLINE_URL, { ignoreSearch: true });
			}

			return new Response(null, {
				status: 504,
				statusText: "Offline resource unavailable",
			});
		})
	);
});
