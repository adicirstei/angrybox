require.config({
  shim: {
    'Box2D': {
      exports: 'Box2D'
    }
  },
  paths: {
    'Box2D': '../components/box2dweb/Box2dWeb-2.1.a.3'
  }
});

require(['app'], function (app) {
    'use strict';
    // use app here
    console.log(app);
    
});