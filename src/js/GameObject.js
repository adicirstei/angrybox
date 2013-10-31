define(['Component'], function(Component){
  var GameObject = Component.extend({
    'constructor': function(opt){
      this.components = opt.components || [];
      this.x = opt.x || -1000;
      this.y = opt.y || -1000;
      this.rot = opt.rot || 0;
      
      this.name = opt.name || "noname object";
      
      this.health = 100;
      this.damageFactor = 0;
    },
    update: function(time){
      var c;
      var i, l=this.components.length;
      for(i=0; i < l; i++){
        c = this.components[i];
        c.update(time);
        /*
        if(c.tag === 'body'){
          this.rot = c.rot;
          this.x = c.x;
          this.y = c.y;
        }
        
        */
      }
    },
    collide: function(impact){
      this.health -= impact * this.damageFactor;
      if(this.health <=0){
        this.onDestroyed();
      } else {
        this.onCollision();
      }
    },
    onDestroyed: function(){},
    onCollision: function(){},
    getSprites: function(){
      var s = this.components
      .filter(function(c){return c.tag === 'sprite';});

      return s;
    }

  });
  
  return GameObject;
});