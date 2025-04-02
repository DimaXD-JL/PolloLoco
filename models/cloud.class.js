/**
 * Represents a cloud background element in the game world.
 * Extends MovableObject to inherit movement capabilities.
 * Clouds move slowly left across the sky to create parallax effect.
 *
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * @type {number}
   * Vertical position of the cloud in the sky.
   * @default 10
   */
  y = 10;

  /**
   * @type {number}
   * Height of the cloud in pixels.
   * @default 350
   */
  height = 350;

  /**
   * @type {number}
   * Width of the cloud in pixels.
   * @default 500
   */
  width = 500;

  IMAGES_CLOUD = [
    "img_pollo_locco/img/5_background/layers/4_clouds/1.png",
    "img_pollo_locco/img/5_background/layers/4_clouds/2.png",
  ];

  /**
   * Creates a new Cloud instance.
   * - Loads initial cloud image
   * - Sets random horizontal starting position
   * - Starts movement animation
   */
  constructor() {
    super().loadImage("img_pollo_locco/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2100;
    this.animate();
  }

  /**
   * Animates the cloud movement.
   * Moves cloud left at 60 frames per second (smooth animation).
   * Creates parallax background effect.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
