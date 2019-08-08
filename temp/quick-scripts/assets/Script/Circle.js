(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Circle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd961RDP8RCtaDBuf7wmPea', 'Circle', __filename);
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
        if (this.game.aux < this.game.cantVeces) {

            if (Math.round(this.timer) == 2.0) {
                this.game.aux++;
                this.onPicked();
                return;
            }
        } else {
            if (Math.round(this.timer) == 2.0) {
                this.node.destroy();

                this.game.aux = 0;
                this.game.spawnCircles();
            }
        }
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Circle.js.map
        