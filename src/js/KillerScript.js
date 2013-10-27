define(['core', 'ScriptComponent'], function(ab, ScriptComponent) {
  var once = false;
  var KillerScript = ScriptComponent.extend({
    'constructor': function(opts){

      // time to live in milliseconds
      
      this.ttl = opts.ttl;
    },
    update: function(time){

      if(this.ttl > 0) {
        this.ttl -= ab.Time.deltaTime;
      } else {
          ab.scene.kill(this.parent);
      }
    }
  });

  ab.Factory.registerClass("KillerScript", KillerScript);
  return KillerScript;

});