define(['core'], function (ab) {
  var Animation = ab.Class.extend({
    'constructor': function(frames, fps, loop, startframe){
      this.frames = frames;
      this.fps = fps;
      this.loop = loop;
      this.currentframe = startframe || 0;

      // TODO set start time to the real value
      this.starttime = 0;
    },
    update: function(time){

    }
  });

  return Animation;
});