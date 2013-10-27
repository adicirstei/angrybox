define(['core', 'GameObject'], 
  function(ab, GameObject){
  var Factory = {
    classes: {
      /*
    "Sprite": Sprite,
    "PhysComponent": PhysComponent,
    "Animation": Animation,
    "KillerScript": KillerScript,
    "SuicideScript": SuicideScript
    */
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
    createComponent: function(comp){
      var C = this.classes[comp.classname];
      var c = new C(comp.data);
      c.parent = c.parent || comp.data.parent;
      return c;
    }
  };
  
  ab.Factory = Factory;
  
  return Factory;
});