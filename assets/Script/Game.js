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
        touchPointPrefab:{
            default: null,
            type: cc.Prefab
        },
        touchPointNotificacionPrefab:{
            default: null,
            type:cc.Prefab
        },
        scoreDisplay:{
            default:null,
            type:cc.Label
        },
        horaDisplay:{
            default:null,
            type:cc.Label
        },
        notificacionComida:{
            default:null,
            type:cc.Prefab
        },
        notificacionTiempo:{
            default:null,
            type:cc.Prefab
        },
        positionCircle:cc.v2(0,0),
        positionNotification:cc.v2(0,0),
        positionTouchpoint:cc.v2(0,0),
        cantVeces:4,
        aux:0,
        contador:0,
        horaNotificacion:0,
        minutoNotificacion:0,
        horaInicial:0,
        minutoInicial:0,
        velocidadReloj:1,
        tiempoMax:30,
        cantVecesPresiona:0,
        arregloSecuencia:[],
        arregloSecuenciaCorrecta:[],
        arregloSecuenciaUsuario:[],
        

    },

    onLoad: function () {
        this.contador = 0;
        this.toques = 0;
        this.score = 0;
        this.numId = 0;
        this.spawnNewCircle();

        

        this.hora = this.horaInicial;
        this.minuto = this.minutoInicial;

        this.scheduleOnce(function() {
            
            this.mostrarNotificacionTiempo();
            this.spawnTouchPointNotificacion();
            
        },this.tiempoMax+1);

        

        this.schedule(function() {

            this.mostrarHora();
            this.aumentarHora();
            if (this.hora==this.horaNotificacion && this.minuto==this.minutoNotificacion+1 && this.contador==0){

                this.mostrarNotificacionComida();
                this.spawnTouchPointNotificacion();
                this.contador++;
            }
            
        }, this.velocidadReloj);

        
      
    },

    aumentarHora: function() {
        
        this.minuto++;
        if(this.minuto == 60){

            this.minuto = 0;
            this.hora++;

        }
        if(this.hora>23){

            this.hora = 0;

        }
    },

    mostrarHora: function() {

        if(this.hora<10 && this.minuto<10){

            this.horaDisplay.string = '0' + this.hora + ':0' + this.minuto;                

        }else if(this.hora<10 && this.minuto>=10){

            this.horaDisplay.string = '0' + this.hora + ':' + this.minuto;                

        }else if(this.hora>=10 && this.minuto<10){

            this.horaDisplay.string = this.hora + ':0' + this.minuto;                

        }else if(this.hora>=10 && this.minuto>=10){

            this.horaDisplay.string = this.hora + ':' + this.minuto;                

        }

    },

    mostrarNotificacionComida: function() {

          
        var notificacionComida = cc.instantiate(this.notificacionComida);
        
        this.node.addChild(notificacionComida);
        
        notificacionComida.setPosition(this.positionNotification);
    },
    mostrarNotificacionTiempo: function() {

        
        var notificacionTiempo = cc.instantiate(this.notificacionTiempo);
        
        this.node.addChild(notificacionTiempo);
        
        notificacionTiempo.setPosition(this.positionNotification);
  },

    spawnNewCircle: function() {

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
    spawnCircles: function() {

        for(var i = 0; i<this.cantVeces;i++){
            // generate a new node in the scene with a preset template
            var newCircle = cc.instantiate(this.cursorPrefab);
            // put the newly added node under the Canvas node
            this.node.addChild(newCircle);
            // set up a random position for the circle
            this.positionCircle = this.arregloSecuencia[i];
            newCircle.setPosition(this.positionCircle);
            newCircle.getComponent('CircleSecuencia').game = this;

        }
        this.arregloSecuencia=[];
    },


    getNewCirclePosition: function () {
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 0;
        // according to the width of the screen, randomly obtain an anchor point of star on the x axis
        var maxX = this.node.width/2;
        var maxY = this.node.height/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        randY = (Math.random() - 0.5) * 2 * maxY;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },
    spawnTouchPoint:function(){
        var newTouchPoint = cc.instantiate(this.touchPointPrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newTouchPoint);
        // set up a random position for the circle
        newTouchPoint.setPosition(this.positionCircle);
        newTouchPoint.getComponent('TouchPoint').game = this;
    },
    spawnTouchPointNotificacion:function(){
        var newTouchPointNotificacion = cc.instantiate(this.touchPointNotificacionPrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newTouchPointNotificacion);
        // set up a random position for the circle
        newTouchPointNotificacion.setPosition(this.positionTouchpoint);
        newTouchPointNotificacion.getComponent('TouchPointNotificacion').game = this;
        
    },


    eliminarNotificacionComida:function(){
        
        var notificacion = this.node.getChildByName('Notificacion');
        if (notificacion){
            notificacion.destroy();
        }
        
    },
    eliminarNotificacionTiempo:function(){

        var notificacion = this.node.getChildByName('notificacionTiempo');
        if (notificacion){
            notificacion.destroy();
        }
    },

    gainScore: function (vector1) {
            
        
        if(vector1.equals(this.arregloSecuenciaCorrecta[0]) == true){
                this.toques+=1;
                this.arregloSecuenciaCorrecta.shift();
                this.score += 1;
                this.scoreDisplay.string = 'Score: ' + this.score;
                console.log(this.toques);
                if(this.toques < this.cantVeces){
                    return true;
                }
                
        }
        if(this.toques == this.cantVeces){
            this.gameOver();
            this.toques=0;
            return true;
        }    
        
        
       
    },
   
    gameOver: function(){
        this.spawnNewCircle();
        this.aux++;
    },
    update: function(dt) {
       
    },

});
