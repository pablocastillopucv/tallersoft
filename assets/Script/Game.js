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
        nivelDisplay:{
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
        levelSound:{
            default:null,
            type:cc.AudioClip
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
        secuenciafinal:[],
        nivel:1,
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
            //se llena el arreglo con la secuencia final
            this.secuenciafinal[i]=this.arregloSecuencia[i];
            newCircle.setPosition(this.positionCircle);
            newCircle.getComponent('CircleSecuencia').game = this;

        }
        this.arregloSecuencia=[];
    },

    mostrarsecuencia: function(){

        for (var i=0;i<this.cantVeces;i++){
            var newCircle = cc.instantiate(this.cursorPrefab);
            // put the newly added node under the Canvas node
            this.node.addChild(newCircle);
            this.positionCircle = this.secuenciafinal[i];
            newCircle.setPosition(this.positionCircle);
            newCircle.getComponent('CircleSecuencia').game = this;
        }

    },

    getNewCirclePosition: function () {
        while(true){
            var randX = 0;
            var randY=0;
            var posX =0;
            var posY=0;
            var elevadox=0;
            var elevadoy= 0;
            var suma=0;
            var formula=0;
            var maxX = this.node.width/2;
            var maxY = this.node.height/2;
            randX = (Math.random() - 0.5) * 2 * maxX;
            randY = (Math.random() - 0.5) * 2 * maxY;

            if(randX<0){
                randX+=100;
            }
            if(randX>0){
                randX-=100;
            }
            if(randY<0){
                randY+=100;
            }
            if(randY>0){
                randY-=100;
            }
            var estado=true;
            
            if (this.arregloSecuenciaCorrecta.length ==0) {
                return cc.v2(randX,randY);
            }
            for (let index = 0; index < this.arregloSecuenciaCorrecta.length; index++) {
                posX= this.arregloSecuenciaCorrecta[index].x;
                posY= this.arregloSecuenciaCorrecta[index].y;
                console.log("vector de arreglo"+this.arregloSecuenciaCorrecta[index]);
                console.log("posicion del posible ciruclo"+cc.v2(randX,randY));
                elevadox=  Math.pow((posX-randX),2);
                elevadoy= Math.pow((posY-randY),2);
                suma= elevadox+elevadoy;
                formula= Math.sqrt(suma);
                console.log(formula);
                if (formula<300) {
                    console.log("no se cumple");
                    estado= false;
                    break;
                }
                  
            }
            if (estado== true) {
                console.log("circulo a guardar"+ cc.v2(randX,randY));
                return cc.v2(randX,randY);
            }


        }
        
        
       
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
        if (this.score >= (this.cantVeces*this.cantVeces)){
            this.nivel++;
            this.cantVeces++;
            console.log(this.cantVeces);
            this.nivelDisplay.string = 'Nivel: ' + this.nivel;
            cc.audioEngine.playEffect(this.levelSound, false);

        }
    },

    secuenciaPerfecta: function(){

        


    },

    update: function(dt) {
       
    },

});
