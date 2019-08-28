(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Circle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd961RDP8RCtaDBuf7wmPea', 'Circle', __filename);
// Script/Circle.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        spawnSound: {
            default: null,
            type: cc.AudioClip
        }
    },
    onLoad: function onLoad() {
        this.timer = 0.0;
        cc.audioEngine.playEffect(this.spawnSound, false);
    },
    onPicked: function onPicked() {
        this.node.destroy();
        this.game.spawnNewCircle();
    },
    update: function update(dt) {

        this.timer += dt;
        if (this.game.nivel > 2) {

            if (this.game.aux < 4) {

                if (Math.round(this.timer) == 2.0) {
                    this.game.aux++;
                    this.onPicked();
                    return;
                }
            } else {
                if (Math.round(this.timer) == 2.0) {
                    console.log("entre aqui");

                    this.node.destroy();
                    this.game.aux = 0;
                    this.game.spawnCircles();
                }
            }
        } else {

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
        