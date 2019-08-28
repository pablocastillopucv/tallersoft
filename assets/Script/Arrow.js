
cc.Class({
    extends: cc.Component,

    properties: {
    },

    

    onLoad: function() {
    },

    

    update: function(dt) {
        if (this.game.destroyFlecha == true) {
            this.game.destroyFlecha = false;
            this.game.controlFlecha = 0;
            this.node.destroy();

        }
        
    },
});
