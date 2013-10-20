define(['core'], function(ab){
  var Component = ab.Class.extend({
    tag: '',
    update: function(time){},
    getSprite: function(){
      return null;
    }
  });
  return Component;
});