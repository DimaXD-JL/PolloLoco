class StatusCoin extends DrawbleObject {
  IMAGES_COIN = [
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /**
   * @type {number}
   * Current coin collection percentage (0-100).
   */
  percentage = 0;

  /**
   * Creates a new StatusCoin instance.
   * Initializes the status bar with default position, size and empty state.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.setPosition(30, 30);
    this.setDimensions(200, 60);
    this.setPercentage(0);
  }

  /**
   * Sets the position of the coin status bar.
   * @param {number} x - Horizontal position
   * @param {number} y - Vertical position
   * @private
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the dimensions of the coin status bar.
   * @param {number} width - Width in pixels
   * @param {number} height - Height in pixels
   * @private
   */
  setDimensions(width, height) {
    this.width = width;
    this.height = height;
  }

  /**
   * Updates the status bar to reflect current coin collection progress.
   * @param {number} percentage - Current collection percentage (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate status bar image based on current percentage.
   * @returns {number} Index of the matching image in IMAGES_COIN array
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
