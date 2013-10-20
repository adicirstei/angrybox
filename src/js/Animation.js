define(['Component', 'Sprite'], function (Component, Sprite) {
  var Animation = Component.extend({
    tag: 'sprite',
    sprites: [],
    'constructor': function(frames, fps, loop, startframe){

      for(var i= 0; i< frames.length; i++){
        this.sprites.push(new Sprite({frame: frames[i]}));  
      }
      
      
      this.frames = frames;
      this.fps = fps;
      this.loop = loop || true;
      this.currentframe = startframe || 0;
      this.startframe = this.currentframe;

      // TODO set start time to the real value
      this.starttime = (new Date()).getTime();
      this.len = frames.length;
      this.frameLen = 1000 / fps;
    },
    update: function(time){
      console.log(this.currentframe = (Math.floor((time - this.starttime) / this.frameLen) + this.startframe) % this.len);

    },
    getSprite: function(){
      return this.sprites[this.currentframe];
    }
  });

  return Animation;
});