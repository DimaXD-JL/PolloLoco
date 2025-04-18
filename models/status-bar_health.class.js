/**
 * Represents the player's health status bar in the game UI.
 * Displays the current health percentage with visual indicators.
 * Extends DrawableObject for rendering capabilities.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawbleObject {
  /**
   * @type {string[]}
   * Array of image paths for different health states.
   * Images represent health levels from 0% to 100% in 20% increments.
   * Blue color variant of the health bar.
   */
  IMAGES_HEALTH = [
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * @type {number}
   * Current health percentage (0-100).
   * @default 100
   */
  percentage = 100;

  /**
   * Creates a new StatusBar instance.
   * Initializes with default position, size, and sets health to 100%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPosition(5, 0);
    this.setDimensions(200, 70);
    this.setPercentage(100);
  }

  /**
   * Sets the position of the health bar on screen.
   * @param {number} x - Horizontal position in pixels
   * @param {number} y - Vertical position in pixels
   * @private
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the dimensions of the health bar.
   * @param {number} width - Width in pixels
   * @param {number} height - Height in pixels
   * @private
   */
  setDimensions(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Updates the health bar to reflect current health percentage.
   * @param {number} percentage - Current health percentage (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which health bar image to display based on current percentage.
   * Uses threshold values to select the appropriate image state.
   * @returns {number} Index of the matching image in IMAGES_HEALTH array
   * @private
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
