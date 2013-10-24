define(['core', 'ScriptComponent'], function(ab, ScriptComponent) {
  var once = false;
  var KillerScript = ScriptComponent.extend({
    'constructor': function(opts){
      // time to live in milliseconds
      this.ttl = opts.ttl;
    },
    update: function(time){

      if(this.ttl > 0) {
        console.log(this.ttl,ab.Time.deltaTime);
        this.ttl -= ab.Time.deltaTime;
        
      } else {
        if(!once){
          ab.scene.kill(this.parent);
          console.log('dead');
          once = true;
        }
      }
    }
  });
  return KillerScript;

});