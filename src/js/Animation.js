define(['core', 'Component', 'Sprite'], function (ab, Component, Sprite) {
  var Animation = Component.extend({
    tag: 'sprite',
    
    'constructor': function(opts){
      this.sprites= [];
      
      for(var i= 0; i< opts.frames.length; i++){
        this.sprites.push(new Sprite({frame: opts.frames[i]}));  
      }
      
      
      this.frames = opts.frames;
      this.fps = opts.fps;
      this.loop = opts.loop;
      
      if(this.loop === undefined){
        this.loop = true;
      }
      
      this.currentframe = opts.startframe || 0;
      this.startframe = this.currentframe;

      // TODO set start time to the real value
      this.starttime = ab.Time.time;
      this.len = this.frames.length;
      this.frameLen = 1000 / this.fps;
    },
    update: function(time){
      if (this.currentframe >= this.len) {
        // signal somehow the end of component
        return;
      }
      if(this.loop){
        this.currentframe = (Math.floor((time - this.starttime) / this.frameLen) + this.startframe) % this.len;
      } else {
        this.currentframe = (Math.floor((time - this.starttime) / this.frameLen) + this.startframe);
      }


    },
    getSprite: function(){
      return this.sprites[this.currentframe];
    }
  });

  ab.Factory.registerClass("Animation", Animation);
  return Animation;
});