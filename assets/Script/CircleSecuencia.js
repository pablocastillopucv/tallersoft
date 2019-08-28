
cc.Class({
    extends: cc.Component,

    properties: {
        touchNivel1:{
            default:null,
            type:cc.AudioClip
        },
        touchFail:{
            default:null,
            type:cc.AudioClip
        },
        touchNivel2:{
            default:null,
            type:cc.AudioClip
        },
        touchNivel3:{
            default:null,
            type:cc.AudioClip
        },
        touchNivel4:{
            default:null,
            type:cc.AudioClip
        },
        touchNivel5:{
            default:null,
            type:cc.AudioClip
        },
        touchNivel6:{
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
                //cc.audioEngine.playEffect(this.touchSound, false);
                var numerito = Math.floor((Math.random() * this.game.nivel) + 1);
                if (numerito <= 1){
                    cc.audioEngine.playEffect(this.touchNivel1,false);
                }
                else if(numerito == 2){
                    cc.audioEngine.playEffect(this.touchNivel2,false);
                }
                else if(numerito == 3){
                    cc.audioEngine.playEffect(this.touchNivel3,false);
                }
                else if(numerito == 4){
                    cc.audioEngine.playEffect(this.touchNivel4,false);
                }
                else if(numerito == 5){
                    cc.audioEngine.playEffect(this.touchNivel5,false);
                }
                else{
                    cc.audioEngine.playEffect(this.touchNivel6,false);
                }
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
