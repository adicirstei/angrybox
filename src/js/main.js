
require.config({
  shim: {
    'Box2D': {
      exports: 'Box2D'
    },
    'boxbox' :{
      exports: 'boxbox',
      deps: ['Box2D'],
    },
    'easeljs': {
      exports: 'createjs'
    },
    'soundjs': {
      exports: 'createjs'
    },
    'preloadjs': {
      exports: 'createjs'
    }    
  },
  paths: {
    'Box2D': '../components/boxgame/Box2dWeb-2.1.a.3',
    'boxbox': '../components/boxgame/boxbox',
    'easeljs': '../components/easeljs/index',
    'soundjs': '../components/soundjs/index',
    'preloadjs': '../components/preloadjs/index'
  }
});


require(['app', 'preloadjs'], function (app, easeljs) {
    'use strict';
    
    console.log(app);
    
    console.log(easeljs);
    
});