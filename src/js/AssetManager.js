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
    // start loading the settings
    ab.xhrGet('../assets/game.json', function(data){
      var s = JSON.parse(this.responseText);
      var i, total = s.atlases.length + s.sounds.length, p = 0.0;
      ab.data = s;
      for (i = 0; i<s.atlases.length; i++){
        progress(p);
      }
      for (i = 0; i<s.sounds.length; i++){
        progress(p);
      }
      done();
    });
  };
  return AM;
});