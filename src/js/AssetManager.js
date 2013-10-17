define(['core'], function(ab){
  var AM = {};
  ab.assets = ab.assets || {};
  AM.getImage = function(src, cb){
    if(ab.assets[src]){
      cb(ab.assets[src]);
    } else {
      var img = new Image();
      img.onload = function(){
        ab.assets[src] = this;
        cb(this);
      };
      img.src = src;
    }
  };
  AM.loadAssets = function(progress, done){
    
    function parseAtlas(img, ad){
      for(var f in ad.frames){
        AM.sprites[f] = {
          img: img,
          x: ad.frames[f].frame.x,
          y: ad.frames[f].frame.y,
          w: ad.frames[f].frame.w,
          h: ad.frames[f].frame.h
         };
      }
    };
    AM.sprites = AM.sprites || {};
    // start loading the settings
    ab.xhrGet('../assets/game.json', function(data){
      var s = JSON.parse(this.responseText);
      var i, total = s.atlases.length + s.sounds.length, p = 0.0;
      ab.data = s;
      for (var a in s.atlases){
        AM.getImage(a, function(img){
          parseAtlas(img, s.atlases[a]);
          progress(p);
        });
        
      }
      for (i = 0; i<s.sounds.length; i++){
        progress(p);
      }
      done();
    });
  };
  return AM;
});