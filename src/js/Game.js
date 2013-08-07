define(['World'], function(World){
  
  return {
    score: 0,
    start: function(){
      var w = new World(document.getElementById('canvas'));
      w.on('kill', this.kill);
      this.world = w;
      w.loadLevel(3);
    },

    kill: function(){
      this.score += 100;
      console.log(this.score);
    }
  };
});