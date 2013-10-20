define(['core', 'Scene', 'Animation', 'GameObject'], function(ab, Scene, Animation, GameObject){
  var requestID = 0;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var s, scene;
  
  var Game = ab.Class.extend({
    start: function(lvl){
      s = new Animation(["c-or-1.png", "c-or-2.png", "c-or-3.png"], 3);
      scene = new Scene(ab.context);

      var test = new GameObject({
        x: 100,
        y: 100,
        rot: ab.deg2Rad(0),
        components: [s]
      });
      scene.addGameObject(test);
      this.loop();
    },
    pause: function(){
      if(requestID){
        cancelAnimationFrame(requestID);
      }
    },
    
    loop: function(){
      // scene update
      
      
      scene.update();
      
      requestID = window.requestAnimationFrame(ab.game.loop);
    }
  });

  return Game;
});