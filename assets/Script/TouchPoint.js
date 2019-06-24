cc.Class({
    extends: cc.Component,

    properties: {
        numeroEstatico:0, // numero de la secuencia
    },

    onLoad: function() {
        
        this.node.on('touchstart', function (event) {
            console.log(this.numeroEstatico);
            this.node.destroy();
          }, this);
    },

    update:function (dt) {
        if(this.numeroEstatico == 0){
            this.numeroEstatico = this.game.aux;
        }
        
    },
});
