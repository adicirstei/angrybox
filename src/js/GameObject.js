define(['Component', 'lazyjs'], function(Component, Lazy){
  var GameObject = Component.extend({
    'constructor': function(opt){
      this.components = opt.components || [];
      this.x = opt.x;
      this.y = opt.y;
      this.rot = opt.rot || 0;
    },
    update: function(time){
      var i, l=this.components.length;
      for(i=0; i < l; i++){
        this.components[i].update(time);
      }

    },
    getSprite: function(){
      var s = Lazy(this.components)
      .filter(function(c){return c.tag === 'sprite';})
      .first().getSprite();
      return s;
    },
    components: []

  });
  
  return GameObject;
});