
cc.Class({
    extends: cc.Component,

    properties: {
        spawnSound:{
            default:null,
            type:cc.AudioClip
        },
    },
    onLoad: function() {
        this.timer = 0.0;
        cc.audioEngine.playEffect(this.spawnSound, false);
        
    },
    onPicked: function() {
        this.node.destroy();
        this.game.spawnNewCircle();

    },
    update: function(dt){
        
        this.timer +=dt;
        if(this.game.nivel>2){


            if(this.game.aux< 4){

                if ( Math.round(this.timer) == 2.0 ) {
                    this.game.aux++;
                    this.onPicked();
                    return;
                }
            }
            else{
                if ( Math.round(this.timer) == 2.0 ) {
                    console.log("entre aqui");
                    
                    this.node.destroy();
                    this.game.aux=0;
                    this.game.spawnCircles();
    
                }
                
                
            }




        }

        else{

            if(this.game.aux< this.game.cantVeces){

                if ( Math.round(this.timer) == 2.0 ) {
                    this.game.aux++;
                    this.onPicked();
                    return;
                }
            }
            else{
                if ( Math.round(this.timer) == 2.0 ) {
                    
                    this.node.destroy();
                    this.game.aux=0;
                    this.game.spawnCircles();
    
                }
                
                
            }

        }
       
    },

    
});
