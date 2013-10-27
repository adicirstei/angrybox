define(['core', 'ScriptComponent'], function(ab, ScriptComponent) {
  var once = false;
  var SuicideScript = ScriptComponent.extend({
    'constructor': function(opts){
      this.parent = opts.parent;
    },
    update: function(time){
      var body = this.parent.physics.body;
      // if(body.GetAngularVelocity() < 1 ) {
      //     ab.scene.kill(this.parent);
      // }
    }
  });

  ab.Factory.registerClass("SuicideScript", SuicideScript);
  return SuicideScript;

});