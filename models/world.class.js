class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();

    }

    setWorld(){
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(()=>{
            this.level.enemies.forEach((enemy)=>{
                if(this.character.isColling(enemy) ) {
                   this.character.hit();
                   this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }


    //draw wird immer weder aufgerufen 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// mit dem CODE vermeide ich die doppelterzeugung der Objekte im Canvas 
        // die Rehinfolge der Objekte die eingefügt werden ist wichtig!!

        // gesamter Context wird verschoben 
        this.ctx.translate(this.camera_x,0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        //------Space for fixed bbjects------------
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);


        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() { 
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        });

    }

    addToMap(mo) {
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
    
        if(mo.otherDirection){
           this.flipImageBack(mo);
        }
    }
    flipImage(mo){
        this.ctx.save();// speichtern der Aktuellen Einstellungen vom context
            this.ctx.translate(mo.width,0);//die Methode der eingefügten Bilder wird verändert 
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
            // weil wir die x achse durch translate verändet haben müssen wir es ins - schreiben
    }
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}