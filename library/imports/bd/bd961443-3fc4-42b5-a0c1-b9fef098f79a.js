"use strict";
cc._RF.push(module, 'bd961RDP8RCtaDBuf7wmPea', 'Circle');
// Script/Circle.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},
    onLoad: function onLoad() {
        this.timer = 0.0;
    },
    onPicked: function onPicked() {
        this.node.destroy();
        this.game.spawnNewCircle();
        // then destroy the current star's node

    },
    update: function update(dt) {

        this.timer += dt;
        if (this.game.aux < this.game.cantVeces) {

            if (Math.round(this.timer) == 3.0) {
                this.game.aux++;
                this.onPicked();
                return;
            }
        } else {
            if (Math.round(this.timer) == 3.0) {

                this.node.destroy();
                this.game.aux = 0;
                this.game.spawnCircles();
            }
        }
    }

});

cc._RF.pop();