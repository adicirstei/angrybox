define(['core', 'Component', 'box2d'], function(ab, Component, box2d){
  var PhysComponent = Component.extend({
    tag: 'body',

    'constructor': function(opts){
    
      // TODO: implement box2d body creation logic 
      // we should find three data structures that define a Box2D object:
      // a) b2FixtureDef: A Fixture Definition defines the attributes of the object, such as density, friction, and restitution (bounciness).
      // b) b2BodyDef: A Body Definition defines where in the world the object is, and if it is dynamic (reacts to things) or static. 
      // c) shapes are in a one to one relation with fixtures
      
      
      var w = ab.scene.world;
      
      var bodyDef = new box2d.b2BodyDef();
      bodyDef.type = box2d.b2Body.b2_staticBody;
      bodyDef.position.x = 2; // position in box2d units
      bodyDef.position.y = 3;
      
      var fixDef = new box2d.b2FixtureDef();
      fixDef.density = 1.0;
      fixDef.friction = 0.5;
      fixDef.restitution = 0.2;
      
      fixDef.shape = new box2d.b2PolygonShape();
      fixDef.shape.SetAsBox(2, 2); // half width and half height in box2d units
      
      // b2PolygonShape.SetAsBox method may take 4 parameters
      // void SetAsBox(float32 hx, float32 hy);
      // void SetAsBox(float32 hx, float32 hy, const b2Vec2& center, float32 angle);
      
      // b2CircleShape constructor may take also the position as a second argument, I guess.
      
      
      
      this.body = w.CreateBody(bodyDef);
      this.body.CreateFixture(fixDef);
    },
    update: function(time){
      if(!this.body){
        return;
      }
      var p = this.body.GetPosition();
      this.x = p.x * box2d.SCALE;
      this.y = p.y * box2d.SCALE;

      this.rot = this.body.GetAngle();
    }
  });
  return PhysComponent;
});