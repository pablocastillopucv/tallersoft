
cc.Class({
    extends: cc.Component,

    properties: {
        minTime:0,
    },
    onLoad: function() {
        
    },
    onPicked: function() {
        this.game.spawnNewCircle();
        // then destroy the current star's node
        this.node.destroy();
        this.game.spawnTouchPoint();
      
    },
    update: function(dt){
        if(this.game.aux< this.game.cantVeces){
            this.minTime++;
            if(this.minTime == 100){
                this.game.spawnTouchPoint();
                this.game.aux++;
                this.onPicked();
                return;
             }
        }
        else{
            this.node.destroy();
            
        }
    },

    
});
