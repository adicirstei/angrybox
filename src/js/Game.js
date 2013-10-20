define(['core', 'Scene', 'Sprite', 'GameObject'], function(ab, Scene, Sprite, GameObject){
  var requestID = 0;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var s, scene;
  
  var Game = ab.Class.extend({
    start: function(lvl){
      s = new Sprite({frame:"wood-1.png"});
      scene = new Scene(ab.context);

      var test = new GameObject({
        x: 100,
        y: 100,
        rot: ab.deg2Rad(90),
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