define(['Scene'], function(Scene){
  var Game = function(){
    this.score = 0;
    this.level = 'I.1';
  };

  Game.prototype.start = function() {
    var w = new Scene(document.getElementById('canvas'));
    // w.on('kill', this.kill, this);
    // w.on('damage', this.damage, this);
    // w.on('died', this.died, this);
//    this.world = w.world;
    w.loadLevel(this.level);
  };

  Game.prototype.kill = function() {
    this.score += 100;
    console.log(this.score);
  };
  Game.prototype.damage = function() {
    this.score += 100;
    console.log(this.score);
  };
  Game.prototype.died = function() {
    this.score += 100;
    console.log(this.score);
  };
  return new Game();


});