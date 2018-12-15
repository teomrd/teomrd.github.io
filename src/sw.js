importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    new RegExp(".*.js"),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: "css-cache"
    })
  );

  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log(
        "[Service Worker] Network request Failed. Serving content from cache: " +
          error
      );
      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches
        .open(
          "sw-precache-v3-sw-precache-webpack-plugin-https://silent-things.surge.sh"
        )
        .then(function(cache) {
          return cache.match(event.request).then(function(matching) {
            var report =
              !matching || matching.status == 404
                ? Promise.reject("no-match")
                : matching;
            return report;
          });
        });
    })
  );
});
