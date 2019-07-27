"use strict";
cc._RF.push(module, 'bd961RDP8RCtaDBuf7wmPea', 'Circle');
// Script/Circle.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        minTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    onPicked: function onPicked() {
        // When the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewCircle();
        // then destroy the current star's node
        this.node.destroy();
        this.game.spawnTouchPoint();
    },
    update: function update(dt) {
        if (this.game.aux < this.game.cantVeces) {
            this.minTime++;
            if (this.minTime == 100) {
                this.game.aux++;
                this.onPicked();
                return;
            }
        } else {
            this.node.destroy();
        }
    }

});

cc._RF.pop();