
cc.Class({
    extends: cc.Component,

    properties: {
        touchSound:{
            default:null,
            type:cc.AudioClip
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.on('touchstart', function (event) {
            cc.audioEngine.playEffect(this.touchSound, false);
            this.node.destroy();
            this.game.toques++;
            this.game.gainScore();
          }, this);

    },

    //start () {},

    // update (dt) {},
});
