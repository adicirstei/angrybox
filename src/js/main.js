
require.config({
  shim: {
    'Box2D': {
      exports: 'Box2D'
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


require(['app', 'preloadjs', 'easeljs', 'soundjs', 'Box2D'], function (app, preloadjs, easeljs, soundjs, Box2D) {
    'use strict';
    
    console.log(app, Box2D);
    
    console.log(preloadjs, easeljs, soundjs);
    
});