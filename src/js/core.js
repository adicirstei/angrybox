define(function(){
  var ab = window.AngryBox = window.AngryBox || {};
  ab.xhrGet = function (reqUri,callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", reqUri, true);
    xhr.onload = callback;

    xhr.send();
  }

  var Class = function(){};
  Class.extend = function(c){
    // for the moment let's just pretend to extend
    // look at Backbone extend form more insight

    var parent = this,
      child;

    if (c && c.hasOwnProperty('constructor')) {
      child = c.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    child.extend = parent.extend;

    var Surrogate = function() { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    if(c) {
      for(k in c){
        if(c.hasOwnProperty(k)){
          child.prototype[k] = c[k];
        }
      }
    }
    child.__super__ = parent.prototype;

    return child;
  };
  ab.Class = Class;
  return ab;
});