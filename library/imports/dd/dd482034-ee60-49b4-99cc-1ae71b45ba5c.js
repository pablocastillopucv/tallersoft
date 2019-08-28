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
        cursorPrefab: {
            default: null,
            type: cc.Prefab
        },
        distraccionPrefab: {
            default: null,
            type: cc.Prefab
        },
        touchPointPrefab: {
            default: null,
            type: cc.Prefab
        },
        presioneAquiPrefab: {
            default: null,
            type: cc.Prefab
        },
        flechaApuntaArribaPrefab: {
            default: null,
            type: cc.Prefab
        },
        flechaApuntaAbajoPrefab: {
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
        nivelDisplay: {
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
        levelSound: {
            default: null,
            type: cc.AudioSource
        },
        pausaPrefab: {
            type: cc.Prefab,
            default: null
        },
        nuevoSonidoPrefab: {
            type: cc.Prefab,
            default: null
        },
        positionCircle: cc.v2(0, 0),
        positionNotification: cc.v2(0, 0),
        positionTouchpoint: cc.v2(0, 0),
        positionPelota: cc.v2(0, 0),
        cantVeces: 2,
        aux: 1,
        contador: 0,
        horaNotificacion: 0,
        minutoNotificacion: 10,
        horaInicial: 0,
        minutoInicial: 0,
        velocidadReloj: 1,
        tiempoMax: 20,
        cantVecesPresiona: 0,
        arregloSecuencia: [],
        arregloSecuenciaCorrecta: [],
        arregloSecuenciaUsuario: [],
        secuenciafinal: [],

        nivel: 1,
        controlFlecha: 0

    },

    onLoad: function onLoad() {
        this.esNotificacionComida = false;
        this.esNotificacionHora = false;
        this.contador = 0;
        this.toques = 0;
        this.score = 0;
        this.numId = 0;

        this.spawnNewCircle();
        this.destroyFlecha = false, this.destroyTexto = false, this.hora = this.horaInicial;
        this.minuto = this.minutoInicial;

        this.scheduleOnce(function () {

            this.esNotificacionHora = true;
        }, this.tiempoMax + 1);

        this.schedule(function () {

            this.mostrarHora();
            this.aumentarHora();
            if (this.hora == this.horaNotificacion && this.minuto == this.minutoNotificacion + 1 && this.contador == 0) {

                this.esNotificacionComida = true;
                this.contador++;
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

        this.spawnTouchPointNotificacion();
    },
    mostrarNotificacionTiempo: function mostrarNotificacionTiempo() {

        var notificacionTiempo = cc.instantiate(this.notificacionTiempo);

        this.node.addChild(notificacionTiempo);

        notificacionTiempo.setPosition(this.positionNotification);

        this.spawnTouchPointNotificacion();
    },

    spawnNewCircle: function spawnNewCircle() {

        // generate a new node in the scene with a preset template
        var newCircle = cc.instantiate(this.circlePrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newCircle);
        // set up a random position for the circle
        this.positionCircle = this.getNewCirclePosition();
        this.arregloSecuenciaCorrecta.push(this.positionCircle);
        newCircle.setPosition(this.positionCircle);
        newCircle.getComponent('Circle').game = this;
        this.arregloSecuencia.push(this.positionCircle);
    },

    spawnCircles: function spawnCircles() {

        for (var i = 0; i < this.cantVeces; i++) {

            // generate a new node in the scene with a preset template
            var newCircle = cc.instantiate(this.cursorPrefab);
            // put the newly added node under the Canvas node
            this.node.addChild(newCircle);
            // set up a random position for the circle
            this.positionCircle = this.arregloSecuencia[i];
            //se llena el arreglo con la secuencia final
            this.secuenciafinal[i] = this.arregloSecuencia[i];
            newCircle.setPosition(this.positionCircle);
            newCircle.getComponent('CircleSecuencia').game = this;
        }

        //limitar la cantidad de distracciones
        if (this.nivel >= 3) {
            if (this.nivel >= 4) {
                for (var i = 0; i < 3; i++) {
                    var pelota = cc.instantiate(this.distraccionPrefab);
                    this.node.addChild(pelota);
                    this.positionPelota = this.getNewCirclePosition();
                    pelota.setPosition(this.positionPelota);
                    pelota.getComponent('cursorDistraccion').game = this;
                }
            } else {

                for (var i = 0; i < this.nivel - 2; i++) {
                    var pelota = cc.instantiate(this.distraccionPrefab);
                    this.node.addChild(pelota);
                    this.positionPelota = this.getNewCirclePosition();
                    pelota.setPosition(this.positionPelota);
                    pelota.getComponent('cursorDistraccion').game = this;
                }
            }
        }

        this.arregloSecuencia = [];

        if (this.esNotificacionHora) {

            this.mostrarNotificacionTiempo();
        }
        if (this.esNotificacionComida) {

            this.mostrarNotificacionComida();
        }
    },

    mostrarsecuencia: function mostrarsecuencia() {

        for (var i = 0; i < this.cantVeces; i++) {
            var newCircle = cc.instantiate(this.cursorPrefab);
            // put the newly added node under the Canvas node
            this.node.addChild(newCircle);
            this.positionCircle = this.secuenciafinal[i];
            newCircle.setPosition(this.positionCircle);
            newCircle.getComponent('CircleSecuencia').game = this;
        }
    },

    getNewCirclePosition: function getNewCirclePosition() {
        while (true) {
            var randX = 0;
            var randY = 0;
            var posX = 0;
            var posY = 0;
            var elevadox = 0;
            var elevadoy = 0;
            var suma = 0;
            var formula = 0;
            var maxX = this.node.width / 2;
            var maxY = this.node.height / 2;
            randX = (Math.random() - 0.5) * 2 * maxX;
            randY = (Math.random() - 0.5) * 2 * maxY;

            if (randX < 0) {
                randX += 100;
            }
            if (randX > 0) {
                randX -= 100;
            }
            if (randY < 0) {
                randY += 100;
            }
            if (randY > 0) {
                randY -= 100;
            }
            var estado = true;

            if (this.arregloSecuenciaCorrecta.length == 0) {
                return cc.v2(randX, randY);
            }
            for (var index = 0; index < this.arregloSecuenciaCorrecta.length; index++) {
                posX = this.arregloSecuenciaCorrecta[index].x;
                posY = this.arregloSecuenciaCorrecta[index].y;

                elevadox = Math.pow(posX - randX, 2);
                elevadoy = Math.pow(posY - randY, 2);
                suma = elevadox + elevadoy;
                formula = Math.sqrt(suma);
                if (formula < 200) {
                    estado = false;
                    break;
                }
            }
            if (estado == true) {
                return cc.v2(randX, randY);
            }
        }
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

    eliminarNotificacionComida: function eliminarNotificacionComida() {

        var notificacion = this.node.getChildByName('Notificacion');
        if (notificacion) {
            notificacion.destroy();
        }
    },
    eliminarNotificacionTiempo: function eliminarNotificacionTiempo() {

        var notificacion = this.node.getChildByName('notificacionTiempo');
        if (notificacion) {
            notificacion.destroy();
        }
    },

    gainScore: function gainScore(vector1) {

        if (vector1.equals(this.arregloSecuenciaCorrecta[0]) == true) {
            this.toques += 1;
            this.arregloSecuenciaCorrecta.shift();
            this.score += 1;
            this.scoreDisplay.string = 'Score: ' + this.score;
            if (this.toques < this.cantVeces) {
                return true;
            }
        } else {
            this.score -= 1;
            if (this.score < 1) {
                this.score = 0;
            }

            this.scoreDisplay.string = 'Score: ' + this.score;

            return false;
        }
        if (this.toques == this.cantVeces) {

            var pausaIntermedia = cc.instantiate(this.pausaPrefab);

            this.node.addChild(pausaIntermedia);

            pausaIntermedia.setPosition(this.positionNotification);

            this.scheduleOnce(function () {

                pausaIntermedia.setPosition(999, 999, 999);
            }, 1);

            this.gameOver();
            this.toques = 0;
            return true;
        }
    },

    gameOver: function gameOver() {

        //  subir de nivel
        if (this.score >= Math.pow(this.nivel + 1, 3)) {
            this.nivel++;
            if (this.nivel < 4) {

                this.cantVeces++;
            }
            this.nivelDisplay.string = 'Nivel: ' + this.nivel;
            this.levelSound.play();

            // Mostrar la nueva secuencia

            this.scheduleOnce(function () {

                this.spawnNewCircle();
                this.aux++;
            }, 4);

            // animacion subida de nivel

            var subidaDeNivel = cc.instantiate(this.nuevoSonidoPrefab);

            this.node.addChild(subidaDeNivel);
            subidaDeNivel.setPosition(999, 999, 999);

            this.scheduleOnce(function () {

                subidaDeNivel.setPosition(this.positionNotification);
                this.scheduleOnce(function () {

                    subidaDeNivel.setPosition(999, 999, 999);
                }, 2);
            }, 1.5);

            //  datos a guardar localmente
            var datosUsuario = {
                nivel: this.nivel,
                score: this.score
            };
            cc.sys.localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

            //  leer datos guardados 
            var datosGuardados = JSON.parse(cc.sys.localStorage.getItem('datosUsuario'));
            console.log(datosGuardados);

            return;
        } else {

            // Mostrar la nueva secuencia

            this.scheduleOnce(function () {

                this.spawnNewCircle();
                this.aux++;
            }, 1);
        }
    },

    brindarAyuda: function brindarAyuda() {
        if (!this.esNotificacionComida && !this.esNotificacionHora) {

            if (this.nivel == 1) {
                if (this.controlFlecha == 0) {
                    var posX = 0;
                    var posY = 0;
                    posX = this.arregloSecuenciaCorrecta[0].x;
                    posY = this.arregloSecuenciaCorrecta[0].y;
                    if (posY <= -108) {
                        // flecha apuntando hacia abajo
                        var newArrow = cc.instantiate(this.flechaApuntaAbajoPrefab);
                        this.node.addChild(newArrow);
                        posY += 80;
                        newArrow.setPosition(cc.v2(posX, posY));
                        newArrow.getComponent('Arrow').game = this;
                        this.controlFlecha++;
                        var text = cc.instantiate(this.presioneAquiPrefab);
                        this.node.addChild(text);
                        if (posX >= 360) {
                            text.setPosition(cc.v2(posX - 20, posY + 60));
                            text.getComponent('PresioneAqui').game = this;
                        } else if (posX < -360) {
                            text.setPosition(cc.v2(posX + 20, posY + 60));
                            text.getComponent('PresioneAqui').game = this;
                        } else {
                            text.setPosition(cc.v2(posX, posY + 60));
                            text.getComponent('PresioneAqui').game = this;
                        }
                    } else {
                        // flecha apuntando hacia arriba
                        var newArrow = cc.instantiate(this.flechaApuntaArribaPrefab);
                        this.node.addChild(newArrow);
                        posY = this.arregloSecuenciaCorrecta[0].y - 80;
                        newArrow.setPosition(cc.v2(posX, posY));
                        newArrow.getComponent('Arrow').game = this;
                        this.controlFlecha++;
                        var text = cc.instantiate(this.presioneAquiPrefab);
                        this.node.addChild(text);
                        if (posX >= 360) {
                            text.setPosition(cc.v2(posX - 20, posY - 50));
                            text.getComponent('PresioneAqui').game = this;
                        } else if (posX < -360) {
                            text.setPosition(cc.v2(posX + 20, posY + 60));
                            text.getComponent('PresioneAqui').game = this;
                        } else {
                            text.setPosition(cc.v2(posX, posY - 50));
                            text.getComponent('PresioneAqui').game = this;
                        }
                    }
                }
            }
        } else {}
    },
    verificarCirculoCorrecto: function verificarCirculoCorrecto(vector) {
        if (vector.equals(this.arregloSecuenciaCorrecta[0]) == true) {
            return true;
        }
        return false;
    },
    update: function update(dt) {}

});

cc._RF.pop();