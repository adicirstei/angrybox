define(['easeljs', 'box2d', 'Level', 'Sprite', 'Enemy'], function(easeljs, box2d, Level, Sprite, Enemy){
  var Scene = function(canvas){
    var g = window.AngryBox.game;
    this.stage = new easeljs.Stage(canvas);
    this.debug = document.getElementById('debug');

    easeljs.EventDispatcher.initialize(Scene.prototype);

    this.world = setupPhysics();
    if (g) {
      g.worldWidth = 800/box2d.SCALE;
      g.worldHeight = 600/box2d.SCALE;
    }


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

        data.ground[i].world = that.world;
        data.ground[i].type = 'static';
        var s = new Sprite(data.ground[i]);
        that.stage.addChild(s.view);
      
      }

      that.debug.onmousedown = function(){
        var s = new Sprite({world: that.world, shape: 'circle', radius: 0.3, y: 8});
        that.stage.addChild(s.view);
        var enemy = new Enemy({world: that.world, shape: 'circle', radius: 0.3, y: 6});
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