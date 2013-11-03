define(['core', 'ScriptComponent', 'Factory'], function(ab, ScriptComponent) {
  var PuffSpawner = ScriptComponent.extend({
    update: function(time){
      if(!this.active){
        return;
      }
      var puff = ab.Factory.createGameObject({
        "x": this.parent.x,
        "y": this.parent.y,
        "name":"puff-1",
        "components": [
          {
            "classname": "KillerScript",
            "data": {
              "ttl":10000
            }
          },
          {
            "classname": "Sprite",
            "data": {
              "frame":"puff-1.png"
            }
          }
        ]
      });
      ab.scene.addGameObject(puff, this.parent.layer);

    }
  });

  ab.Factory.registerClass("PuffSpawner", PuffSpawner);
  return PuffSpawner;

});