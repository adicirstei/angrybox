define([], function(){
  var Level  = function(){

  };

  Level.load = function(id){
    // to do: add loading logic here
    return {
      ground:[
        {}
      ],
      actors:[],
      obstacles: [],
      enemies:[]
    };
  }

});