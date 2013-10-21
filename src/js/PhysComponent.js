define(['Component', 'box2d'], function(Component, box2d){
  var PhysComponent = Component.extend({
    tag: 'body',
    x: 0,
    y: 0,
    rot: 0,

    'constructor': function(body){
      this.body = body;
    },
    update: function(time){
      if(!this.body){
        return;
      }
      var p = this.body.GetPosition();
      this.x = p.x * box2d.SCALE;
      this.y = p.y * box2d.SCALE;

      this.rot = this.body.GetAngle();
    }
  });
  return PhysComponent;
});