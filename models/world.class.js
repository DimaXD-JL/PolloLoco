class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBoss = new StatusEndboss();
    statusBarCoin = new StatusCoin();
    statusBarBottel = new StatusBottel();
    throwableObjects = [];


    
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();

    }

    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() =>{
            this.checkCollisions();
            this.checkThrowObject();
        }, 200);
    }

    checkThrowObject(){
        if(this.keyboard.F){
            let bottle = new ThrowableObject (this.character.x +50,this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions(){
            this.level.enemies.forEach((enemy)=>{
                if(this.character.isCollding(enemy)) {
                   this.character.hit();
                   this.statusBar.setPercentage(this.character.energy);
                }
            });
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
        // this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
     
        this.ctx.translate(-this.camera_x, 0);
        //------Space for fixed bbjects------------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottel);
        this.addToMap(this.statusBarBoss);
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