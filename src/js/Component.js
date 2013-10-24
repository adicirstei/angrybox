define(['core'], function(ab){
  var Component = ab.Class.extend({
    tag: '',
    update: function(time){},
    getSprite: function(){
      return null;
    },
    destroy: function(){
      var c = this.components || [], i;
      for (i=c.length; --i;){
        c[i].destroy();
      }
    }
  });
  return Component;
});