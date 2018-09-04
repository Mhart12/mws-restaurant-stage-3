const cacheName = 'v36';
const filesToCache = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './lib/idb.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];

self.addEventListener("install", function (event) {
    // Perform install steps
    console.log("[Servicework] Install");
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    console.log("[Servicework] Activate");
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log("[ServiceWorker] Removing old cache shell", key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener("fetch", (event) => {
    console.log("[ServiceWorker] Fetch");

    const requestUrl = new URL(event.request.url);
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
        event.respondWith(caches.match('/restaurant.html'));
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});