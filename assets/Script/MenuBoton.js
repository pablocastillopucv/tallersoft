
cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    onLoad: function() {
        this.node.on('touchstart', function (event) {
            cc.director.loadScene('movimiento');
           
          }, this);
    },

   

    // update (dt) {},
});
