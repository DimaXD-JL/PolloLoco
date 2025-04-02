/**
 * Represents a small chicken enemy in the game world.
 * Extends MovableObject to inherit movement and animation capabilities.
 * Smaller and faster variant of the regular chicken enemy.
 *
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  /**
   * @type {number}
   * Vertical position of the small chicken on the ground.
   * @default 400
   */
  y = 400;

  /**
   * @type {number}
   * Height of the small chicken in pixels.
   * @default 50
   */
  height = 50;

  /**
   * @type {number}
   * Width of the small chicken in pixels.
   * @default 40
   */
  width = 40;

  /**
   * @type {number}
   * Health/energy of the small chicken (0-100).
   * @default 100
   */
  energy = 100;

  /**
   * @type {Object}
   * Collision offset values for precise hit detection.
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

  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];
  /**
   * Creates a new SmallChicken instance.
   * - Loads initial image
   * - Preloads walking animation frames
   * - Sets random starting position and speed
   * - Starts movement and animation
   */
  constructor() {
    super().loadImage(
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.setRandomPosition();
    this.setRandomSpeed();
    this.animate();
  }

  /**
   * Sets random horizontal starting position.
   * Positions between 400 and 2200 on x-axis.
   * @private
   */
  setRandomPosition() {
    this.x = 400 + Math.random() * 1800;
  }

  /**
   * Sets random movement speed.
   * Speed ranges between 0.15 and 1.15.
   * @private
   */
  setRandomSpeed() {
    this.speed = 0.15 + Math.random() * 1.0;
  }
  /**
   * Handles the small chicken's continuous animation and movement.
   * - Moves left at 60fps while alive
   * - Plays walking animation every 400ms while alive
   */
  animate() {
    this.setupMovementInterval();
    this.setupAnimationInterval();
  }

  /**
   * Sets up the movement interval (60fps).
   * @private
   */
  setupMovementInterval() {
    setInterval(() => {
      if (this.isAlive()) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Sets up the animation interval (400ms between frames).
   * @private
   */
  setupAnimationInterval() {
    setInterval(() => {
      if (this.isAlive()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 400);
  }

  /**
   * Checks if the small chicken is alive.
   * @returns {boolean} True if energy > 0
   * @private
   */
  isAlive() {
    return this.energy > 0;
  }
  /**
   * Handles damage to the small chicken.
   * Instantly kills the chicken (reduces energy by 100).
   * Ensures energy doesn't go below 0.
   */
  hit() {
    this.energy -= 100;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }
}
