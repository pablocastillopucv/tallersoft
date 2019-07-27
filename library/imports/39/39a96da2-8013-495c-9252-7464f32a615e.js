"use strict";
cc._RF.push(module, '39a962igBNJXJJSdGTzKmFe', 'TouchPoint');
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