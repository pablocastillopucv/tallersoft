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
        this.game.spawnNewCircle();
        // then destroy the current star's node
        this.node.destroy();
    },
    update: function update(dt) {

        this.timer += dt;
        console.log(this.timer);
        if (this.game.aux < this.game.cantVeces) {

            if (Math.round(this.timer) == 2.0) {
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