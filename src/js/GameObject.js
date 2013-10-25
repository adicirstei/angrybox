define(['Component'], function(Component){
  var GameObject = Component.extend({
    'constructor': function(opt){
      this.components = opt.components || [];
      this.x = opt.x || -1000;
      this.y = opt.y || -1000;
      this.rot = opt.rot || 0;
      
      this.name = opt.name || "noname object";
    },
    update: function(time){
      var c;
      var i, l=this.components.length;
      for(i=0; i < l; i++){
        c = this.components[i];
        c.update(time);
        if(c.tag === 'body'){
          this.rot = c.rot;
          this.x = c.x;
          this.y = c.y;
        }
      }
    },
    
    getSprites: function(){
      var s = this.components
      .filter(function(c){return c.tag === 'sprite';});

      return s;
    }

  });
  
  return GameObject;
});