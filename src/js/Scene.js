define(['core', 'box2d', 'Factory', 'Actors', 'Enemies', 'KillerScript', 'Animation', 'StoneTile', 'WoodTile', 'GlassTile'], function(ab, box2d, Factory, Actors){
  var BG_LAYER = 0, PLX_LAYER = 1, SOBJ_LAYER=2, OBJ_LAYER = 3, EFX_LAYER = 4;
  var Scene = ab.Class.extend({
    'constructor': function(context){
      
      this.debug = document.getElementById('debug');
      this.toBeDeleted = [];
      this.world = setupPhysics();
      setupDebugDraw(this.world, debug.getContext('2d'));
      this.context = context;
      // the layers will contain arrays of GameObject instances
      this.layers = [[], [], [], [], []];
      this.paralax = [0.0, 0.3, 1.0, 1.0, 1.0];
    },
    kill: function(go) {
      if(go){
        this.toBeDeleted.push(go);
      }
    },
    setLevel: function(lvlData){
      var l, j, go;
      var scene = this;
      
      
      this.bounds = lvlData.world || {l:0, t: 0, r: ab.viewport.w, b: ab.viewport.h};
      
      
      this.slots = lvlData.slots;
      
      this.actors = lvlData.actors.map(function(t, i){
        var a = Actors.create(t);
        a.setPos(scene.slots[i]);
        scene.addGameObject(a, OBJ_LAYER);
        return a;
      });
      
      for(l=0; l<this.layers.length; l++){
        for(j=0; j<lvlData.layers[l].length; j++){
          go = Factory.createGameObject(lvlData.layers[l][j]);
          this.addGameObject(go, l);
        }
      }
      
      // add actors in the queue
      var actors = lvlData.actors;
      
      
    
    },
    update: function(){
      var t = ab.Time.time;
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
          if(go.x > this.bounds.r || go.x < this.bounds.l || go.y > this.bounds.b){
            this.kill(go);
          } else {
            this.drawGO(go);
          }
        }
      }
      this.cleanUp();
    },

    drawGO: function(go){
      var sArr = go.getSprites();
      var l = sArr.length, i, img, s, vp, x, y;
      var ctx = this.context;
      vp = ab.viewport;

      ctx.font = "7pt Arial";
      ctx.fillStyle = "black";

      for (i=0; i<l;i++){
        s = sArr[i].getSprite();
        img = s && s.spimg.img;
        if(!img){
          continue;
        }
        // translate world pixel coords to viewport coords
        x = go.x + s.x - vp.x * this.paralax[go.layer];
        y = go.y+s.y - vp.y;
        
        ctx.translate(x, y);
        ctx.rotate(go.rot);
        if(go.tag === "text") {
          go.draw(ctx);
        } else {
          ctx.drawImage(img, s.spimg.x, s.spimg.y, s.spimg.w, s.spimg.h, -s.w, -s.h, s.spimg.w, s.spimg.h);
        }
        ctx.rotate(-go.rot);
        if(go.health){
          ctx.fillText(go.health, 0,0);
        }

        ctx.translate(-x, -y);
      }
    },

    addGameObject: function(go, layer){
      go.layer = layer;
      this.layers[layer].push(go);
    },
    
    cleanUp: function(){
      var go, layer;
      for(var i=0; i<this.toBeDeleted.length; i+=1){
        go = this.toBeDeleted.shift();
        layer = this.layers[go.layer];

        for(var j = 0; j<layer.length; j++){
          if(go === layer[j]){
            layer.splice(j,1);
            break;
          }
        }
        go.destroy();
      }
    }
  });

  Scene.BG_LAYER = BG_LAYER;
  Scene.PLX_LAYER = PLX_LAYER;
  Scene.SOBJ_LAYER = SOBJ_LAYER;
  Scene.OBJ_LAYER = OBJ_LAYER;
  Scene.EFX_LAYER = EFX_LAYER;  
  
  
  function setupDebugDraw(world, ctx){
    // setup debug draw for box2d
    // ==================
    var debugDraw = new box2d.b2DebugDraw();

      debugDraw.SetSprite(ctx);
      debugDraw.SetDrawScale(box2d.SCALE/1);
    //      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);

      world.SetDebugDraw(debugDraw);

    // ===================

  }

  function setupPhysics () {
    var w = new box2d.b2World(new box2d.b2Vec2(0, 10), true);
    var listener = new box2d.b2ContactListener();
    
    listener.PostSolve = function(contact, impulse) {
        var o1, o2, imp;
        imp = impulse.normalImpulses[0];
        if(imp > 3) {
          o1 = contact.GetFixtureA().GetBody().GetUserData().gameobject;
          o2 = contact.GetFixtureB().GetBody().GetUserData().gameobject;
          o1.collide(imp);
          o2.collide(imp);
        }                 
    }
    w.SetContactListener(listener);
    return w;
  };

  return Scene;

});