define(['ab', 'Sprite'], function(ab, Sprite){
  var GameObject = ab.class.extend({
    'constructor': function(sprites, body){
      this.sprites = sprites;
      this.body = body;
    }
  });
  
  return GameObject;
});