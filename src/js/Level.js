define(['Ajax'], function(Ajax){
  var Level  = function(){};

  Level.load = function(id, done){
    // to do: add loading logic here
    Ajax.load('assets/'+id+'.json', function(data){
      done(JSON.parse(data));
    });
  }

  return Level;
});