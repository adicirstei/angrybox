
require.config({
  shim: {
    'Box2D': {
      exports: 'Box2D'
    },
    'boxbox' :{
      exports: 'boxbox',
      deps: ['Box2D'],
    }
  },
  paths: {
    'Box2D': '../components/boxgame/Box2dWeb-2.1.a.3',
    'boxbox': '../components/boxgame/boxbox'
  }
});


require(['app'], function (app) {
    'use strict';
    
    console.log(app);
    
});