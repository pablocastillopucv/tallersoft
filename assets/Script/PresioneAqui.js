cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    
    // onLoad () {},

   

    update: function(dt) {
        if (this.game.destroyTexto == true) {
            this.game.destroyTexto = false;
            this.node.destroy();

        }
        
    },
});
