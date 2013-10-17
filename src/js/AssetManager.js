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
  AM.loadAssets = function(cb){
    // start loading the settings
    ab.xhrGet('../assets/game.json', function(data){
      var s = JSON.parse(this.responseText);
      ab.data = s;
      cb();
    });
  };
  return AM;
});