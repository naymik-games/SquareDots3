var cacheName = 'Square Dots 3 v1.0';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',



  '/scenes/preload.js',
  '/scenes/startGame.js',
  '/scenes/selectGame.js',
  '/scenes/preview.js',
  '/scenes/endGame.js',
  '/scenes/levelBuilder.js',
  '/scenes/UI.js',

  '/assets/fonts/gothic.png',
  '/assets/fonts/gothic.xml',

  '/classes/board.js',
  '/classes/settings.js',
  '/classes/dot.js',
  '/classes/extra.js',
  '/classes/level.js',

  '/html/bulma.min.css',
  '/html/dropdownCols.html',
  '/html/dropdownRows.html',
  '/html/dropdownItems.html',


  '/assets/particle.png',
  '/assets/particles.png',

  '/assets/sprites/all_color.png',
  '/assets/sprites/arow-207-128.png',
  '/assets/sprites/blank.png',
  '/assets/sprites/block.png',
  '/assets/sprites/bomb-96.png',
  '/assets/sprites/burst.png',
  '/assets/sprites/checkmark-128.png',
  '/assets/sprites/circle_outline.png',
  '/assets/sprites/circle-dashed-4-128.png',
  '/assets/sprites/circle-dashed-8-128.png',
  '/assets/sprites/circle.png',
  '/assets/sprites/fire-2-128.png',
  '/assets/sprites/grid-two-up-128.png',
  '/assets/sprites/hexagon-outline.png',
  '/assets/sprites/hexagon-partial-outline.png',
  '/assets/sprites/hexagon.png',
  '/assets/sprites/icons.png',
  '/assets/sprites/levelpages.png',
  '/assets/sprites/menu.png',
  '/assets/sprites/modal.png',
  '/assets/sprites/one_dot.png',
  '/assets/sprites/select_icons.png',
  '/assets/sprites/square-128.png',
  '/assets/sprites/square-dashed-0.png',
  '/assets/sprites/square-dashed-4.png',
  '/assets/sprites/square-dashed-8.png',
  '/assets/sprites/square-ios-app-128.png',
  '/assets/sprites/square-rounded.png',
  '/assets/sprites/star.png',
  '/assets/sprites/switch.png',
  '/assets/sprites/transp.png',
  '/assets/sprites/triangle-outline-128.png',

  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});