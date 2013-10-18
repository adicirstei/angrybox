define(['core', 'box2d', 'GameObject'], function(ab, box2d, GameObject){
  var Scene = ab.Class.extend({
    'constructor': function(canvas){
      
      this.debug = document.getElementById('debug');
      this.toBeDeleted = [];
      this.world = setupPhysics();

      // the layers will contain arrays of GameObject instances
      this.layers = [];
    },
    update: function(){
      
      this.world.Step(1/60, 10, 10);
      this.world.ClearForces();
      this.world.DrawDebugData();



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