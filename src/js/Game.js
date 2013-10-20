define(['core', 'Scene', 'Sprite'], function(ab, Scene, Sprite){
  var requestID = 0;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var s;
  
  var Game = ab.Class.extend({
    start: function(lvl){
      s = new Sprite({rot:ab.deg2Rad(120), cx: 200, cy: 100, frame:"wood-1.png"});
      this.loop();
    },
    pause: function(){
      if(requestID){
        cancelAnimationFrame(requestID);
      }
    },
    
    loop: function(){
      // scene update
      
      
      s.draw(ab.context);
      
      requestID = window.requestAnimationFrame(ab.game.loop);
    }
  });

  return Game;
});