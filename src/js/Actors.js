define(['box2d', 'GameObject', 'Factory'], function(box2d, GameObject, Factory){
  var body, fixture, shapes;
  
  var sprite = "c-or-1.png";
  
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
        break;
      case "YELLOW":
        fixture.radius = 20;
        break;
      case "BLACK":
        fixture.radius = 22;
        break;
      case "WHITE":
        fixture.radius = 20;
        break;
      default: /// RED
        fixture.radius = 20;
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