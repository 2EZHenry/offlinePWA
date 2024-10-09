// app.js
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then((registration) => {
				console.log(
					"Service Worker registered with scope:",
					registration.scope
				);
			})
			.catch((error) => {
				console.error("Service Worker registration failed:", error);
			});
	});
}

let touchStartY = 0;
let isTouching = false;

document.addEventListener("touchstart", function (e) {
	// Record the start position of the touch
	touchStartY = e.touches[0].clientY;
	isTouching = true;
});

document.addEventListener("touchmove", function (e) {
	if (isTouching) {
		let touchMoveY = e.touches[0].clientY;
		// If the user is pulling down and at the top of the page, prevent default behavior
		if (touchMoveY > touchStartY && window.scrollY === 0) {
			e.preventDefault(); // Prevent pull-to-refresh action
		}
	}
});

document.addEventListener("touchend", function () {
	isTouching = false;
});
