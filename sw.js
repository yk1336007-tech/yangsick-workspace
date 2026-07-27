const CACHE_NAME = 'workbench-v2';
const ASSETS = [
  './',
  './index.html'
];

// 安装：跳过等待，立即激活
self.addEventListener('install', e => {
  self.skipWaiting();
});

// 激活：清理所有旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// 拦截请求：纯网络优先，不缓存 HTML
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
