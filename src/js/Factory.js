define(['core', 'GameObject', 'Sprite', 'Animation', 'PhysComponent', 'KillerScript'], function(ab, GameObject, Sprite, Animation, PhysComponent, KillerScript){
  var Factory = {
    classes: {
    "Sprite": Sprite,
    "PhysComponent": PhysComponent,
    "Animation": Animation,
    "KillerScript": KillerScript
    },
    getClass: function(name){
      return this.classes[name];
    },
    registerClass: function(name, fn){
      this.classes[name] = fn;
    },
    
    createGameObject: function(data){
      var o = data, datacomp;
      var go = new GameObject(o);
      datacomp = data.components;
      go.components = datacomp.map(function(comp){
        comp.data.parent = go;
        return this.createComponent(comp);
      }, this);

      return go;
    },
    createComponent: function(comp, parent){
      var C = this.classes[comp.classname];
      return new C(comp.data);
    }
  };
  
  ab.Factory = Factory;
  
  return Factory;
});