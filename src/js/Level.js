define(['preloadjs'], function(preloadjs){
  var Level  = function(){};

  Level.load = function(id, done){
    var queue = new preloadjs.LoadQueue();
    
    queue.addEventListener("fileload", function(event){
      var images = {}, s, img, imgArray = [];
      queue.removeAllEventListeners ();
      for(i = 0; i < event.result.ground.length; i+=1) {
        s = event.result.ground[i];
        if(s.images) {
          for (var j = 0; j < s.images.length; j+=1) {
            if(!images[s.images[j]]) {
              imgArray.push(s.images[j]);
              images[s.images[j]] = true;
            }
          }
        }
      }
      for(i = 0; i < event.result.enemies.length; i+=1) {
        s = event.result.enemies[i];
        if(s.images) {
          for (var j = 0; j < s.images.length; j+=1) {
            if(!images[s.images[j]]) {
              imgArray.push(s.images[j]);
              images[s.images[j]] = true;
            }
          }
        }
      }
      queue.addEventListener("complete", function () {
        console.log(window.AngryBox.game.images);
        done(event.result);
      });
      queue.addEventListener("fileload", function(evt) {
        var item = evt.item; // A reference to the item that was passed in
        var type = item.type;
        var imgCache = window.AngryBox.game.images = window.AngryBox.game.images || {};

         // Add any images to the page body.
        if (type == preloadjs.LoadQueue.IMAGE) {
          imgCache[item.src] = evt.result;
        }
      });
      queue.close();
      queue.loadManifest(imgArray);
    });

    queue.loadFile('assets/'+id+'.json');

  }

  return Level;
});