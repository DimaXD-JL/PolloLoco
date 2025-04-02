/**
 * Represents a background object in the game world that extends the MovableObject class.
 * These objects are static elements that form part of the game's scenery.
 *
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * @type {number}
   * The width of the background object in pixels.
   * @default 720
   */
  width = 720;

  /**
   * @type {number}
   * The height of the background object in pixels.
   * @default 480
   */
  height = 480;

  /**
   * Creates a new BackgroundObject instance.
   *
   * @param {string} imagePath - The path to the image file for this background object.
   * @param {number} x - The initial x-coordinate position of the object.
   * @param {number} y - The initial y-coordinate position of the object.
   *                        Note: The actual y-position will be calculated as (480 - height).
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; // Positions object at bottom of 480px high canvas
  }
}
