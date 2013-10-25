define(['box2d', 'GameObject', 'Factory'], function(box2d, GameObject, Factory){
  var body, fixture, shapes;
  
  var sprite;
  
  body = {
    static: false,
    position:{x:-1000, y:-1000}
  };
  
  fixture = {
    density: 1,
    friction: 0.9,
    restitution: 0.2
  };
  
  shapes = [{
    shape: "CIRCLE",
    radius: 2000,
    x:0,
    y:0
  }];
  
  
  var Actors = {};
  Actors.create = function(TYPE){
    shapes[0].y = 0;
    switch (TYPE){
      case "BLUE":
        shapes[0].radius = 10;
        sprite = "blue-actor.png";
        break;
      case "YELLOW":
        shapes[0].radius = 10;
        shapes[0].y = 3;
        sprite = "yellow-actor.png";
        break;
      case "BLACK":
        shapes[0].radius = 17;
        sprite = "black-actor.png";
        break;
      case "WHITE":
        shapes[0].radius = 17;
        sprite = "white-actor.png";
        break;
      default: /// RED
        shapes[0].radius = 13;
        sprite = "red-actor.png";
    }
    
    var a = new GameObject({});
    a.setPos  = function(p){
      this.body.SetPosition(new box2d.b2Vec2(p.x, p.y));
    
    };
    
    var phys = Factory.createComponent({classname:"PhysComponent", data:{fixture: fixture, shapes: shapes, body: body, parent: a}});
    var spr = Factory.createComponent({classname:"Sprite", data:{frame: sprite, parent: a}});
    a.components.push(phys);
    a.components.push(spr);
  
    return a;
  };
  
  return Actors;

});