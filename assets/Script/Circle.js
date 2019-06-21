
cc.Class({
    extends: cc.Component,

    properties: {
        picked:{
            default: 0,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.node.on('touchstart', function (event) {
            this.picked= true;
          }, this);
          this.node.on('touchend', function (event) {
            this.picked= false;
          }, this);  
    },

    onPicked: function() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewCircle();
        // then destroy the current star's node
        this.node.destroy();
    },
    update: function(dt){
        if (this.picked == true) {
            this.onPicked();
            return;
        }
    },

    
});
