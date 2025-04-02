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

  constructor() {
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
    setInterval(() => this.moveCharacter(), 2500 / 60);

    setInterval(() => this.playCharacter(), 3000 / 60);
  }
  moveCharacter() {
    sounds.walkingSound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      this.jump();
      this.resetTimers();
      sounds.jumpSound.play();
    }

    this.world.camera_x = -this.x + 100;
  }
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < 2200;
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    sounds.walkingSound.play();
    sounds.walkingSound.volume = 0.4;
    this.resetTimers();
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > -100;
  }

  moveLeft() {
    super.moveLeft();
    sounds.walkingSound.play();
    sounds.walkingSound.volume = 0.4;
    this.otherDirection = true;
    this.resetTimers();
  }

  canJump() {
    return (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    );
  }

  playCharacter() {
    if (this.canPlayDeath()) this.playDeath();
    else if (this.canPlayHurt()) this.playHurt();
    else if (this.canPlayJump()) this.playJump();
    else if (this.canPlayWalk()) this.playWalk();
    else this.playIdle();
  }

  canPlayDeath() {
    return this.isDead();
  }

  canPlayHurt() {
    return this.isHurt();
  }

  canPlayJump() {
    return this.isAboveGround();
  }

  canPlayWalk() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  playDeath() {
    this.characterisDead();
    sounds.deadSound.play();
    sounds.deadSound.volume = 0.4;
  }

  playHurt() {
    this.playAnimation(this.IMAGES_HURT);
    sounds.hurtSound.play();
    sounds.hurtSound.volume = 0.4;
  }

  playJump() {
    this.playAnimation(this.IMAGES_JUMPING);
  }

  playWalk() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  playIdle() {
    this.startIdleTimers();
  }

  characterisDead() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.showGameEndScreen(false); // false für Game Over
    }, 1500);
  }

  resetTimers() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.longIdleTimer) {
      clearTimeout(this.longIdleTimer);
      this.longIdleTimer = null;
      sounds.longIdleSound.pause();
    }
  }

  startIdleTimers() {
    if (!this.idleTimer) {
      this.idleTimer = setTimeout(() => {
        this.playAnimation(this.IMAGES_IDLE);

        if (!this.longIdleTimer) {
          this.longIdleTimer = setTimeout(() => {
            this.playAnimation(this.IMAGES_LONGIDLE);
            sounds.longIdleSound.play();
            sounds.longIdleSound.volume = 0.1;
          }, 3000); // Nach weiteren 3 Sekunden
        }
      }, 2000); // Nach 2 Sekunden Inaktivität
    }
  }
}
