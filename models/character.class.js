class Character extends MovableObject {
  // extends MovableObject Vererbung von !MovableObject!
  y = 80;
  height = 250;
  speed = 10;

  offset = {
    x: 30,
    y: 120,
    width: 50,
    height: 150,
  };

  idleTimer; // Timer
  longIdleTimer;

  IMAGES_WALKING = [
    "img_pollo_locco/img/2_character_pepe/2_walk/W-21.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-22.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-23.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-24.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-25.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img_pollo_locco/img/2_character_pepe/3_jump/J-31.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-32.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-33.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-34.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-35.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-36.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-37.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-38.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img_pollo_locco/img/2_character_pepe/5_dead/D-51.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-52.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-53.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-54.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-55.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-56.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png",
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png",
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_IDLE = [
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONGIDLE = [
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walkingSound = new Audio("audio/walking-charactor.mp3");
  jumpSound = new Audio("audio/jump-sound.mp3");
  longIdleSound = new Audio("audio/longidle.mp3");

  constructor() {
    // sobald der Character erstellt wird soll er folgendes ausführen!!
    super().loadImage("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.applyGravity();
    this.animate();
    this.isDead();
  }

  animate() {
    setInterval(() => {
      this.walkingSound.pause();
      // Bewegung nach rechts
      if (this.world.keyboard.RIGHT && this.x < 2200) {
        this.moveRight();
        this.otherDirection = false;
        this.walkingSound.play();
        this.walkingSound.volume = 0.4;
        this.resetTimers(); // Timer zurücksetzen
      }

      // Bewegung nach links
      if (this.world.keyboard.LEFT && this.x > -100) {
        this.moveLeft();
        this.walkingSound.play();
        this.walkingSound.volume = 0.4;
        this.otherDirection = true;
        this.resetTimers();
      }

      // Sprungbewegung
      if (
        (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
        !this.isAboveGround()
      ) {
        this.jump();
        this.resetTimers();
        this.jumpSound.play();
      }

      // Kamera-Position aktualisieren
      this.world.camera_x = -this.x + 100;
    }, 2500 / 60); // 60 FPS

    // Animationen aktualisieren
    setInterval(() => {
      if (this.isDead()) {
        this.characterisDead();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.startIdleTimers();
      }
    }, 3000 / 60); // 60 FPS
  }
  characterisDead() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.showGameEndScreen(false); // false für Game Over
    }, 1500);
  }

  // Timer zurücksetzen
  resetTimers() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.longIdleTimer) {
      clearTimeout(this.longIdleTimer);
      this.longIdleTimer = null;
      this.longIdleSound.pause();
    }
  }

  // Idle-Timer starten
  startIdleTimers() {
    if (!this.idleTimer) {
      this.idleTimer = setTimeout(() => {
        this.playAnimation(this.IMAGES_IDLE);

        if (!this.longIdleTimer) {
          this.longIdleTimer = setTimeout(() => {
            this.playAnimation(this.IMAGES_LONGIDLE);
            this.longIdleSound.play();
            this.longIdleSound.volume = 0.1;
          }, 3000); // Nach weiteren 3 Sekunden
        }
      }, 2000); // Nach 2 Sekunden Inaktivität
    }
  }
}
