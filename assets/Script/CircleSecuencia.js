
cc.Class({
    extends: cc.Component,

    properties: {
        touchSound:{
            default:null,
            type:cc.AudioClip
        },
        touchFail:{
            default:null,
            type:cc.AudioClip
        },


    },
   

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.node.on('touchstart', function (event) {
            
            var posicion = cc.v2(this.node.getPosition());
            if (this.game.gainScore(posicion) == true){
                cc.audioEngine.playEffect(this.touchSound, false);
                this.node.destroy();
            }
            else{
                cc.audioEngine.playEffect(this.touchFail, false);
            }
          }, this);

    },


    update:function (dt) {
        
    },
});
