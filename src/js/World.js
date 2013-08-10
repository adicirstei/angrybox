// this class require rewriting for CreateJS

define(['boxbox', 'Events', 'Level'], function(boxbox, Events, Level){
  var World = function(canvas){
//    this.b2World = new boxbox.createWorld(canvas);
  }

  World.prototype = Events;


  World.prototype.loadLevel = function(level){
    var damage = 0;
    var that = this;
    Level.load(level, function (data) {
      for(var i=0, l = data.ground.length; i<l; i++){

        // creating ground objects
/*        that.b2World.createEntity(
          data.ground[i],
          {
            type: 'static'
          }
        );
*/        
      }
    });
  };



  return World;

});