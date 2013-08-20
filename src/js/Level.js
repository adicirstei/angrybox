define(['preloadjs'], function(preloadjs){
  var Level  = function(){};

  Level.load = function(id, done){
    var queue = new preloadjs.LoadQueue();
    
    queue.addEventListener("fileload", function(event){
      done(event.result);
    });

    queue.loadFile('assets/'+id+'.json');

  }

  return Level;
});