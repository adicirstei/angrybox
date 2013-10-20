
require.config({
  shim: {
    'Box2dWeb': {
      exports: 'Box2D'
    }

    ,
    'lazyjs': {
      exports: 'Lazy'
    }

  },
  paths: {
    'Box2dWeb': '../components/box2dweb/Box2dWeb-2.1.a.3',
    'lazyjs': '../components/lazy.js/lazy'
  }
});


require(['app'], function (app) {
    'use strict';
});