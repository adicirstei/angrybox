define(['box2d', 'GameObject', 'Factory'], function(box2d, GameObject, Factory){
  var body, fixture, shapes;
  
  var sprite;
  
  body = {
    static: false
  };
  
  fixture = {
    density: 1,
    friction: 0.9,
    restitution: 0.2
  };
  
  sahpes = [{
    shape: "CIRCLE",
    radius: 20
  }];
  
  
  var Actors = {};
  Actors.create = function(TYPE){
    switch (TYPE){
      case "BLUE":
        fixture.radius = 10;
        sprite = "blue-actor.png";
        break;
      case "YELLOW":
        fixture.radius = 20;
        sprite = "yellow-actor.png";
        break;
      case "BLACK":
        fixture.radius = 22;
        sprite = "black-actor.png";
        break;
      case "WHITE":
        fixture.radius = 20;
        sprite = "white-actor.png";
        break;
      default: /// RED
        fixture.radius = 20;
        sprite = "red-actor.png";
    }
    
    var a = new GameObject({});
    var phys = Factory.createComponent({classname:"PhysComponent", data:{fixture: fixture, shapes: shapes, body: body, parent: a}});
    var spr = Factory.createComponent({classname:"Sprite", data:{frame: sprite, parent: a}});
    a.components.push(phys);
    a.components.push(spr);
  
    return a;
  };
  
  return Actors;

});