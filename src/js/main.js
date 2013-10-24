
require.config({
  shim: {
    'Box2dWeb': {
      exports: 'Box2D'
    }

  },
  paths: {
    'Box2dWeb': '../components/box2dweb/Box2dWeb-2.1.a.3',
  }
});


require(['app'], function (app) {
    'use strict';
});