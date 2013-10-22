define(['core', 'Component'], function(ab, Component){
  var Sprite = Component.extend({
    'constructor': function(options){
      this.spimg = ab.AssetManager.spriteimgs[options.frame];
      this.w = this.spimg.w/2.0;
      this.h = this.spimg.h/2.0;
      this.x = options.x || 0;
      this.y = options.y || 0;
    },

    tag: 'sprite',

    getSprite: function(){
      return this;
    }
  });
  
  return Sprite;
});