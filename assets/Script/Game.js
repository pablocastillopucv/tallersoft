cc.Class({
    extends: cc.Component,

    properties: {
        circlePrefab: {
            default: null,
            type: cc.Prefab
        },
        cantVeces:4,
        aux:1,
    },

    onLoad: function () {
        this.timer = 0;
        this.spawnNewCircle();
       
    },

    spawnNewCircle: function() {
        // generate a new node in the scene with a preset template
        var newCircle = cc.instantiate(this.circlePrefab);
        // put the newly added node under the Canvas node
        this.node.addChild(newCircle);
        // set up a random position for the circle
        newCircle.setPosition(this.getNewCirclePosition());
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

    update: function(dt) {
        this.timer +=dt;
    },
});
