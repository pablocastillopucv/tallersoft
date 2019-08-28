
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
        spawnSound:{
            default:null,
            type:cc.AudioClip
        },


    },
   

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        cc.audioEngine.playEffect(this.spawnSound, false);
        this.timer = 0.0;
        this.node.on('touchstart', function (event) {
            
            var posicion = cc.v2(this.node.getPosition());
            if (this.game.gainScore(posicion) == true){
                this.game.destroyFlecha = true;
                this.game.destroyTexto = true;
                cc.audioEngine.playEffect(this.touchSound, false);
                this.timer=0.0;
                this.node.destroy();
            }
            else{
                cc.audioEngine.playEffect(this.touchFail, false);
            }
          }, this);

    },


    update:function (dt) {
        var posicion = cc.v2(this.node.getPosition());
        if(this.game.verificarCirculoCorrecto(posicion)==true){
            this.timer +=dt;
            if ( Math.round(this.timer) == 2.0 ) {
                this.game.brindarAyuda();
                
            }
        }
        
        
    },
});
