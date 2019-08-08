
cc.Class({
    extends: cc.Component,

    properties: {
        touchSound:{
            default:null,
            type:cc.AudioClip
        },

    },
   

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.node.on('touchstart', function (event) {
            cc.audioEngine.playEffect(this.touchSound, false);
            var posicion = cc.v2(this.node.getPosition());
            if (this.game.gainScore(posicion) == true){
                this.node.destroy();
            }
            
          }, this);

    },


    update:function (dt) {
        
    },
});
