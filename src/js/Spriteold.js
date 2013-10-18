define(['core','box2d'], function(ab, box2d){
  var Sprite = ab.Class.extend({
    'costructor': function(options){

      }
  });

  easeljs.EventDispatcher.initialize(Sprite.prototype);

// properties I might override in subclasses


  //the damageFactor is the coeficiet by which the impact is multiplied in order to compute the health loss;
  Sprite.prototype.damageFactor = function() { return 0;};

  Sprite.prototype.setBitmap = function(bmp, body) {
    var ob = this.view, nb = bmp;
    body.gameSprite = this;
    nb.body = body;

    nb.set({scaleX: box2d.SCALE * this.width / nb.regX, scaleY: box2d.SCALE * this.height / nb.regY});
    this.view = nb;
    nb.onTick = function(e){
      var p = this.body.GetPosition();
      this.x = p.x * box2d.SCALE;
      this.y = p.y * box2d.SCALE;
      this.rotation = this.body.GetAngle() * 180 / Math.PI;
    };
  };

  
  return Sprite;
});