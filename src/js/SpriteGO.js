define(['Sprite', 'GameObject'], function(Sprite, GameObject){
  var SpriteGO = function(opts){
    var go = new GameObject({
      x: opts.x,
      y: opts.y,
      rot: opts.rot,

// TODO: add functionality for multiple sprites per GO

      components:[new Sprite({frame: options.frame})]
    });
    return go
  }

  return SpriteGO;
});