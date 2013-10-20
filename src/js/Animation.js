define(['core'], function (ab) {
  var Animation = ab.Class.extend({
    tag: 'sprite',
    'constructor': function(frames, fps, loop, startframe){
      this.frames = frames;
      this.fps = fps;
      this.loop = loop;
      this.currentframe = startframe || 0;
      this.startframe = this.currentframe;

      // TODO set start time to the real value
      this.starttime = (new Date()).getTime();
      this.len = frames.length;
      this.frameLen = 1000 / fps;
    },
    update: function(time){
      this.currentframe = ((time - this.starttime) / this.frameLen + this.startframe) % this.len;
    },
    getSprite: function(){
      return this.frames[this.currentframe];
    }
  });

  return Animation;
});