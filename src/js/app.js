define(['core','AssetManager', 'Game'], function(ab, AM, Game){
  window.AngryBox = ab;
  ab.AssetManager = AM;
  var drawSplash = function(ctx){
    AM.getImage("../img/splash.png", function(img){
      ctx.drawImage(img, 0, 0);
      AM.loadAssets(function(progress){
        console.log('progress: ', progress);
        
      }, function(){
        drawMenu(ctx);
      });
    });
  };
  var drawMenu = function(ctx) {
    var lvls = ab.data;
  //  var first = lvls[0];
    var cellsize = {w: 24, h:24};

    //ab.menu = {pages: lvls, currpage = first};

    // draw current page
    ctx.fillStyle = "rgba(40, 255,40, 1)";
    ctx.fillRect(0, 250, ab.gameCanvas.width, ab.gameCanvas.height - 250);

    ctx.font = "24pt Arial Black";
    ctx.fillStyle = "green";
  //  ctx.fillText("Level " + first.key, 200, 290);
    
    ab.game = new Game();
    ab.game.start();

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








  // ab.game = game;
  // game.start();

});