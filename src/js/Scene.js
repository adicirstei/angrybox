define(['core', 'box2d', 'Factory'], function(ab, box2d, Factory){
  var BG_LAYER = 0, PLX_LAYER = 1, OBJ_LAYER = 2, EFX_LAYER = 3;
  var Scene = ab.Class.extend({
    'constructor': function(context){
      
      this.debug = document.getElementById('debug');
      this.toBeDeleted = [];
      this.world = setupPhysics();
      setupDebugDraw(this.world, debug.getContext('2d'));
      this.context = context;
      // the layers will contain arrays of GameObject instances
      this.layers = [[], [], [], []];
    },
    update: function(){
      var t = (new Date()).getTime();
      var l, i, lay, go;
      this.world.Step(1/60, 10, 10);
      this.world.ClearForces();
      this.world.DrawDebugData();
      this.context.clearRect(0, 0, ab.viewport.w, ab.viewport.h);
      // for each GameObject instance, call update
      for(l=0; l < this.layers.length; l++){
        lay = this.layers[l];
        for(i=0; i<lay.length; i++){
          go = lay[i];
          go.update(t);
          this.drawGO(go);
        }
      }
      this.cleanUp();
    },

    drawGO: function(go){
      var s = go.getSprite();
      var img = s && s.spimg.img;
      if(!img){
        console.log("nothing to draw");
        return;
      }
      this.context.translate(go.x, go.y);
      this.context.rotate(go.rot);
      this.context.drawImage(img, s.spimg.x, s.spimg.y, s.spimg.w, s.spimg.h, -s.w, -s.h, s.spimg.w, s.spimg.h);
      this.context.rotate(-go.rot);
      this.context.translate(-go.x, -go.y);
    },

    addGameObject: function(go){
      this.layers[OBJ_LAYER].push(go);
    },
    cleanUp: function(){
      // var spr;
      // for(var i=0; i<this.toBeDeleted.length; i+=1){
      //   spr = this.toBeDeleted.shift();
      //   this.world.DestroyBody(spr.view.body);
        
      // }
    }
  });

  function setupDebugDraw(world, ctx){
    // setup debug draw for box2d
    // ==================
    var debugDraw = new box2d.b2DebugDraw();

      debugDraw.SetSprite(ctx);
      debugDraw.SetDrawScale(box2d.SCALE);
    //      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);

      world.SetDebugDraw(debugDraw);

    // ===================

  }

  function setupPhysics () {
    var w = new box2d.b2World(new box2d.b2Vec2(0, 10), true);
    var listener = new box2d.b2ContactListener();
    
    listener.PostSolve = function(contact, impulse) {
        var s1, s2, imp;
        imp = impulse.normalImpulses[0];
        if(imp > 0.2) {
          s1 = contact.GetFixtureA().GetBody().gameSprite;
          s2 = contact.GetFixtureB().GetBody().gameSprite;
          s1.takeDamage(imp);
          s2.takeDamage(imp);
        }                 
    }
    w.SetContactListener(listener);
    return w;
  }

  return Scene;

});