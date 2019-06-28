
cc.Class({
    extends: cc.Component,

    properties: {
        minTime:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        
    },
    onPicked: function() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewCircle();
        // then destroy the current star's node
        this.node.destroy();
        this.game.spawnTouchPoint();
    },
    update: function(dt){
        if(this.game.aux< this.game.cantVeces){
            this.minTime++;
            if(this.minTime == 100){
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
