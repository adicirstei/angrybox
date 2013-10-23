define(['core', 'GameObject', 'Sprite', 'Animation', 'PhysComponent'], function(ab, GameObject, Sprite, Animation, PhysComponent){
  var Factory = {
    classes: {
    "Sprite": Sprite,
    "PhysComponent": PhysComponent,
    "Animation": Animation
    },
    getClass: function(name){
      return this.classes[name];
    },
    registerClass: function(name, fn){
      this.classes[name] = fn;
    },
    
    createGameObject: function(data){
      var o = data, datacomp;
      
      datacomp = data.components;
      o.components = datacomp.map(function(comp){
        return this.createComponent(comp);
      }, this);
      
      var go = new GameObject(o);
    
      return go;
    },
    createComponent: function(comp){
      var F = this.classes[comp.classname];
      return new F(comp.data);
    }
  };
  
  ab.Factory = Factory;
  
  return Factory;
});