define(['easeljs', 'box2d', 'Level', 'Sprite', 'Enemy'], function(easeljs, box2d, Level, Sprite, Enemy){
  var Scene = function(canvas){

    this.stage = new easeljs.Stage(canvas);
    this.debug = document.getElementById('debug');

    easeljs.EventDispatcher.initialize(Scene.prototype);

    this.world = setupPhysics();

    easeljs.Ticker.addListener(this);
    easeljs.Ticker.setFPS(60);
    easeljs.Ticker.useRAF = true;
  }

  Scene.prototype.tick = function(){
    this.stage.update();
    this.world.DrawDebugData();
    this.world.Step(1/60, 10, 10);
    this.world.ClearForces();
  };

  Scene.prototype.loadLevel = function(level){
    var damage = 0;
    var that = this;
    Level.load(level, function (data) {
      var f, b;
      for(var i=0, l = data.ground.length; i<l; i++){
        f = new box2d.b2FixtureDef();
        f.density = 1;
        f.friction = 0.5;

        b = new box2d.b2BodyDef();
        b.type = box2d.b2Body.b2_staticBody;
        b.position.x = data.ground[i].x;
        b.position.y = data.ground[i].y;

        f.shape = new box2d.b2PolygonShape();
        f.shape.SetAsBox(data.ground[i].width, data.ground[i].height);

        that.world.CreateBody(b).CreateFixture(f);

      
      }

      that.debug.onmousedown = function(){
        var s = new Sprite({world: that.world, shape: 'circle', radius: 0.3});
        that.stage.addChild(s.view);
        var enemy = new Enemy({world: that.world, shape: 'circle', radius: 0.3});
        that.stage.addChild(enemy.view);
      }
      
      var debugDraw = new box2d.b2DebugDraw();

      debugDraw.SetSprite(that.debug.getContext('2d'));
      debugDraw.SetDrawScale(box2d.SCALE);
      debugDraw.SetFillAlpha(0.5);
      debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);

      that.world.SetDebugDraw(debugDraw);


    });
  };

  function setupPhysics () {
    var w = new box2d.b2World(new box2d.b2Vec2(0, 10), true);
    return w;
  }


  return Scene;

});