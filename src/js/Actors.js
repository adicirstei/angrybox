define(['box2d', 'GameObject', 'Factory', 'SuicideScript', 'PhysComponent', 'Sprite', 'PuffSpawner'], function(box2d, GameObject, Factory){
  var body, fixture, shapes;
  
  var sprite;
  
  body = {
    static: false,
    position:{x:-1000, y:-1000},
    angularDamping: 0.4
  };
  
  fixture = {
    density: 2,
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
        shapes[0].radius = 9;
        shapes[0].y = 2;
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
      this.x = p.x;
      this.y = p.y;
      this.physics.body.SetPosition(new box2d.b2Vec2(p.x/box2d.SCALE, p.y/box2d.SCALE));
    
    };
    
    a.popUp = function(p) {
      this.status = "awake";
      this.setPos(p);
    };
    a.onCollision= function(){
      a.puff.active = false;
      a.suicide.active = true;
    };
    var phys = Factory.createComponent({classname:"PhysComponent", data:{fixture: fixture, shapes: shapes, body: body, parent: a}});
    var ss = Factory.createComponent({classname:"SuicideScript", data:{parent: a}});
    var spr = Factory.createComponent({classname:"Sprite", data:{frame: sprite, parent: a}});
    var puffscript = Factory.createComponent({classname:"PuffSpawner", data:{}});

    
    puffscript.parent = a;

    a.puff = puffscript;
    a.suicide = ss;
    ss.active = false;
    
    var redex = {frames: ["red-ex-1.png", "red-ex-2.png", "red-ex-3.png"], fps: 10, loop: false};
    var bluex = {frames: ["blue-ex-1.png", "blue-ex-2.png", "blue-ex-3.png"], fps: 10, loop: false};
    var yelex = {frames: ["yellow-ex-1.png", "yellow-ex-2.png", "yellow-ex-3.png"], fps: 10, loop: false};
    var blackex = {frames: ["black-ex-1.png", "black-ex-2.png", "black-ex-3.png"], fps: 10, loop: false};
    var whitex = {frames: ["white-ex-1.png", "white-ex-2.png", "white-ex-3.png"], fps: 10, loop: false};
    
    switch (TYPE){
      case "BLUE":
        ss.animation = bluex;
        break;
      case "YELLOW":
        ss.animation = yelex;
        break;
      case "BLACK":
        ss.animation = blackex;
        break;
      case "WHITE":
        ss.animation = whitex;
        break;
      default: /// RED
        ss.animation = redex;
    }
    
    
    
    
    

    phys.body.SetAwake(false);
    phys.body.SetBullet(true);
    var filter = new box2d.b2FilterData();
    
    filter.categoryBits = 0x0002;
    filter.maskBits = 0xfffd;
    
    phys.body.GetFixtureList().SetFilterData(filter);
    
    
    a.physics = phys;
    a.status = "sleeping";
    
    a.components.push(phys);
    a.components.push(ss);
    a.components.push(spr);
    a.components.push(puffscript);
  
    return a;
  };
  
  return Actors;

});