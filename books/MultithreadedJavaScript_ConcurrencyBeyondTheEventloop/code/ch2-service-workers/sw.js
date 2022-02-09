let counter = 0;
//
self.oninstall = (event) => {
  console.log('service worker install');
};
//
self.onactivate = (event) => {
  console.log('service worker activate');
  // allows service worker to claim the opened index.html page
  event.waitUntil(self.clients.claim());
};
//
self.onfetch = (event) => {
  console.log('fetch', event.request.url);
  if (event.request.url.endsWith('/data.json')) {
    counter++;
    // override for when /data.json is requested
    event.respondWith(
      new Response(JSON.stringify({ counter }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    return;
  }

  // other urls will fall back to a normal network request.
  // fallback to normal HTTP request
  event.respondWith(fetch(event.request));
};
