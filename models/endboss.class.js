class Endboss extends MovableObject {
  y = 120;
  height = 350;
  width = 200;
  energy = 100;
  hadFirstContact = false;
  alertAnimationFinished = false;
  isAttacking = false;
  speed = 1;

  offset = {
    x: 30,
    y: 70,
    width: 50,
    height: 150,
  };

  IMAGES_WALKING = [
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.animate();
  }

  animate() {
    // Haupt-Animation-Loop
    setInterval(() => {
      if (this.isDead()) {
        this.playDeathAnimation();
        return;
      }

      if (!this.hadFirstContact) {
        // Warte auf First Contact
        if (world.character.x > 1800) {
          this.hadFirstContact = true;
          this.playSlowAlertAnimation();
        }
        return;
      }

      if (this.isHurt()) {
        this.playAnimationOnce(this.IMAGES_HURT);
      } else if (!this.alertAnimationFinished) {
        // Warte bis Alert-Animation fertig ist
        return;
      } else {
        // Normales Verhalten nach Alert
        if (Math.random() > 0.5) {
          this.playAnimationOnce(this.IMAGES_ATTACK);
        } else {
          this.playAnimationLoop(this.IMAGES_WALKING);
        }
      }
    }, 200);

    // Bewegung nach Alert
    const movementInterval = setInterval(() => {
      if (this.isDead()) {
        clearInterval(movementInterval);
        return;
      }

      if (this.hadFirstContact && this.alertAnimationFinished) {
        this.moveLeft();
        if (sounds.walkSound.paused) {
          sounds.walkSound.play();
          sounds.walkSound.volume = 0.4;
        }
      }
    }, 2500 / 60);
  }

  playSlowAlertAnimation() {
    this.alertAnimationStarted = true;
    let currentFrame = 0;
    const frames = this.IMAGES_ALERT.length;

    const alertInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_ALERT[currentFrame]];
      currentFrame++;

      if (currentFrame >= frames) {
        clearInterval(alertInterval);
        this.alertAnimationFinished = true;

        // Walk Sound starten
        sounds.walkSound.play();
        sounds.walkSound.volume = 0.4;
      }
    }, 400);
  }

  playDeathAnimation() {
    let currentFrame = 0;
    const deathInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_DEAD[currentFrame]];
      currentFrame++;

      if (currentFrame >= this.IMAGES_DEAD.length) {
        clearInterval(deathInterval);
        setTimeout(() => {
          world.showGameEndScreen(true);
        }, 1500);
      }
    }, 500); // Passt die Geschwindigkeit der Animation an
  }

  playAnimationOnce(images) {
    let currentFrame = 0;
    const interval = setInterval(() => {
      this.img = this.imageCache[images[currentFrame]];
      currentFrame++;

      if (currentFrame >= images.length) {
        clearInterval(interval);
      }
    }, 1000); // Anpassbare Frame-Zeit
  }

  playAnimationLoop(images) {
    this.img = this.imageCache[images[this.currentImage % images.length]];
    this.currentImage = (this.currentImage + 1) % images.length;
  }

  hit() {
    this.energy -= 30;
    if (this.energy < 0) this.energy = 0;

    if (world.statusBarBoss) {
      world.statusBarBoss.setPercentage(this.energy);
    }
    this.lastHit = Date.now();
  }

  // isHurt() {
  //   return this.lastHit && Date.now() - this.lastHit < 1000;
  // }
}
