const CACHE_NAME = 'zefram-v1';
// キャッシュするリソースのリスト
const ASSETS_TO_CACHE = [
  './',
  './index.html', // HTMLのファイル名に合わせて変更してください
  './manifest.json',
  './icon.png',
  './icon.png',
  'https://fonts.googleapis.com/css2?family=Michroma&display=swap'
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// ネットワークリクエスト時にキャッシュを優先的に返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});