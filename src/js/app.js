define(['core', 'Game'], function(ab, Game){
  window.AngryBox = ab;

  ab.gameCanvas = document.getElementById('canvas');
  ab.context = ab.gameCanvas.getContext('2d');

  // ab.game = game;
  // game.start();
});