"use strict";
cc._RF.push(module, 'dd482A07mBJtJnMGucbRbpc', 'Game');
// Script/Game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        circlePrefab: {
            default: null,
            type: cc.Prefab
        },
        touchPointPrefab: {
            default: null,
            type: cc.Prefab
        },
        touchPointNotificacionPrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        horaDisplay: {
            default: null,
            type: cc.Label
        },
        notificacionComida: {
            default: null,
            type: cc.Prefab
        },
        notificacionTiempo: {
            default: null,
            type: cc.Prefab
        },
        positionCircle: cc.v2(0, 0),
        positionNotification: cc.v2(0, 0),
        positionTouchpoint: cc.v2(0, 100),
        cantVeces: 4,
        aux: 1,
        horaNotificacion: 0,
        minutoNotificacion: 0,
        horaInicial: 0,
        minutoInicial: 0,
        velocidadReloj: 1,
        tiempoMax: 30,
        cantVecesPresiona: 0,
        arregloSecuencia: []

    },

    onLoad: function onLoad() {
        this.contador = 0;
        this.score = 0;
        this.timer = 0.0;
        this.spawnNewCircle();
        this.hora = this.horaInicial;
        this.minuto = this.minutoInicial;

        this.schedule(function () {
            this.mostrarHora();
            this.aumentarHora();
            if (this.hora >= 13 && this.minuto >= 1) {

                this.mostrarNotificacionComida();
                this.spawnTouchPointNotificacion();
            }
            if (this.contador < 1) {

                this.schedule(function () {

                    this.mostrarNotificacionTiempo();
                    this.spawnTouchPointNotificacion();
                    this.contador++;
                }, this.tiempoMax);
            }
        }, this.velocidadReloj);
    },

    aumentarHora: function aumentarHora() {

        this.minuto++;
        if (this.minuto == 60) {

            this.minuto = 0;
            this.hora++;
        }
        if (this.hora > 23) {

            this.hora = 0;
        }
    },

    mostrarHora: function mostrarHora() {

        if (this.hora < 10 && this.minuto < 10) {

            this.horaDisplay.string = '0' + this.hora + ':0' + this.minuto;
        } else if (this.hora < 10 && this.minuto >= 10) {

            this.horaDisplay.string = '0' + this.hora + ':' + this.minuto;
        } else if (this.hora >= 10 && this.minuto < 10) {

            this.horaDisplay.string = this.hora + ':0' + this.minuto;
        } else if (this.hora >= 10 && this.minuto >= 10) {

            this.horaDisplay.string = this.hora + ':' + this.minuto;
        }
    },

    mostrarNotificacionComida: function mostrarNotificacionComida() {

        var notificacionComida = cc.instantiate(this.notificacionComida);

        this.node.addChild(notificacionComida);

        notificacionComida.setPosition(this.positionNotification);
    },
    mostrarNotificacionTiempo: function mostrarNotificacionTiempo() {

        var notificacionTiempo = cc.instantiate(this.notificacionTiempo);

        this.node.addChild(notificacionTiempo);

        notificacionTiempo.setPosition(this.positionNotification);
    },

    spawnNewCircle: function spawnNewCircle() {

        // generate a new node in the scene with a preset template
        var newCircle = cc.instantiate(this.circlePrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newCircle);
        // set up a random position for the circle
        this.positionCircle = this.getNewCirclePosition();
        newCircle.setPosition(this.positionCircle);
        newCircle.getComponent('Circle').game = this;
    },

    getNewCirclePosition: function getNewCirclePosition() {
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 0;
        // according to the width of the screen, randomly obtain an anchor point of star on the x axis
        var maxX = this.node.width / 2;
        var maxY = this.node.height / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        randY = (Math.random() - 0.5) * 2 * maxY;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },
    spawnTouchPoint: function spawnTouchPoint() {
        var newTouchPoint = cc.instantiate(this.touchPointPrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newTouchPoint);
        // set up a random position for the circle
        newTouchPoint.setPosition(this.positionCircle);
        newTouchPoint.getComponent('TouchPoint').game = this;
    },
    spawnTouchPointNotificacion: function spawnTouchPointNotificacion() {
        var newTouchPointNotificacion = cc.instantiate(this.touchPointNotificacionPrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newTouchPointNotificacion);
        // set up a random position for the circle
        newTouchPointNotificacion.setPosition(this.positionTouchpoint);
        newTouchPointNotificacion.getComponent('TouchPointNotificacion').game = this;
    },
    gainScore: function gainScore() {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score;
        if (this.score == 4) {
            this.gameOver();
        }
    },
    secuenciaCorrecta: function secuenciaCorrecta(parametro1) {
        this.arregloSecuencia.push(parametro1);
    },
    gameOver: function gameOver() {
        cc.director.loadScene('movimiento');
    },
    update: function update(dt) {
        this.timer += dt;
    }

});

cc._RF.pop();