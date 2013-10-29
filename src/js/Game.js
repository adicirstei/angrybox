define(['core', 'Scene', 'box2d', 'GameObject'], function(ab, Scene, box2d, GameObject, Sprite){
  var requestID = 0;
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  var s, scene, state;
  var im;
  var T = ab.Time, startTime, now, frameStart, scrolling = false, tvpx, direction, canScroll = true;

  var Game = ab.Class.extend({

    start: function(lvl){
      startTime = (new Date()).getTime();
      frameStart = startTime;
      ab.scene = scene = new Scene(ab.context);
      scene.setLevel(ab.data.levels[lvl]);
      im = ab.inputManager;
      this.state = Game.WAIT;
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
      canScroll = true;
      ab.game.stateMachine();
      if (canScroll){
        ab.game.scroll();
      }
      scene.update();
      requestID = window.requestAnimationFrame(ab.game.loop);

    },
    scroll: function(){
      var vpx = ab.viewport.x;
      if (!scrolling && vpx > 0){
        tvpx = 0;
        direction = -1;
        scrolling = true;
      } else if(!scrolling && vpx <= 0) {
        tvpx = scene.bounds.r - ab.viewport.w;
        direction = 1;
        scrolling = true;
      }
      if(scrolling){
        if(direction * (tvpx-vpx) > 0){
          ab.viewport.x = ab.Mathf.lerp(vpx, tvpx, ab.Time.deltaTime/1000.0 *20);
          console.log(ab.viewport.x);
        } else {
          scrolling = false;
        }
      }
    },
    stateMachine: function(){
      var a = scene.actors[0];
      var s0 = scene.slots[0];
      var p = {x: (im.pointer.x + ab.viewport.x) / box2d.SCALE, y: (im.pointer.y + ab.viewport.y) / box2d.SCALE};
      if (this.state === Game.WAIT){
        var f = a.physics.body.GetFixtureList();

        if (im.drag){
          if(f.TestPoint(p)){
            this.state = Game.AIM;
            canScroll = false;
          } 
        }

        return;
      }
      if (this.state === Game.AIM){
        if(im.drag){
          a.setPos(im.pointer);
        } else {
          // apply impulse to actor and change the game state

          
          var impulse = new box2d.b2Vec2((s0.x - im.drop.x)/1, (s0.y - im.drop.y)/1);

          a.physics.body.ApplyImpulse(impulse, a.physics.body.GetWorldCenter());
          this.state = Game.RESOLVE;
          this.projectile = a;

        }
        return;
      }
      if (this.state === Game.RESOLVE){
        var waitingactors = scene.actors.filter(function(a){
          return a.status === "sleeping";
        });
        
        if(waitingactors.length > 0) {
          scene.actors.shift();
          scene.actors[0].popUp(s0);
          this.state = Game.WAIT;
        } else {
          this.state = Game.DONE;
        }

        return;
      }
      if (this.state === Game.DONE){

        return;
      }

    }
  });
  Game.WAIT = 'wait';
  Game.AIM = 'aim';
  Game.RESOLVE = 'resolve';
  Game.DONE = 'done';

  return Game;
});