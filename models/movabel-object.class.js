/**
 * Represents a movable game object that extends DrawableObject.
 * Provides core functionality for movement, collision detection, and physics.
 * Serves as the base class for all movable entities in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawbleObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Checks basic collision between this object and another movable object.
   * Uses simple bounding box collision detection without offset.
   * @param {MovableObject} mo - The other movable object to check collision with
   * @returns {boolean} True if bounding boxes overlap
   */
  isCollding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Checks precise collision using offset values.
   * Accounts for transparent areas in sprites using offset values.
   * @param {MovableObject} mo - The other movable object to check collision with
   * @returns {boolean} True if collision boxes (with offsets) overlap
   */
  drawisColliding(mo) {
    return (
      this.x + this.offset.x + this.width - this.offset.width >
        mo.x + mo.offset.x &&
      this.y + this.offset.y + this.height - this.offset.height >
        mo.y + mo.offset.y &&
      this.x + this.offset.x <
        mo.x + mo.offset.x + mo.width - mo.offset.width &&
      this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height
    );
  }
  /**
   * Handles damage to the object.
   * Reduces energy by 5 points and updates last hit timestamp.
   * Ensures energy doesn't drop below 0.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }
  /**
   * Checks if object is currently in hurt state.
   * Hurt state lasts for 0.5 seconds after being hit.
   * @returns {boolean} True if object was recently hit
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }
  /**
   * Checks if object is dead (energy depleted).
   * @returns {boolean} True if energy reaches 0
   */
  isDead() {
    return this.energy == 0;
  }
  /**
   * Plays animation sequence from image array.
   * Automatically loops back to start when reaching end.
   * @param {string[]} images - Array of image paths for animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  /**
   * Applies gravity physics to the object.
   * Continuously updates vertical position and speed.
   * Runs at 25fps for smooth movement.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }
  /**
   * Checks if object is above ground level.
   * Special case for ThrowableObjects which are always above ground.
   * @returns {boolean} True if above normal ground level
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 210;
    }
  }
  /**
   * Moves object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }
  /**
   * Moves object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }
  /**
   * Makes object jump by setting initial vertical speed.
   */
  jump() {
    this.speedY = 30;
  }
}
