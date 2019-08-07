cc.Class({
    extends: cc.Component,

    properties: {
        touchSound:{
            default:null,
            type:cc.AudioClip
        },
    },

    onLoad: function() {
        
        this.node.on('touchstart', function (event) {
            cc.audioEngine.playEffect(this.touchSound, false);
            this.node.destroy();
          }, this);
    },

    //update:function (dt) {},
});
