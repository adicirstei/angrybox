define(['Component', 'lazyjs'], function(Component, Lazy){
  var GameObject = Component.extend({
    'constructor': function(opt){
      this.components = opt.components || [];
      this.x = opt.x;
      this.y = opt.y;
      this.rot = opt.rot || 0;
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
      var s = Lazy(this.components)
      .filter(function(c){return c.tag === 'sprite';})
      .first().getSprite();
      return s;
    }

  });
  
  return GameObject;
});