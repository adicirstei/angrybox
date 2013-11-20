define(['core', 'GameObject'], function(ab, GameObject){
  var TextObject = GameObject.extend({
    'constructor': function(opts){
      this.font = opts.font || "8pt Arial";
      this.fillStyle = opts.fillStyle || "black";
      this.strokeStyle = opts.strokeStyle;
      this.text = opts.text || "???";
      
    },

    tag: 'text',

    draw: function(ctx){
      ctx.font = this.font;
      ctx.fillStyle = this.fillStyle;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle"

      
      ctx.fillText(this.text,0, 0);
      if (this.strokeStyle) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeText(this.text,0, 0);
      }
      
    }
  });
  ab.Factory.registerClass("TextObject", TextObject);
  return TextObject;
});