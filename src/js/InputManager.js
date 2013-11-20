define(['core'], function (ab){
  var im = {
    drag: false,
    pointer: {x: 0, y: 0},
    drop: {x: 0, y:0},
    init: function(){
      
      ab.gameCanvas.addEventListener('mousedown', function(e){
        var r = ab.gameCanvas.getBoundingClientRect();
        im.pointer.x = (e.x || e.clientX) - r.left;
        im.pointer.y = (e.y || e.clientY) - r.top;
        im.drag = true;
      });
      ab.gameCanvas.addEventListener('mouseup', function(e){
        var r = ab.gameCanvas.getBoundingClientRect();
        im.pointer.x = im.drop.x = (e.x || e.clientX) - r.left;
        im.pointer.y = im.drop.y = (e.y || e.clientY) - r.top;
        im.drag = false;

      });
      ab.gameCanvas.addEventListener('mousemove', function(e){
        var r = ab.gameCanvas.getBoundingClientRect();
        im.pointer.x = (e.x || e.clientX) - r.left;
        im.pointer.y = (e.y || e.clientY) - r.top;
      });   
    }
  };

  ab.inputManager = im;
  return im;
});