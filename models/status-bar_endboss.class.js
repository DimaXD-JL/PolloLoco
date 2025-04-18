class StatusEndboss extends DrawbleObject {
  IMAGES_ENDBOSS = [
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * @type {number}
   * Current health percentage of the endboss (0-100).
   * @default 100
   */
  percentage = 100;

  /**
   * Creates a new StatusEndboss instance.
   * Initializes with default position, size, and sets initial health to 90%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_ENDBOSS);
    this.setPosition(520, 10);
    this.setDimensions(200, 60);
    this.setPercentage(90);
  }

  /**
   * Sets the position of the endboss health bar.
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
   * Updates the health bar to reflect current endboss health.
   * @param {number} percentage - Current health percentage (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which health bar image to display based on current percentage.
   * @returns {number} Index of the appropriate image in IMAGES_ENDBOSS array
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
