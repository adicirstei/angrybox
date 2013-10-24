define(['core', 'Scene', 'Animation', 'GameObject', 'Sprite'], function(ab, Scene, Animation, GameObject, Sprite){
  var requestID = 0;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var s, scene;
  var T = ab.Time, startTime, now, frameStart;

  var Game = ab.Class.extend({
    start: function(lvl){
      startTime = (new Date()).getTime();
      frameStart = startTime;
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
      now = (new Date()).getTime();
      T.deltaTime = now - frameStart;
      frameStart = now;

      T.time = now - startTime;
      
      T.frameCount += 1;

      scene.update();
      requestID = window.requestAnimationFrame(ab.game.loop);

    }
  });

  return Game;
});