define(['core', 'box2d', 'GameObject', 'Factory', 'SuicideScript', 'PhysComponent', 'Animation'], function(ab, box2d, GameObject, Factory){
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
    radius: 32,
    x:0,
    y:0
  }];

  var Enemy = GameObject.extend({
    'constructor': function(opts){
      var anims;
      body.position.x= opts.x;
      body.position.y=opts.y;
      body.rot = opts.rot;
      switch (opts['type']){
        case "STRONG":
          this.damageFactor = 0.4;
          anims = {healthy: {frames: ["c-bl-1.png", "c-bl-2.png", "c-bl-3.png"], fps: 10}, damaged: {frames: ["c-bld-1.png", "c-bld-2.png", "c-bld-3.png"], fps: 10}};
          break;

        default: /// NORMAL
          this.damageFactor = 1.0;
          anims = {healthy: {frames: ["c-or-1.png", "c-or-2.png", "c-or-3.png"], fps: 10}, damaged: {frames: ["c-ord-1.png", "c-ord-2.png", "c-ord-3.png"], fps: 10}};

      }
      
      
      this.health = 100;
      this.components = [];

      anims.healthy.parent = anims.damaged.parent = this;
      
      var phys = Factory.createComponent({classname:"PhysComponent", data:{fixture: fixture, shapes: shapes, body: body, parent: this}});
      this.anims = [];
      this.anims.push(Factory.createComponent({classname:"Animation", data: anims.healthy}));
      this.anims.push(Factory.createComponent({classname:"Animation", data: anims.damaged}));
      this.physics = phys;

      
      this.components.push(phys);

      this.components.push(this.anims [0]);    
    
    },
    setPos: function(p){
        this.x = p.x;
        this.y = p.y;
        this.physics.body.SetPosition(new box2d.b2Vec2(p.x/box2d.SCALE, p.y/box2d.SCALE));
    },
    onCollision: function(){
      var d = 100 - this.health;
      
      this.frameIndex = Math.floor(d/this.damageStep);
    
    },
    onDestroyed: function(){
      ab.scene.kill(this);
    },   
  });
  

  
  
  Factory.registerClass('Enemy', Enemy);
  
  
  return Enemy;

});