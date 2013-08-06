define(['World'], function(World){
  
  return {
    start: function(){
      var w = new World(document.getElementById('canvas'));
      this.world = w;
      w.loadLevel(3);
    },
  };
});