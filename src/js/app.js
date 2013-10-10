define(['core', 'Game'], function(ab, Game){
  window.AngryBox = ab;

  // set up the drawing context
  ab.gameCanvas = document.getElementById('canvas');
  ab.context = ab.gameCanvas.getContext('2d');

  ab.viewport = {x:0, y: 0, w: 800, h: 600};

  ab.gameCanvas.width = ab.viewport.w;
  ab.gameCanvas.height = ab.viewport.h;



  // draw start screen
  // 1. draw the splash image
  // 2. draw fake progress image





  // start loading the settings






  // ab.game = game;
  // game.start();
});