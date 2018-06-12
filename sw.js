// console.log('HiHAAAAAAAAA!');
// install cache
var previousCacheName = 'mws-static-v3';
var staticCacheName = 'mws-static-v1';
var contentImgsCache = 'mws-content-imgs';
var allCaches = [
	staticCacheName,
	contentImgsCache
];

self.addEventListener('install', function(event) {
   event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll ([
			'/',
			'js/main.js',
			'js/dbhelper.js',
			'js/restaurant_info.js',
			'css/styles.css',
			'data/restaurants.json'
         ]);
      })
   );
});

// remove all the caches that is not the same as cache installed
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
		 return Promise.all(	
			cacheNames.filter(function(cacheName){
			   return cacheName.startsWith('mws-') &&    
			     !allCaches.includes(cacheName);
		    }).map(function(cacheName){
			   return caches.delete(cacheName)
	        })
	      );
    	})
	);
});

// respond with an entry from the cache if there is one.
// If there isn't, fetch from the network....
self.addEventListener('fetch', function(event) {
  	event.respondWith(
  		caches.match (event.request).then(function(response){
  			return response || fetch (event.request);
  		})
	);
});

