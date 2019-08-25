
cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad: function() {
        this.timer = 0.0;
        
    },
    onPicked: function() {
        this.node.destroy();
        this.game.spawnNewCircle();

    },
    update: function(dt){
        
        this.timer +=dt;
        if(this.game.aux< this.game.cantVeces){

            if ( Math.round(this.timer) == 1.0 ) {
                this.game.aux++;
                this.onPicked();
                return;
            }
        }
        else{
            if ( Math.round(this.timer) == 1.0 ) {
                
                this.node.destroy();
                this.game.aux=0;
                this.game.spawnCircles();

            }
            
            
        }
    },

    
});
