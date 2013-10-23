define(['core', 'Scene', 'Animation', 'GameObject', 'Sprite'], function(ab, Scene, Animation, GameObject, Sprite){
  var requestID = 0;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var s, scene;
  
  var Game = ab.Class.extend({
    start: function(lvl){

      ab.scene = scene = new Scene(ab.context);
      scene.setLevel(ab.data.levels[lvl]);


      this.loop();
    },
    pause: function(){
      if(requestID){
        cancelAnimationFrame(requestID);
      }
    },
    
    loop: function(){

      scene.update();
      
      requestID = window.requestAnimationFrame(ab.game.loop);
    }
  });

  return Game;
});