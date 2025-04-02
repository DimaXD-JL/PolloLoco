class StatusBottle extends DrawbleObject {
  IMAGES_BOTTELS = [
    "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * @type {number}
   * Current percentage value of bottle status (0-100).
   */
  percentage = 0;

  /**
   * Creates a new StatusBottle instance.
   * - Loads all status images
   * - Sets initial position and size
   * - Initializes with 0% status
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTELS);
    this.setPosition();
    this.setDimensions();
    this.setPercentage(0);
  }

  /**
   * Sets the position of the status bar on screen.
   * @private
   */
  setPosition() {
    this.x = 60;
    this.y = 50;
  }

  /**
   * Sets the dimensions of the status bar.
   * @private
   */
  setDimensions() {
    this.width = 200;
    this.height = 60;
  }

  /**
   * Updates the status bar to display the current percentage.
   * Automatically selects the appropriate image based on the percentage value.
   * @param {number} percentage - The current bottle status percentage (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTELS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which status bar image to use based on current percentage.
   * @returns {number} The index of the appropriate image in IMAGES_BOTTELS array
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
