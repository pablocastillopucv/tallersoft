
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
        // then destroy the current star's node
  
        
      
    },
    update: function(dt){
        
        this.timer +=dt;
        if(this.game.aux< this.game.cantVeces){

            if ( Math.round(this.timer) == 3.0 ) {
                this.game.aux++;
                this.onPicked();
                return;
            }
        }
        else{
            if ( Math.round(this.timer) == 3.0 ) {
                
                this.node.destroy();
                this.game.aux=0;
                this.game.spawnCircles();

            }
            
            
        }
    },

    
});
