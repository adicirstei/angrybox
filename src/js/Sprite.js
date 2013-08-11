define(['box2d', 'easeljs'], function(box2d, easeljs){
  var Sprite = function(world, data){
    var f, b;
    this.view = new easeljs.Bitmap('../img/b1.png');
    this.view.regX = this.view.regY = box2d.SCALE / 2;

    f = new box2d.b2FixtureDef();
    f.density = data.density || 1;
    f.friction = data.friction || 0.5;
    f.restitution = data.restitution || 0.8;
    b = new box2d.b2BodyDef();
    b.type = (data.type === 'static'? box2d.b2Body.b2_staticBody : box2d.b2Body.b2_dynamicBody) ;
    b.position.x = data.x || Math.random()*15 +1;
    b.position.y = data.y || 0;

    switch(data.shape) {
      case 'circle': 
        f.shape = new box2d.b2CircleShape(data.radius || 1);
        break;
      default:
        f.shape = new box2d.b2PolygonShape();
        f.shape.SetAsBox(data.width || 1, data.height || 1);
    }
    
    this.view.body = world.CreateBody(b);
    this.view.body.CreateFixture(f);

    this.view.onTick = function(e){
      var p = this.body.GetPosition();
      this.x = p.x * box2d.SCALE;
      this.y = p.y * box2d.SCALE;
      this.rotation = this.body.GetAngle() * 180 / Math.PI;
    };
    
  };

  return Sprite;
});