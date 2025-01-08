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

  bottles_sound = new Audio("audio/bottles.mp3");
  coin_sound = new Audio("audio/coin.mp3");
  chicken_sound = new Audio("audio/chicken-hurt-Dead.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkThrowObject();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
    }, 80);
    setInterval(() => {
      this.checkThrowableObjectCollisions();
    }, 10);
  }

  // Funktion zum Werfen von Flaschen
  checkThrowObject() {
    if (this.keyboard.F && this.bottleCounter > 0) {
      // Nur werfen, wenn mindestens eine Flasche eingesammelt wurde
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleCounter--; // Zähler für Flaschen reduzieren
      this.updateBottleStatusBar(); // Statusleiste aktualisiere
      this.bottles_sound.play();
      this.bottles_sound.volume = 0.4;
    }
  }

  checkThrowableObjectCollisions() {
    // Prüfe Kollisionen zwischen geworfenen Objekten und Gegnern
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy, index) => {
        if (throwableObject.drawisColliding(enemy)) {
          // Gegner trifft, spezifisch für Chicken oder SmallChicken
          if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.hit(); // Gegner als getroffen markieren
            this.level.enemies.splice(index, 1); // Entferne Chicken aus der Liste
          } else if (enemy instanceof Endboss) {
            enemy.hit(); // Reduziere die Trefferpunkte des Endbosses
            if (enemy.isDead()) {
              // Überprüfe, ob der Endboss besiegt ist
              this.level.enemies.splice(index, 1); // Entferne Endboss, wenn besiegt
            }
          }
          // Entferne das geworfene Objekt nach der Kollision
          this.throwableObjects.splice(
            this.throwableObjects.indexOf(throwableObject),
            1
          );
        }
      });
    });
  }

  checkEnemyCollisions() {
    // Kollision mit Gegnern
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.drawisColliding(enemy)) {
        if (this.character.isAboveGround() && !this.character.speedY <= 0) {
          if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            this.level.enemies.splice(index, 1);
            this.chicken_sound.play();
            this.chicken_sound.volume = 0.1;
          }
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
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
        this.coin_sound.play();
        this.coin_sound.volume = 0.4;
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
        this.bottleCounter++; // Zähler erhöhen
        this.level.bottles.splice(index, 1); // Flaschen aus Array entfernen
        this.updateBottleStatusBar(); // Statusleiste aktualisieren
        this.bottles_sound.play();
        this.bottles_sound.volume = 0.4;
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // mit dem CODE vermeide ich die doppelterzeugung der Objekte im Canvas
    // die Rehinfolge der Objekte die eingefügt werden ist wichtig!!

    // gesamter Context wird verschoben
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    //------Space for fixed objects------------
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarBoss);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  flipImage(mo) {
    this.ctx.save(); // speichtern der Aktuellen Einstellungen vom context
    this.ctx.translate(mo.width, 0); //die Methode der eingefügten Bilder wird verändert
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    // weil wir die x achse durch translate verändet haben müssen wir es ins - schreiben
  }
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
