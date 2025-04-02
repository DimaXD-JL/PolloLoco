/**
 * Represents a collectible coin object in the game world.
 * Extends MovableObject to inherit basic movement and animation capabilities.
 * Coins spin continuously and can be collected by the player.
 *
 * @extends MovableObject
 */
class Coin extends MovableObject {
  /**
   * @type {number}
   * Height of the coin in pixels.
   * @default 150
   */
  height = 150;

  /**
   * @type {number}
   * Width of the coin in pixels.
   * @default 100
   */
  width = 100;

  /**
   * @type {Object}
   * Collision offset values for precise collection detection.
   * @property {number} x - Horizontal offset
   * @property {number} y - Vertical offset
   * @property {number} width - Width adjustment
   * @property {number} height - Height adjustment
   */
  offset = {
    x: 35,
    y: 55,
    width: 70,
    height: 110,
  };
  IMAGES_COIN = [
    "img_pollo_locco/img/8_coin/coin_1.png",
    "img_pollo_locco/img/8_coin/coin_2.png",
  ];

  /**
   * Creates a new Coin instance.
   * - Loads initial coin image
   * - Preloads all animation frames
   * - Sets random position within game world
   * - Starts spinning animation
   */
  constructor() {
    super();
    this.loadImage("img_pollo_locco/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.animate();
    this.setRandomPosition();
  }

  /**
   * Sets random position for the coin within game boundaries.
   * X position ranges from 50 to 2150 (50 + 2100)
   * Y position ranges from 50 to 200 (50 + 150)
   * @private
   */
  setRandomPosition() {
    this.x = 50 + Math.random() * 2100;
    this.y = 50 + Math.random() * 150;
  }

  /**
   * Animates the coin spinning effect.
   * Cycles through coin images every 150ms to create spinning animation.
   * Runs continuously while coin exists in game.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 150);
  }
}
