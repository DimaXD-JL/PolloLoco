/**
 * Base class for all drawable objects in the game.
 * Provides core functionality for loading, caching, and rendering images,
 * as well as debug drawing for collision boxes.
 */
class DrawbleObject {
  x = 120;
  y = 310;
  img;
  imageCache = {};
  currentImage = 0;
  height = 150;
  width = 100;

  /**
   * Loads a single image from the specified path.
   * @param {string} path - The file path to the image resource.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's current image to the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw onto.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a debug frame around the object's main bounding box (for development).
   * Currently only draws for Chicken and SmallChicken instances.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw onto.
   */
  drawFrame(ctx) {
    if (this instanceof Chicken || this instanceof SmallChicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      // ctx.stroke(); // Uncomment to enable debug drawing
    }
  }

  /**
   * Draws a debug frame around the object's offset collision box (for development).
   * Draws for Character, Coin, Bottle, Chicken, SmallChicken, and Endboss instances.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw onto.
   */
  drawOffsetFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.x,
        this.y + this.offset.y,
        this.width - this.offset.width,
        this.height - this.offset.height
      );
      // ctx.stroke(); // Uncomment to enable debug drawing
    }
  }

  /**
   * Preloads multiple images and stores them in the image cache.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
