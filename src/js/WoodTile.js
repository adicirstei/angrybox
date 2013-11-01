define(['core', 'GameObject'], function(ab, GameObject){
  var body, fixture, shapes;
  body = {
    static: false,
    position:{x:-1000, y:-1000},
    angularDamping: 0.6
  };
  
  fixture = {
    density: 0.7,
    friction: 0.9,
    restitution: 0.2
  };
  
  shapes = [{
    shape: "RECTANGLE",
    w: 0,
    h: 0,
    x:0,
    y:0
  }];


  var WoodTile = GameObject.extend({
  
    'constructor': function (opts){
      var i;
      
      body.position.x= opts.x;
      body.position.y=opts.y;
      body.rot = opts.rot;
      
      var go = this;
      
      go.damageFactor = 0.25;
      go.damageStep = 100 / opts.frames.length;
      go.frameIndex = 0;
      
      go.sprites = [];
      go.components = [];
      go.health = 100;
      
      for(i=0; i<opts.frames.length; i++){
        go.sprites.push(ab.Factory.createComponent({classname:"Sprite", data:{frame: opts.frames[i], parent: go}}));
      }
      
      shapes[0].w = go.sprites[0].w;
      shapes[0].h = go.sprites[0].h;
     
      
      var phys = ab.Factory.createComponent({classname:"PhysComponent", data:{fixture: fixture, shapes: shapes, body: body, parent: go}});
      go.components.push(phys);
      go.components.push(go.sprites[0]);
      

      
    },
    onDestroyed: function(){
      ab.scene.kill(this);
    },    
    onCollision: function(){
      var d = 100 - this.health;
      
      this.frameIndex = Math.floor(d/this.damageStep);
    
    },
    
    getSprites: function(){
      return [this.sprites[this.frameIndex]];
    }
  
  
  });

  ab.Factory.registerClass("WoodTile", WoodTile);
  return WoodTile;
});