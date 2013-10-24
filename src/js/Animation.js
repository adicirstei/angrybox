define(['Component', 'Sprite'], function (Component, Sprite) {
  var Animation = Component.extend({
    tag: 'sprite',
    
    'constructor': function(opts){
      this.sprites= [];
      for(var i= 0; i< opts.frames.length; i++){
        this.sprites.push(new Sprite({frame: opts.frames[i]}));  
      }
      
      
      this.frames = opts.frames;
      this.fps = opts.fps;
      this.loop = opts.loop || true;
      this.currentframe = opts.startframe || 0;
      this.startframe = this.currentframe;

      // TODO set start time to the real value
      this.starttime = (new Date()).getTime();
      this.len = this.frames.length;
      this.frameLen = 1000 / this.fps;
    },
    update: function(time){
      this.currentframe = (Math.floor((time - this.starttime) / this.frameLen) + this.startframe) % this.len;

    },
    getSprite: function(){
      return this.sprites[this.currentframe];
    }
  });

  return Animation;
});