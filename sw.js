var CACHE_NAME = "bi-20210502v4",
  urlsToCache = [
    "index.html",
    "./dist/style.min.css",
    "./dist/main.min.css",
    "./favicon/favicon.ico",
    "./src/css/bootstrap-icons.css",
    "./src/css/fonts/bootstrap-icons.woff?231ce25e89ab5804f9a6c427b8d325c9",
    "./src/css/fonts/bootstrap-icons.woff2?231ce25e89ab5804f9a6c427b8d325c9",
    "./favicon/site.webmanifest",
  ];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return console.log("Opened cache"), cache.addAll(urlsToCache);
    })
  );
}),
  self.addEventListener("activate", function (event) {
    var cacheAllowlist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (-1 === cacheAllowlist.indexOf(cacheName))
              return caches.delete(cacheName);
          })
        );
      })
    );
  }),
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) return response;
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function (response) {
          if (!response || 200 !== response.status || "basic" !== response.type)
            return response;
          var responseToCache = response.clone();
          return (
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseToCache);
            }),
            response
          );
        });
      })
    );
  });
