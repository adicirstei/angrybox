define(['core'], function(ab){
  var Factory = {
    classes: {},
    getClass: function(name){
      return this.classes[name];
    },
    registerClass: function(name, fn){
      this.classes[name] = fn;
    }
  };
  
  ab.Factory = Factory;
  
  return Factory;
});