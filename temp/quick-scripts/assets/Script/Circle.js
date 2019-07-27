(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Circle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd961RDP8RCtaDBuf7wmPea', 'Circle', __filename);
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
        