
cc.Class({
    extends: cc.Component,

    properties: {
        minTime:0,

        picked:{
            default: 0,
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        
    },
    onPicked: function() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewCircle();
        // then destroy the current star's node
        this.node.destroy();
    },
    update: function(dt){
        console.log(this.game.aux);
        console.log(this.game.cantVeces);
        if(this.game.aux< this.game.cantVeces){
            this.minTime++;
            if(this.minTime == 300){
                this.game.aux++;
                this.onPicked();
                return;
             }
        }
        
        
      
        
    },

    
});
