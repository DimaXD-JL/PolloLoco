/**
 * Represents a collectible bottle object in the game world.
 * Extends MovableObject to inherit basic movement and collision detection.
 * Automatically cycles through sprite variations when placed in the game world.
 *
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /**
   * @type {number}
   * The height of the bottle in pixels.
   * @default 80
   */
  height = 80;

  /**
   * @type {number}
   * The width of the bottle in pixels.
   * @default 50
   */
  width = 50;

  /**
   * @type {number}
   * The vertical position of the bottle on the ground.
   * @default 360
   */
  y = 360;

  /**
   * @type {Object}
   * Collision offset values for precise hit detection.
   * @property {number} x - Horizontal offset
   * @property {number} y - Vertical offset
   * @property {number} width - Width adjustment
   * @property {number} height - Height adjustment
   */
  offset = {
    x: 40,
    y: 70,
    width: 70,
    height: 140,
  };
  IMAGES_BOTTLE = [
    "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];
  /**
   * @type {number}
   * Index of the currently displayed image.
   * @default 0
   */
  currentImageIndex = 0;

  /**
   * Creates a new Bottle instance.
   * - Loads initial image
   * - Preloads all bottle images
   * - Sets random horizontal position
   * - Starts animation cycle
   */
  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);

    this.x = 50 + Math.random() * 2100;
    this.startImageSwitch();
  }

  /**
   * Starts the image cycling animation.
   * Changes sprite every 500ms to create visual variation.
   * Uses setInterval to repeatedly call showNextImage().
   */
  startImageSwitch() {
    setInterval(() => this.showNextImage(), 500);
  }

  /**
   * Advances to the next image in the sequence.
   * - Cycles currentImageIndex using modulo arithmetic
   * - Loads the new image for display
   * - Automatically wraps around to first image after last
   */
  showNextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.IMAGES_BOTTLE.length;
    this.loadImage(this.IMAGES_BOTTLE[this.currentImageIndex]);
  }
}
