define(function(){
  var RAD = Math.PI / 180.0;
  var ab = window.AngryBox = window.AngryBox || {};
  ab.Mathf = {
    lerp: function(from, to, time){
      return from + (time*(to-from));
    }
  };



  ab.Time = {
    frameCount: 0,
    deltaTime: 0,
    time: 0
  };
  
  ab.xhrGet = function (reqUri,callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", reqUri, true);
    xhr.onload = callback;

    xhr.send();
  }
  
  ab.deg2Rad = function(deg){
    return RAD * deg;
  };
  ab.Event = function(){};

  ab.Event.mixin = function(type){
    var targetObj;
    if(typeof type === 'function'){
      // add Event functionality to prototype
      targetObj = type.prototype;
    } else {
      // consider it an object
      targetObj = type;
    }

    targetObj.on = function(event, callback, context){
      var ctx = context || targetObj;
      targetObj.eventHandlers = targetObj.eventHandlers || {};
      targetObj.eventHandlers[event] = targetObj.eventHandlers[event] || [];
      targetObj.eventHandlers[event].push({cb:callback, ctx: ctx});
    };

    targetObj.trigger = function(event){
      var e;
      if(this.eventHandlers && this.eventHandlers[event]){
        for(var i = 0; i<this.eventHandlers[event].length; i++){
          e = this.eventHandlers[event][i];
          e.cb.call(e.ctx);
        }
      }
    };
  }

  var Class = function(){};
  Class.extend = function(c){

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