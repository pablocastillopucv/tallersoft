
cc.Class({
    extends: cc.Component,

    properties: {
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
            console.log(this.timer);
        if ( Math.round(this.timer) == 5.0 ) {
            console.log('I am done!');
            this.timer += 1.0
        }
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
