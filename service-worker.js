// service-worker.js
const CACHE_NAME = "pwa-cache-v4";
const OFFLINE_URL = "offline.html";
const urlsToCache = [
	"/",
	"/index.html",
	"/styles.css",
	"/app.js",
	"/offline.html",
	"/icon-192x192.png",
	"/icon-512x512.png",

	"/images/Ener24_BatteryGuide_LandingPage_BG.jpg",
	"/images/RedBar.png",
	"/images/RedBar_Mobile.png",

	"/images/Banner/Ener24_BatteryGuide_LandingPage.gif",
	"/images/Banner/Ener24_BatteryGuide_LandingPage_Mobile_video.gif",

	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Bathroom_Scale.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Blood_Pressure_Monitor.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Calculator.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Camcorder.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Car_Key.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Clock.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Decorative_Lighting.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Digital_Camera.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Digital_Lock.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Door_Chime.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Everyday_Toy.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_everyday.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Flameless_Candle.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Game_Controller.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Glucose_Monitor.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Handheld_GPS.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Heart_Rate_Monitor.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_High_Performance.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Keyless_Entry_Remote_Fob.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Keyless_Entry_System.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Kitchen_Scale.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Kitchen_Timer.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Laser.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Occasional_Toy.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Outdoor_Surveillance.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Portable_Radio.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Recharge.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Remote_Control.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Sealable_Stick.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Smart_Health.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Smart_Home_Devices.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Smoke_Alarm.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Specialty.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Talking_Book.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Thermometer.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Torch.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Watch.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Door_Bell.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Headset.svg",
	"/images/Red_Icon/Energizer_Icon_LandingPage_red_Wireless_Mouse.svg",

	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Bathroom_Scale.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Blood_Pressure_Monitor.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Calculator.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Camcorder.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Car_Key.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Clock.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Decorative_Lighting.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Digital_Camera.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Digital_Lock.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Door_Chime.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Everyday_Toy.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_everyday.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Flameless_Candle.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Game_Controller.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Glucose_Monitor.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Handheld_GPS.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Heart_Rate_Monitor.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_High_Performance.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Keyless_Entry_Remote_Fob.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Keyless_Entry_System.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Kitchen_Scale.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Kitchen_Timer.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Laser.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Occasional_Toy.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Outdoor_Surveillance.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Portable_Radio.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Recharge.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Remote_Control.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Sealable_Stick.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smart_Health.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smart_Home_Devices.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Smoke_Alarm.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Specialty.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Talking_Book.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Thermometer.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Torch.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Watch.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Door_Bell.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Headset.svg",
	"/images/Grey_Icon/Energizer_Icon_LandingPage_grey_Wireless_Mouse.svg",

	"/images/energizer_Product/energizer_Product_Max.png",
	"/images/energizer_Product/energizer_Product_MaxPlus.png",
	"/images/energizer_Product/energizer_Product_Recharge.png",
	"/images/energizer_Product/energizer_Product_Ultimate.png",
	"/images/energizer_Product/energizer_Product_Special1.png",
	"/images/energizer_Product/energizer_Product_Special2.png",
	"/images/energizer_Product/energizer_Product_Special3.png",
	"/images/energizer_Product/energizer_Product_Special4.png",

	"/images/energizer_Product_Mobile/energizer_Product_Max.png",
	"/images/energizer_Product_Mobile/energizer_Product_MaxPlus.png",
	"/images/energizer_Product_Mobile/energizer_Product_Recharge.png",
	"/images/energizer_Product_Mobile/energizer_Product_Ultimate.png",
	"/images/energizer_Product_Mobile/energizer_Product_Special1.png",
	"/images/energizer_Product_Mobile/energizer_Product_Special2.png",
	"/images/energizer_Product_Mobile/energizer_Product_Special3.png",
	"/images/energizer_Product_Mobile/energizer_Product_Special4.png",

	"/images/BatteryType/BAtteryType_1.png",
	"/images/BatteryType/BAtteryType_2.png",
	"/images/BatteryType/BAtteryType_3.png",
	"/images/BatteryType/BAtteryType_4.png",
	"/images/BatteryType/BAtteryType_5.png",
	"/images/BatteryType/BAtteryType_6.png",
	"/images/BatteryType/BAtteryType_7.png",
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
