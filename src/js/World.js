define(['boxbox'], function(boxbox){
  var World = function(canvas){
    this.b2World = new boxbox.createWorld(canvas);

  }
  World.prototype.loadLevel = function(level){
    var player = this.b2World.createEntity({
      name: "player",
      shape: "circle",
      radius: 2,
      color: '#ffee00',
      density: 4
    });
  };
  return World;

});