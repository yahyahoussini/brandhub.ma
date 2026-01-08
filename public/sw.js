// Service Worker for BrandHub.ma - Performance & Caching Optimization
const CACHE_NAME = 'brandhub-ma-v1.0';
const STATIC_CACHE_NAME = 'brandhub-static-v1.0';
const API_CACHE_NAME = 'brandhub-api-v1.0';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/maroc',
  '/services/programming',
  '/services/graphics', 
  '/services/content',
  '/services/business',
  '/about',
  '/contact',
  '/blog',
  '/manifest.json',
  '/favicone.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Static assets - Cache first
  static: ['/assets/', '/favicone.png', '/manifest.json'],
  // API calls - Network first with cache fallback
  api: ['/api/', 'supabase.co'],
  // Pages - Stale while revalidate
  pages: ['/', '/maroc', '/services/', '/about', '/contact', '/blog'],
  // Images - Cache first
  images: ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']
};

// Install event - cache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then(cache => {
        return cache.addAll(STATIC_RESOURCES);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME && cacheName !== API_CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') return;

  // Handle different resource types
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isAPICall(url)) {
    event.respondWith(networkFirst(request, API_CACHE_NAME));
  } else if (isImage(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
  }
});

// Cache first strategy (for static assets)
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first error:', error);
    return new Response('Service unavailable', { status: 503 });
  }
}

// Network first strategy (for API calls)
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Network error', { status: 503 });
  }
}

// Stale while revalidate (for pages)
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return CACHE_STRATEGIES.static.some(pattern => url.pathname.includes(pattern));
}

function isAPICall(url) {
  return CACHE_STRATEGIES.api.some(pattern => url.href.includes(pattern));
}

function isImage(url) {
  return CACHE_STRATEGIES.images.some(ext => url.pathname.toLowerCase().endsWith(ext));
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when back online
async function syncContactForm() {
  // Handle offline form submissions when back online
  const cache = await caches.open('offline-forms');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      await fetch(request);
      await cache.delete(request);
    } catch (error) {
      console.error('Failed to sync form:', error);
    }
  }
}

// Push notification handler
self.addEventListener('push', event => {
  const options = {
    body: 'Nouveau contenu disponible sur BrandHub.ma',
    icon: '/favicone.png',
    badge: '/favicone.png',
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('BrandHub.ma', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});