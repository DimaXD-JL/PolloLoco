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
    statusBarBottle = new StatusBottle();
    throwableObjects = [];
    bottleCounter = 0;
    coinCounter = 0;
    coins = [];
   


    
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        // this.checkEnemyCollisions();
        // this.checkCoinCollisions();
        // this.checkBottleCollisions();
        this.run();

    }

    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() =>{
            this.checkEnemyCollisions();
            this.checkThrowObject();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 250);
    }

    // Funktion zum Werfen von Flaschen
    checkThrowObject() {
    if (this.keyboard.F && this.bottleCounter > 0) { // Nur werfen, wenn mindestens eine Flasche eingesammelt wurde
        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.bottleCounter--; // Zähler für Flaschen reduzieren
        this.updateBottleStatusBar(); // Statusleiste aktualisieren
        }
    }

    checkEnemyCollisions() {
        // Kollision mit Gegnern
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCoinCollisions() {
        // Kollision mit Coins
        this.level.coins.forEach((coin, index) => {
            if (this.character.drawisColliding(coin)) {
                this.coinCounter++; // Zähler erhöhen
                this.level.coins.splice(index, 1); // Coin aus Array entfernen
                this.updateCoinStatusBar(); // Statusleiste aktualisieren
            }
        });
    }
        updateCoinStatusBar() {
            let percentage = Math.min(this.coinCounter * 10, 100); // Beispiel: Pro Coin +10%
            this.statusBarCoin.setPercentage(percentage);
        }
    
 checkBottleCollisions() {
            // Kollision mit Flaschen
            this.level.bottles.forEach((bottle, index) => {
                if (this.character.drawisColliding(bottle)) {
                    this.bottleCounter++;  // Zähler erhöhen
                    this.level.bottles.splice(index, 1); // Flaschen aus Array entfernen
                    this.updateBottleStatusBar(); // Statusleiste aktualisieren
                }
            });
        }
         // Aktualisierung der Statusleiste für Flaschen
        updateBottleStatusBar() {
            let percentage = Math.min(this.bottleCounter * 10, 100); // Beispiel: Pro Flasche +10%
            this.statusBarBottle.setPercentage(percentage);
        }




    //draw wird immer weder aufgerufen 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);// mit dem CODE vermeide ich die doppelterzeugung der Objekte im Canvas 
        // die Rehinfolge der Objekte die eingefügt werden ist wichtig!!

        // gesamter Context wird verschoben 
        this.ctx.translate(this.camera_x,0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds);
    
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
     
        this.ctx.translate(-this.camera_x, 0);
        //------Space for fixed bbjects------------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
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
        mo.drawOffsetFrame(this.ctx)
    
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