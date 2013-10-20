define(['core', 'box2d'], function(ab, box2d){
  var BG_LAYER = 0, PLX_LAYER = 1, OBJ_LAYER = 2, EFX_LAYER = 3;
  var Scene = ab.Class.extend({
    'constructor': function(canvas){
      
      this.debug = document.getElementById('debug');
      this.toBeDeleted = [];
      this.world = setupPhysics();

      // the layers will contain arrays of GameObject instances
      this.layers = [[], [], [], []];
    },
    update: function(){
      var t = (new Date()).getTime();
      var l, i, lay;
      this.world.Step(1/60, 10, 10);
      this.world.ClearForces();
      this.world.DrawDebugData();

      // for each GameObject instance, call update
      for(l=0; l < this.layers.length; l++){
        lay = this.layers[l];
        for(i=0; i<lay.length; i++){
          lay[i].update(t);
        }
      }

      this.draw();
      this.cleanUp();
    },
    draw: function(){
      var g = ab.game;
      // loop through all GameObjects instances, optain the sprite and draw it



    },
    cleanUp: function(){
      // var spr;
      // for(var i=0; i<this.toBeDeleted.length; i+=1){
      //   spr = this.toBeDeleted.shift();
      //   this.world.DestroyBody(spr.view.body);
        
      // }
    }
  });


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