(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/TouchPoint.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '39a962igBNJXJJSdGTzKmFe', 'TouchPoint', __filename);
// Script/TouchPoint.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        touchSound: {
            default: null,
            type: cc.AudioClip
        },
        numeroEstatico: 0 // numero de la secuencia
    },

    onLoad: function onLoad() {

        this.node.on('touchstart', function (event) {
            cc.audioEngine.playEffect(this.touchSound, false);
            this.node.destroy();
            this.game.gainScore();
        }, this);
    },

    update: function update(dt) {
        if (this.numeroEstatico == 0) {
            this.numeroEstatico = this.game.aux;
            this.game.secuenciaCorrecta(this.numeroEstatico);
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
        //# sourceMappingURL=TouchPoint.js.map
        