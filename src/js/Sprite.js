define(['core', 'Component'], function(ab, Component){
  var Sprite = Component.extend({
    'constructor': function(options){
      this.spimg = ab.AssetManager.spriteimgs[options.frame];
      // this.cx = options.cx;
      // this.cy = options.cy;
      this.w = this.spimg.w/2.0;
      this.h = this.spimg.h/2.0;
      // this.rot = options.rot;
    },

    tag: 'sprite',

    getSprite: function(){
      return this;
    },

    draw: function(ctx){
      var img = this.spimg.img;
      if(!img){
        return;
      }
      ctx.translate(this.cx, this.cy);
      ctx.rotate(this.rot);
      ctx.drawImage(img, this.spimg.x, this.spimg.y, this.spimg.w, this.spimg.h, -this.w, -this.h, this.spimg.w, this.spimg.h);
      ctx.rotate(-this.rot);
      ctx.translate(-this.cx, -this.cy);
    }
  });
  
  return Sprite;
});