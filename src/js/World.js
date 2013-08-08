define(['boxbox', 'Events', 'Level'], function(boxbox, Events, Level){
  var World = function(canvas){
    this.b2World = new boxbox.createWorld(canvas);
  }

  World.prototype = Events;


  World.prototype.loadLevel = function(level){
    var damage = 0;
    var that = this;
    Level.load(level, function (data) {
      for(var i=0, l = data.ground.length; i<l; i++){

        // creating ground objects
        that.b2World.createEntity(
          data.ground[i],
          {
            type: 'static'
          }
        );
      }
    });

    var player = this.b2World.createEntity({
      name: "player",
      shape: "circle",
      radius: .3,
      density: 4,
      restitution: .7,
      image: 'img/b1.png',
      friction: 6
    });

    player.applyImpulse(1, 90);

    player.onImpact(function(s, f){
      var i = player.image();
      console.log(i);
      damage += f;
      if (damage> 60)
        player.destroy();
      if (damage > 50 && i != 'img/b2.png') {
        player.image ('img/b2.png');  
      }
      
    });


    // for testing purposes
    this.trigger('kill');
  };



  return World;

});