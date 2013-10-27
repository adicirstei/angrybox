define(['core', 'Component', 'box2d'], function(ab, Component, box2d){
  var PhysComponent = Component.extend({
    tag: 'body',

    'constructor': function(opts){

      // we should find three data structures that define a Box2D object:
      // a) b2FixtureDef: A Fixture Definition defines the attributes of the object, such as density, friction, and restitution (bounciness).
      // b) b2BodyDef: A Body Definition defines where in the world the object is, and if it is dynamic (reacts to things) or static. 
      // c) shapes are in a one to one relation with fixtures
      
      this.enabled = true;
      var w = ab.scene.world, f, b, sArr, s, parent;

      b = opts.body;
      f = opts.fixture;
      sArr = opts.shapes;
      parent = this.parent = opts && opts.parent;
      
      
      var bodyDef = new box2d.b2BodyDef();
      bodyDef.type = (b.static? box2d.b2Body.b2_staticBody: box2d.b2Body.b2_dynamicBody);
      bodyDef.position.x = b.position.x / box2d.SCALE; // position in box2d units
      bodyDef.position.y = b.position.y / box2d.SCALE;
      bodyDef.angle = ab.deg2Rad(b.rot || 0);
      bodyDef.angularDamping = b.angularDamping || 0.2;

      
      var fixDef = new box2d.b2FixtureDef();
      fixDef.density = f.density;
      fixDef.friction = f.friction;
      fixDef.restitution = f.restitution;

      this.body = w.CreateBody(bodyDef);
      this.body.SetUserData({gameobject: parent});
      var cent, rot;
      for (var i = 0; i< sArr.length; i++){
        s = sArr[i];
        cent = new box2d.b2Vec2((s.x || 0)/box2d.SCALE, (s.y || 0)/box2d.SCALE);
        rot = ab.deg2Rad(s.rot || 0);
        
        switch(s.shape){
          case "CIRCLE":
            fixDef.shape = new box2d.b2CircleShape(s.radius / box2d.SCALE);
            break;
          case "RECTANGLE":
            fixDef.shape = new box2d.b2PolygonShape();
            fixDef.shape.SetAsOrientedBox(s.w/box2d.SCALE, s.h/box2d.SCALE, cent, rot); // half width and half height in box2d units
            break;
          default:
        };
        this.body.CreateFixture(fixDef);
      }
      // b2PolygonShape.SetAsBox method may take 4 parameters
      // void SetAsBox(float32 hx, float32 hy);
      // void SetAsBox(float32 hx, float32 hy, const b2Vec2& center, float32 angle);
    },
    destroy: function(){
      // take care of the physics
      var w = ab.scene.world;
      
      w.DestroyBody(this.body);
      
    },
    update: function(time){

      if(!this.body){
        return;
      }

      var p = this.body.GetPosition();
      this.x = this.parent.x = p.x * box2d.SCALE;
      this.y = this.parent.y = p.y * box2d.SCALE;

      this.rot = this.parent.rot = this.body.GetAngle();
    }
  });

  ab.Factory.registerClass("PhysComponent", PhysComponent);
  return PhysComponent;
});