self.addEventListener('fetch', (event) => {

  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      if (cachedResponse) return cachedResponse

      return fetch(event.request.clone())
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse
          } else {
            caches.open('OFFLINE_CACHES')
              .then((cache) => {
                console.log(networkResponse)
                cache.put(event.request, networkResponse)
              })
              .catch(error => console.log(error))
            return networkResponse 
          }
        })
    }))
    .catch(error => console.log(error))
})