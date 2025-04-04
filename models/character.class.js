/**
 * Represents the main character in the game, extending the MovableObject class.
 * Handles character movement, animations, and interactions with the game world.
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} The y-coordinate position of the character on the canvas. */
  y = 80;

  /** @type {number} The height of the character in pixels. */
  height = 250;

  /** @type {number} The movement speed of the character. */
  speed = 10;

  /**
   * @type {Object} The collision offset values for the character.
   * @property {number} x - Horizontal offset.
   * @property {number} y - Vertical offset.
   * @property {number} width - Width adjustment for collision box.
   * @property {number} height - Height adjustment for collision box.
   */
  offset = {
    x: 30,
    y: 120,
    width: 50,
    height: 150,
  };

  /** @type {number|null} Timer for idle animation. */
  idleTimer;

  /** @type {number|null} Timer for long idle animation. */
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

  /** @type {World} Reference to the game world the character belongs to. */
  world;

  /**
   * Creates a new Character instance.
   * Loads all animations, applies gravity, and starts the animation loops.
   */
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

  /**
   * Sets up the animation intervals for movement and character states.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 2500 / 60);
    setInterval(() => this.playCharacter(), 3000 / 60);
  }

  /**
   * Handles character movement based on keyboard input.
   * Manages walking sounds and camera movement.
   */
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

  /**
   * Checks if the character can move right.
   * @returns {boolean} True if RIGHT key is pressed and character is within right boundary.
   */
  canMoveRight() {
    const boss = this.world.level.enemies.find((e) => e instanceof Endboss);
    if (!boss) {
      return this.world.keyboard.RIGHT && this.x < 2400;
    }

    const bossMidPoint = boss.x + boss.width / 2;
    return this.world.keyboard.RIGHT && this.x < bossMidPoint;
  }

  /**
   * Moves the character to the right.
   * Plays walking sound and resets idle timers.
   */
  moveRight() {
    const boss = this.world.level.enemies.find((e) => e instanceof Endboss);

    // Stoppt in der Mitte des Bosses
    if (boss) {
      const bossMidPoint = boss.x + boss.width / 2;
      if (this.x >= bossMidPoint - this.width / 2) {
        this.x = bossMidPoint - this.width / 2;
        return;
      }
    }
    super.moveRight();
    this.otherDirection = false;
    sounds.walkingSound.play();
    sounds.walkingSound.volume = 0.4;
    this.resetTimers();
  }
  /**
   * Checks if the character can move left.
   * @returns {boolean} True if LEFT key is pressed and character is within left boundary.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > -100;
  }

  /**
   * Moves the character to the left.
   * Plays walking sound and resets idle timers.
   */
  moveLeft() {
    super.moveLeft();
    sounds.walkingSound.play();
    sounds.walkingSound.volume = 0.4;
    this.otherDirection = true;
    this.resetTimers();
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if SPACE or UP key is pressed and character is on ground.
   */
  canJump() {
    return (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    );
  }

  /**
   * Determines and plays the appropriate character animation based on state.
   */
  playCharacter() {
    if (this.canPlayDeath()) this.playDeath();
    else if (this.canPlayHurt()) this.playHurt();
    else if (this.canPlayJump()) this.playJump();
    else if (this.canPlayWalk()) this.playWalk();
    else this.playIdle();
  }

  /**
   * Checks if death animation should play.
   * @returns {boolean} True if character is dead.
   */
  canPlayDeath() {
    return this.isDead();
  }

  /**
   * Checks if hurt animation should play.
   * @returns {boolean} True if character is hurt.
   */
  canPlayHurt() {
    return this.isHurt();
  }

  /**
   * Checks if jump animation should play.
   * @returns {boolean} True if character is above ground.
   */
  canPlayJump() {
    return this.isAboveGround();
  }

  /**
   * Checks if walk animation should play.
   * @returns {boolean} True if LEFT or RIGHT key is pressed.
   */
  canPlayWalk() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Plays the death animation and triggers game over screen.
   */
  playDeath() {
    this.characterisDead();
    sounds.deadSound.play();
    sounds.deadSound.volume = 0.4;
  }

  /**
   * Plays the hurt animation and sound.
   */
  playHurt() {
    this.playAnimation(this.IMAGES_HURT);
    sounds.hurtSound.play();
    sounds.hurtSound.volume = 0.4;
  }

  /**
   * Plays the jump animation.
   */
  playJump() {
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Plays the walk animation.
   */
  playWalk() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Starts the idle animation sequence.
   */
  playIdle() {
    this.startIdleTimers();
  }

  /**
   * Handles character death sequence.
   * Shows game over screen after animation completes.
   */
  characterisDead() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.showGameEndScreen(false); // false for Game Over
    }, 1500);
  }

  /**
   * Resets the idle timers when character moves.
   */
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

  /**
   * Starts timers for idle and long idle animations.
   * Plays appropriate sounds for long idle state.
   */
  startIdleTimers() {
    // Nur starten wenn keine Timer aktiv sind
    if (!this.idleTimer && !this.longIdleTimer) {
      this.idleTimer = setTimeout(() => {
        // Erst normale Idle-Animation abspielen
        this.playAnimation(this.IMAGES_IDLE);

        // Nach der normalen Idle-Zeit die LongIdle-Animation starten
        this.longIdleTimer = setTimeout(() => {
          this.playAnimation(this.IMAGES_LONGIDLE);
          sounds.longIdleSound.play();
          sounds.longIdleSound.volume = 0.1;
        }, 2500); // 3 Sekunden nach der normalen Idle-Animation
      }, 1500); // 2 Sekunden Inaktivität bis zur normalen Idle-Animation
    }
  }
}
