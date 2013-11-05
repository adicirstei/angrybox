define(['core', 'ScriptComponent'], function(ab, ScriptComponent) {
  var once = false;
  var SuicideScript = ScriptComponent.extend({
    'constructor': function(opts){
      this.parent = opts.parent;
    },
    update: function(time){
      if (!this.active){
        return;
      }

      var body = this.parent.physics.body;
      if(!body.IsAwake()) {
        var ago = ab.Factory.createGameObject({x: this.parent.x, y: this.parent.y, components:[{classname:"Animation", data: this.animation}]});
        ago.name = "animation spawned by suicide script";
        ago.update = function(time) {
          var anim = this.components[0];
          if (!anim.playing){
            ab.scene.kill(this);
          } else {
            anim.update(time);
          }
          
        }
        ab.scene.kill(this.parent);
        ab.scene.addGameObject(ago, this.parent.layer+1);
      }
    }
  });

  ab.Factory.registerClass("SuicideScript", SuicideScript);
  return SuicideScript;

});