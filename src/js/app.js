define(['core', 'Game'], function(ab, Game){
  window.AngryBox = ab;
  
  ab.assets = ab.assets || {};
  
  var getImage = function(src, cb){
	if(ab.assets[src]){
		cb(ab.assets[src]);
	} else {
		var img = new Image();
		img.onload = function(){
			ab.assets[src] = this;
			cb(this);
		};
		img.src = src;
	}
  };
  

  var drawSplash = function(ctx){
	getImage("../img/splash.png", function(img){
		ctx.drawImage(img, 0, 0);
	});
  };
  var loadMenu = function(data) {
    var lvls = data.levels;
    var first = lvls[0];
    var cellsize = {w: 24, h:24};

    //ab.menu = {pages: lvls, currpage = first};

    // draw current page
    ab.context.fillStyle = "rgba(40, 255,40, 1)";
    ab.context.fillRect(0, 250, ab.gameCanvas.width, ab.gameCanvas.height - 250);

    ab.context.font = "24pt Arial Black";
    ab.context.fillStyle = "green";
    ab.context.fillText("Level " + first.key, 200, 290);

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
  ab.xhrGet('../assets/game.json', function(data){
    var s = JSON.parse(this.responseText);
    loadMenu(s);
  });





  // ab.game = game;
  // game.start();

});