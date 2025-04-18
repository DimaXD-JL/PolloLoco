/**
 * Represents a throwable bottle object in the game.
 * Extends MovableObject to inherit movement and animation capabilities.
 * Handles bottle rotation during flight and splash effects on impact.
 *
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /** @type {number} Height of the bottle in pixels @default 60 */
  height = 60;

  /** @type {number} Width of the bottle in pixels @default 50 */
  width = 50;

  /**
   * @type {boolean}
   * Flag tracking if the bottle has splashed on impact
   * @default false
   */
  hasSplashed = false;

  /**
   * @type {Object}
   * Collision offset values for precise hit detection
   * @property {number} x - Horizontal offset
   * @property {number} y - Vertical offset
   * @property {number} width - Width adjustment
   * @property {number} height - Height adjustment
   */
  offset = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates a new ThrowableObject instance.
   * @param {number} x - Initial x-coordinate position
   * @param {number} y - Initial y-coordinate position
   */
  constructor(x, y) {
    super().loadImage(
      "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.throw();
    this.animateRotation();
  }

  /**
   * Animates the bottle rotation during flight.
   * Plays rotation animation at 80ms intervals until splash occurs.
   */
  animateRotation() {
    setInterval(() => {
      if (!this.hasSplashed) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 80);
  }

  /**
   * Handles bottle splash effect on impact.
   * Plays splash animation, sound effect, and marks for deletion after 500ms.
   */
  splash() {
    this.hasSplashed = true;
    this.playAnimation(this.IMAGES_SPLASH);
    sounds.break_sound.play();
    sounds.break_sound.volume = 0.4;

    setTimeout(() => {
      this.markedForDeletion = true;
    }, 500);
  }

  /**
   * Throws the bottle with initial velocity.
   * Applies gravity and horizontal movement at 20ms intervals.
   */
  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      if (!this.hasSplashed) {
        this.x += 10;
      }
    }, 20);
  }
}
