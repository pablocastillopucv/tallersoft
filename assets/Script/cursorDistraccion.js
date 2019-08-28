
cc.Class({
    extends: cc.Component,

    properties: {
        
        touchFail:{
            default:null,
            type:cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.node.on('touchstart', function (event) {
            
            var posicion = cc.v2(this.node.getPosition());
            if (this.game.gainScore(posicion) == false){
                cc.audioEngine.playEffect(this.touchFail, false);
                this.node.destroy();
            }
            
          }, this);

    },
    

    update:function(dt) {
        if (this.game.arregloSecuenciaCorrecta.length==0) {
            this.node.destroy();
            
        }

    },
});
