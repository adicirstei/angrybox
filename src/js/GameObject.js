define(['core', 'Sprite'], function(ab, Sprite){
  var GameObject = ab.Class.extend({
    'constructor': function(opt){
      // copy watever parameters are passed in opt
      for (var k  in opt){
        this[k] = opt[k];
      }
    },
    update: function(){
      // translate box2d coords to pixels world coords if a body is present
      // if an animation is present compute current frame
      // etc
    },
    getSprite: function(){
      // returns the current sprite if any in order to be drawn
      return null;
    }

  });
  
  return GameObject;
});