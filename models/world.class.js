class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

    }

    setWorld(){
        this.character.world = this;
    }


    //draw wird immer weder aufgerufen 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// mit dem CODE vermeide ich die doppelterzeugung der Objekte im Canvas 
        // die Rehinfolge der Objekte die eingefügt werden ist wichtig!!
        
        // gesamter Context wird verschoben 
        this.ctx.translate(this.camera_x,0);


        this.addObjectsToMap(this.level.backgroundObject);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
     
        // Draw() wird immer wieder aufgerufen 
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
            this.ctx.save();// speichtern des Aktuellen Eistellungen vom context
            this.ctx.translate(mo.width,0);//die Methode der eingefügten Bilder wird verändert 
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
            // weil wir die x achse durch translate verändet haben müssen wir es ins - schreiben.
        }
        
        // und hier wird alels wieder rückgengig gemacht 
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); 
        if(mo.otherDirection){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}