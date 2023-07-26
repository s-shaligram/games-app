const cacheName = 'cacheAssets';

/**
 * On Install Event
 * Triggered when the service worker is installed
 */
self.addEventListener('install', function (event) {

  /*This causes your service worker to kick out the current active worker and activate itself as 
    soon as it enters the waiting phase .*/
  self.skipWaiting();

  // Cache some assets during the SW intallation.
  // It makes sure to wait for the caching before
  
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/offline.html',
          '/manifest.json',
          '/css/main.css',
          '/js/site.js',
          '/images/',
          '/pages/',
          '/pages/index.html',
          '/pages/script.js',
          '/pages/styles.css',
          '/icons/'
        ])
      })
  );
});

/**
 * On Activate Event
 * Triggered when the service worker is activated
 */
self.addEventListener('activate', function (event) {

  event.waitUntil(clients.claim());

  // Delete the old versions of the cache
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(item => item !== cacheName)
            .map(item => caches.delete(item))
        )
      })
  );

});

/**
 * On Fetch Event
 * Triggered when the service worker retrieves an asset
 */
self.addEventListener('fetch', function (event) {

  // Cache strategy: Network with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .catch(async function () {
        return caches.open(cacheName)
          .then(function (cache) {
            return cache.match(event.request)
          })
      })
  );

});