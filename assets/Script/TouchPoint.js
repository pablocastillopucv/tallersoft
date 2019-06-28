cc.Class({
    extends: cc.Component,

    properties: {
        touchSound:{
            default:null,
            type:cc.AudioClip
        },
        numeroEstatico:0, // numero de la secuencia
    },

    onLoad: function() {
        
        this.node.on('touchstart', function (event) {
            cc.audioEngine.playEffect(this.touchSound, false);
            this.node.destroy();
            this.game.gainScore();
           
          }, this);
    },

    update:function (dt) {
        if(this.numeroEstatico == 0){
            this.numeroEstatico = this.game.aux;
            this.game.secuenciaCorrecta(this.numeroEstatico);
        }
        
    },
});
