define(['core', 'Game'], function(ab, Game){
  window.AngryBox = ab;

  var drawSplash = function(ctx){
    var img = new Image();
    img.onload = function(){
      ctx.drawImage(this, 0, 0);
    };
    img.src = "../img/splash.png";
  };
  var loadMenu = function(settings) {
    console.log(settings);
  };

  // set up the drawing context
  ab.gameCanvas = document.getElementById('canvas');
  ab.context = ab.gameCanvas.getContext('2d');

  ab.viewport = {x:0, y: 0, w: 800, h: 600};

  ab.gameCanvas.width = ab.viewport.w;
  ab.gameCanvas.height = ab.viewport.h;
  


  // draw start screen
  // 1. draw the splash image
  // 2. draw fake progress image
  drawSplash(ab.context);


  // start loading the settings
  ab.xhrGet('../assets/user.json', function(data){
    var s = JSON.parse(this.responseText);
    loadMenu(s);
  });





  // ab.game = game;
  // game.start();

});