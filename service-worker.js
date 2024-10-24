// service-worker.js
const CACHE_NAME = "pwa-cache-v6";
const OFFLINE_URL = "/client/energiser_pwa/offline.html";
const urlsToCache = [
	"/client/energiser_pwa/",
	"/client/energiser_pwa/index.html",
	"/client/energiser_pwa/styles.css",
	"/client/energiser_pwa/app.js",
	"/client/energiser_pwa/offline.html",
	"/client/energiser_pwa/icon-192x192.png",
	"/client/energiser_pwa/icon-512x512.png",
	"/client/energiser_pwa/apple-touch-icon.png",

	"/client/energiser_pwa/images/Ener24_BatteryGuide_LandingPage_BG.jpg",
	"/client/energiser_pwa/images/RedBar.png",
	"/client/energiser_pwa/images/RedBar_Mobile.png",

	"/client/energiser_pwa/images/Banner/Ener24_BatteryGuide_LandingPage.gif",
	"/client/energiser_pwa/images/Banner/Ener24_BatteryGuide_LandingPage_Mobile_video.gif",

	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Bathroom_Scale.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Blood_Pressure_Monitor.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Calculator.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Camcorder.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Car_Key.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Clock.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Decorative_Lighting.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Digital_Camera.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Digital_Lock.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Door_Chime.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Everyday_Toy.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_everydayuse.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Flameless_Candle.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Game_Controller.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Glucose_Monitor.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Handheld_GPS.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Heart_Rate_Monitor.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_High_Performance.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Keyless_Entry_Remote_Fob.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Keyless_Entry_System.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Kitchen_Scale.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Kitchen_Timer.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Laser.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Occasional_Toy.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Outdoor_Surveillance.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Portable_Radio.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Recharge.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Remote_Control.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Selfie_Stick.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Smart_Health.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Smart_Home_Devices.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Smoke_Alarm.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Specialty.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Talking_Book.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Thermometer.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Torch.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Watch.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Door_Bell.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Headset.svg",
	"/client/energiser_pwa/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Mouse.svg",

	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Bathroom_Scale.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Blood_Pressure_Monitor.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Calculator.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Camcorder.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Car_Key.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Clock.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Decorative_Lighting.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Digital_Camera.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Digital_Lock.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Door_Chime.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Everyday_Toy.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_everydayuse.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Flameless_Candle.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Game_Controller.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Glucose_Monitor.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Handheld_GPS.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Heart_Rate_Monitor.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_High_Performance.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Keyless_Entry_Remote_Fob.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Keyless_Entry_System.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Kitchen_Scale.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Kitchen_Timer.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Laser.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Occasional_Toy.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Outdoor_Surveillance.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Portable_Radio.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Recharge.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Remote_Control.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Selfie_Stick.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smart_Health.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smart_Home_Devices.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smoke_Alarm.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Specialty.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Talking_Book.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Thermometer.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Torch.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Watch.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Door_Bell.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Headset.svg",
	"/client/energiser_pwa/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Mouse.svg",

	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Max.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_MaxPlus.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Recharge.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Ultimate.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Special1.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Special2.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Special3.png",
	"/client/energiser_pwa/images/energizer_Product/energizer_Product_Special4.png",

	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Max.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_MaxPlus.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Recharge.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Ultimate.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Special1.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Special2.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Special3.png",
	"/client/energiser_pwa/images/energizer_Product_Mobile/energizer_Product_Special4.png",

	"/client/energiser_pwa/images/BatteryType/BatteryType_1.png",
	"/client/energiser_pwa/images/BatteryType/BatteryType_2.png",
	"/client/energiser_pwa/images/BatteryType/BatteryType_3.png",
	"/client/energiser_pwa/images/BatteryType/BatteryType_4.png",
	"/client/energiser_pwa/images/BatteryType/BatteryType_5.png",
	"/client/energiser_pwa/images/BatteryType/BatteryType_6.png",
	"/client/energiser_pwa/images/BatteryType/BatteryType_7.png",
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
