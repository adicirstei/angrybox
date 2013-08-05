define(['World'], function(World){
  
  return {
    start: function(){
      var w = new World();
      this.world = w;
    },
    render:function(){
      requestAnimationFrame(this.render);
      // render code goes here


    }
  };

});