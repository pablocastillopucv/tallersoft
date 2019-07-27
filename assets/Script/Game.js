cc.Class({
    extends: cc.Component,

    properties: {
        circlePrefab: {
            default: null,
            type: cc.Prefab
        },
        touchPointPrefab:{
            default: null,
            type: cc.Prefab
        },
        scoreDisplay:{
            default:null,
            type:cc.Label
        },
        positionCircle:cc.v2(0,0),
        cantVeces:4,
        aux:1,
        cantVecesPresiona:0,
        arregloSecuencia:[],

    },

    onLoad: function () {
        this.score = 0;
        this.spawnNewCircle();
        this.spawnTouchPoint();

       
    },

    spawnNewCircle: function() {
        // generate a new node in the scene with a preset template
        var newCircle = cc.instantiate(this.circlePrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newCircle);
        // set up a random position for the circle
        this.positionCircle = this.getNewCirclePosition();
        newCircle.setPosition(this.positionCircle);
        newCircle.getComponent('Circle').game = this;
        
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
    gainScore: function () {
        this.score += 1;
        // update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score;
    },
    secuenciaCorrecta:function(parametro1){
        this.arregloSecuencia.push(parametro1);
    },
    gameOver: function(){
        cc.director.loadScene('game');
    },
    update: function(dt) {
    },
});
