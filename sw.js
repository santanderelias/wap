//self.importScripts('data/games.js');

// Files to cache
const cacheName = 'ctool-v2';

const appShellFiles = [ 
  'index.html',
  'ctool.webmanifest',
  'sw.js',
  'favicon.ico',
  'js/var.js',
  'js/func.js',
  'js/events.js',
  'js/engine.js',
  'js/lstorage.js',
  'src/icon-32.png',
  'src/icon-64.png',
  'src/icon-96.png',
  'src/icon-128.png',
  'src/icon-168.png',
  'src/icon-192.png',
  'src/icon-256.png',
  'src/icon-512.png',
  'css/bootstrap.css',
  'css/bootstrap.css.map',
  'css/main.css',
];


const contentToCache = appShellFiles;



// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    //console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
