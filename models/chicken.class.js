/**
 * Represents a Chicken enemy in the game world.
 * Extends MovableObject to inherit movement and collision capabilities.
 * Chickens move left across the screen and can be defeated by the player.
 *
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * @type {number}
   * Vertical position of the chicken on the ground.
   * @default 360
   */
  y = 360;

  /**
   * @type {number}
   * Height of the chicken in pixels.
   * @default 90
   */
  height = 90;

  /**
   * @type {number}
   * Width of the chicken in pixels.
   * @default 70
   */
  width = 70;

  /**
   * @type {number}
   * Health/energy of the chicken (0-100).
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
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead"];

  /**
   * Creates a new Chicken instance.
   * - Loads initial image
   * - Preloads all animation images
   * - Sets random starting position and speed
   * - Starts movement animation
   */
  constructor() {
    super().loadImage(
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 600 + Math.random() * 1800;
    this.speed = 0.15 + Math.random() * 0.8;
    this.animate();
  }

  /**
   * Handles the chicken's continuous animation and movement.
   * - Moves left at 60fps while alive
   * - Stops moving when energy reaches 0
   */
  animate() {
    setInterval(() => {
      if (this.energy > 0) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Handles damage to the chicken.
   * Reduces energy by 100 (instant kill in current implementation).
   * Ensures energy doesn't go below 0.
   */
  hit() {
    this.energy -= 100;
    if (this.energy <= 0) {
      this.energy = 0;
    }
  }
}
