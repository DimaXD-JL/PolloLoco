/**
 * The main game world controller that manages all game objects, collisions, and rendering.
 * @class
 */
class World {
  /** @type {Character} The player character instance */
  character = new Character();

  /** @type {Level} The current game level */
  level = level1;

  /** @type {HTMLCanvasElement} The game canvas element */
  canvas;

  /** @type {CanvasRenderingContext2D} The 2D rendering context */
  ctx;

  /** @type {Keyboard} The keyboard input handler */
  keyboard;

  /** @type {number} The camera's x-offset for scrolling */
  camera_x = 0;

  /** @type {StatusBar} The health status bar */
  statusBar = new StatusBar();

  /** @type {StatusEndboss} The endboss health bar */
  statusBarBoss = new StatusEndboss();

  /** @type {StatusCoin} The coin counter status bar */
  statusBarCoin = new StatusCoin();

  /** @type {StatusBottle} The bottle counter status bar */
  statusBarBottle = new StatusBottle();

  /** @type {Array<ThrowableObject>} Active throwable objects in the world */
  throwableObjects = [];

  /** @type {number} Current bottle count */
  bottleCounter = 0;

  /** @type {number} Current coin count */
  coinCounter = 0;

  /** @type {Array<Coin>} Collected coins */
  coins = [];
  /**
   * Timestamp of last bottle throw
   * @type {number}
   */
  lastThrowTime = 0;
  /**
   * Cooldown between throws in milliseconds
   * @type {number}
   */
  THROW_COOLDOWN = 800; // 0.8 seconds

  /**
   * Creates a new World instance
   * @param {HTMLCanvasElement} canvas - The game canvas element
   * @param {Keyboard} keyboard - The keyboard input handler
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets up the world reference for the character
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loops
   */
  run() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkThrowObject();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
    }, 80);
    setInterval(() => {
      this.checkThrowableObjectCollisions();
    }, 10);
  }

  /**
   * Handles bottle throwing logic when conditions are met
   */
  checkThrowObject() {
    if (this.canThrowBottle()) {
      this.throwBottle();
      this.lastThrowTime = Date.now(); // Update last throw time
    }
  }

  /**
   * Determines if bottle can be thrown
   * @returns {boolean} True if conditions met and cooldown expired
   */
  canThrowBottle() {
    const isCooldownOver =
      Date.now() - this.lastThrowTime > this.THROW_COOLDOWN;
    return this.keyboard.F && this.bottleCounter > 0 && isCooldownOver;
  }

  /**
   * Creates and throws a new bottle
   */
  throwBottle() {
    const bottle = this.createBottle();
    this.addBottleToWorld(bottle);
    this.updateBottleInventory();
    this.playThrowSound();
  }

  /**
   * Creates a new throwable bottle instance
   * @returns {ThrowableObject} The created bottle
   */
  createBottle() {
    return new ThrowableObject(this.character.x + 50, this.character.y + 100);
  }

  /**
   * Adds bottle to game world
   * @param {ThrowableObject} bottle - The bottle to add
   */
  addBottleToWorld(bottle) {
    this.throwableObjects.push(bottle);
  }

  /**
   * Updates bottle count and status display
   */
  updateBottleInventory() {
    this.bottleCounter--;
    this.updateBottleStatusBar();
  }

  /**
   * Plays bottle throw sound effect
   */
  playThrowSound() {
    sounds.bottles_sound.play();
    sounds.bottles_sound.volume = 0.4;
  }

  /**
   * Checks and handles collisions between throwable objects and enemies
   */
  checkThrowableObjectCollisions() {
    this.throwableObjects.forEach((projectile, projectileIndex) => {
      this.checkProjectileEnemyCollisions(projectile, projectileIndex);
    });
  }

  /**
   * Checks collisions between a single projectile and all enemies
   * @param {ThrowableObject} projectile - The throwable object to check
   * @param {number} projectileIndex - Index of the projectile in the array
   */
  checkProjectileEnemyCollisions(projectile, projectileIndex) {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (this.shouldHandleCollision(projectile, enemy)) {
        this.handleProjectileImpact(
          projectile,
          projectileIndex,
          enemy,
          enemyIndex
        );
      }
    });
  }

  /**
   * Determines if collision should be handled
   * @param {ThrowableObject} projectile
   * @param {Enemy} enemy
   * @returns {boolean} True if collision should be processed
   */
  shouldHandleCollision(projectile, enemy) {
    return projectile.drawisColliding(enemy) && !projectile.hasSplashed;
  }

  /**
   * Handles the impact of a projectile on an enemy
   * @param {ThrowableObject} projectile
   * @param {number} projectileIndex
   * @param {Enemy} enemy
   * @param {number} enemyIndex
   */
  handleProjectileImpact(projectile, projectileIndex, enemy, enemyIndex) {
    projectile.splash();

    if (this.isRegularEnemy(enemy)) {
      this.handleRegularEnemyHit(enemy, enemyIndex);
    } else if (this.isEndboss(enemy)) {
      this.handleEndbossHit(enemy);
    }

    this.scheduleProjectileRemoval(projectile, projectileIndex);
  }

  /**
   * Checks if enemy is a regular enemy (Chicken/SmallChicken)
   * @param {Enemy} enemy
   * @returns {boolean} True if regular enemy
   */
  isRegularEnemy(enemy) {
    return enemy instanceof Chicken || enemy instanceof SmallChicken;
  }

  /**
   * Checks if enemy is the Endboss
   * @param {Enemy} enemy
   * @returns {boolean} True if Endboss
   */
  isEndboss(enemy) {
    return enemy instanceof Endboss;
  }

  /**
   * Handles hit on regular enemy
   * @param {Enemy} enemy
   * @param {number} enemyIndex
   */
  handleRegularEnemyHit(enemy, enemyIndex) {
    enemy.hit();
    this.scheduleEnemyRemoval(enemyIndex);
  }

  /**
   * Handles hit on Endboss
   * @param {Endboss} endboss
   */
  handleEndbossHit(endboss) {
    endboss.hit();
  }

  /**
   * Schedules enemy removal after delay
   * @param {number} enemyIndex
   */
  scheduleEnemyRemoval(enemyIndex) {
    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }, 100);
  }

  /**
   * Schedules projectile removal after delay
   * @param {ThrowableObject} projectile
   * @param {number} projectileIndex
   */
  scheduleProjectileRemoval(projectile, projectileIndex) {
    setTimeout(() => {
      this.removeProjectile(projectile, projectileIndex);
    }, 500);
  }

  /**
   * Removes projectile from game world
   * @param {ThrowableObject} projectile
   * @param {number} projectileIndex
   */
  removeProjectile(projectile, projectileIndex) {
    if (this.throwableObjects.includes(projectile)) {
      this.throwableObjects.splice(projectileIndex, 1);
    }
  }

  /**
   * Checks and handles all collisions between character and enemies
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.isCollidingWithCharacter(enemy)) {
        this.handleEnemyCollision(enemy, index);
      }
    });
  }

  /**
   * Determines if enemy is colliding with character
   * @param {Enemy} enemy
   * @returns {boolean} True if collision detected
   */
  isCollidingWithCharacter(enemy) {
    return this.character.drawisColliding(enemy);
  }

  /**
   * Handles collision between character and enemy
   * @param {Enemy} enemy
   * @param {number} enemyIndex
   */
  handleEnemyCollision(enemy, enemyIndex) {
    if (this.isJumpingOnEnemy()) {
      this.handleJumpAttack(enemy, enemyIndex);
    } else {
      this.handleCharacterDamaged();
    }
  }

  /**
   * Determines if character is jumping on enemy
   * @returns {boolean} True if character is above ground and descending
   */
  isJumpingOnEnemy() {
    return this.character.isAboveGround() && this.character.speedY <= 0;
  }

  /**
   * Handles jump attack on enemy
   * @param {Enemy} enemy
   * @param {number} enemyIndex
   */
  handleJumpAttack(enemy, enemyIndex) {
    if (this.isDefeatableEnemy(enemy)) {
      this.defeatEnemy(enemyIndex);
    }
  }

  /**
   * Checks if enemy can be defeated by jump
   * @param {Enemy} enemy
   * @returns {boolean} True if enemy is Chicken or SmallChicken
   */
  isDefeatableEnemy(enemy) {
    return enemy instanceof Chicken || enemy instanceof SmallChicken;
  }

  /**
   * Removes enemy from game and plays sound
   * @param {number} enemyIndex
   */
  defeatEnemy(enemyIndex) {
    this.level.enemies.splice(enemyIndex, 1);
    this.playEnemyDefeatSound();
  }

  /**
   * Plays enemy defeat sound effect
   */
  playEnemyDefeatSound() {
    sounds.chicken_sound.play();
    sounds.chicken_sound.volume = 0.1;
  }

  /**
   * Handles character taking damage from enemy
   */
  handleCharacterDamaged() {
    this.character.hit();
    this.updateHealthDisplay();
  }

  /**
   * Updates health status bar display
   */
  updateHealthDisplay() {
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Checks and handles all collisions between character and coins
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.isCollidingWithCoin(coin)) {
        this.collectCoin(coin, index);
      }
    });
  }

  /**
   * Determines if character is colliding with a coin
   * @param {Coin} coin - The coin to check
   * @returns {boolean} True if collision detected
   */
  isCollidingWithCoin(coin) {
    return this.character.drawisColliding(coin);
  }

  /**
   * Handles coin collection logic
   * @param {Coin} coin - The collected coin
   * @param {number} coinIndex - Index of coin in array
   */
  collectCoin(coin, coinIndex) {
    this.incrementCoinCounter();
    this.removeCoinFromWorld(coinIndex);
    this.updateCoinDisplay();
    this.playCoinSound();
  }

  /**
   * Increases the player's coin counter
   */
  incrementCoinCounter() {
    this.coinCounter++;
  }

  /**
   * Removes collected coin from game world
   * @param {number} coinIndex - Index of coin to remove
   */
  removeCoinFromWorld(coinIndex) {
    this.level.coins.splice(coinIndex, 1);
  }

  /**
   * Updates the coin status bar display
   */
  updateCoinDisplay() {
    const percentage = Math.min(this.coinCounter * 10, 100);
    this.statusBarCoin.setPercentage(percentage);
  }

  /**
   * Plays coin collection sound effect
   */
  playCoinSound() {
    sounds.coin_sound.play();
    sounds.coin_sound.volume = 0.4;
  }
  updateCoinStatusBar() {
    let percentage = Math.min(this.coinCounter * 10, 100);
    this.statusBarCoin.setPercentage(percentage);
  }
  /**
   * Checks for and handles collisions between character and bottles
   * @memberof BottleCollisionSystem
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.drawisColliding(bottle)) this.collectBottle(bottle, i);
    });
  }
  /**
   * Handles bottle collection process
   * @param {Bottle} bottle - The bottle being collected
   * @param {number} index - Index of bottle in array
   * @memberof BottleCollisionSystem
   */
  collectBottle(bottle, index) {
    this.incrementBottleCount();
    this.removeBottle(index);
    this.updateBottleDisplay();
    this.playCollectionSound();
  }

  /**
   * Increases player's bottle counter
   * @memberof BottleCollisionSystem
   */
  incrementBottleCount() {
    this.bottleCounter++;
  }

  /**
   * Removes bottle from game world
   * @param {number} index - Index of bottle to remove
   * @memberof BottleCollisionSystem
   */
  removeBottle(index) {
    this.level.bottles.splice(index, 1);
  }

  /**
   * Updates bottle status bar display
   * @memberof BottleCollisionSystem
   */
  updateBottleDisplay() {
    this.statusBarBottle.setPercentage(Math.min(this.bottleCounter * 10, 100));
  }

  /**
   * Plays bottle collection sound effect
   * @memberof BottleCollisionSystem
   */
  playCollectionSound() {
    sounds.bottles_sound.play();
    sounds.bottles_sound.volume = 0.4;
  }
  /**
   * Updates the bottle status bar display based on current bottle count
   */
  updateBottleStatusBar() {
    const percentage = Math.min(this.bottleCounter * 10, 100);
    this.statusBarBottle.setPercentage(percentage);
  }
  /**
   * Main rendering method that draws the entire game world
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarBoss);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the game map
   * @param {Array<DrawableObject>} objects - Array of objects to add to the map
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the game map with flipping support
   * @param {MovableObject} mo - The movable object to add to the map
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    // Draw the object and its debug frames
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally for rendering
   * @param {MovableObject} mo - The object to flip
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  /**
   * Restores an image after flipping
   * @param {MovableObject} mo - The object to restore
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
  /**
   * Triggers the game won state
   */
  gameWon() {
    this.showGameEndScreen(true);
  }
  /**
   * Displays the game end screen with appropriate victory/defeat state
   * @param {boolean} isVictory - Whether the player won the game
   */
  showGameEndScreen(isVictory) {
    this.stopGame();
    this.playEndGameSound(isVictory);
    this.displayEndScreen(isVictory);
    this.showRestartButton();
  }
  /**
   * Stops all game intervals and timeouts
   */
  stopAllGameIntervals() {
    // Clear all possible intervals and timeouts
    for (let i = 1; i < 999999; i++) {
      clearInterval(i);
      clearTimeout(i);
    }
  }
  /**
   * Plays appropriate end game sound
   * @param {boolean} isVictory - Whether to play victory or game over sound
   * @private
   */
  playEndGameSound(isVictory) {
    const sound = isVictory ? sounds.winn_sound : sounds.gameover_sound;
    sound.play();
    sound.volume = 0.4;
    game_sound.pause();
  }
  /**
   * Displays the end game screen element
   * @param {boolean} isVictory - Whether to show victory or defeat screen
   * @private
   */
  displayEndScreen(isVictory) {
    const elementId = isVictory ? "gameWon" : "gameOver";
    const element = document.getElementById(elementId);
    element?.classList.remove("d-none");
    element?.classList.add("d-flex");
  }
  /**
   * Shows the restart button after a delay
   * @private
   */
  showRestartButton() {
    setTimeout(() => {
      const button = document.getElementById("restartButton");
      if (button) {
        button.classList.remove("d-none");
        button.onclick = () => {
          localStorage.setItem("forceSoundInit", "true");
          location.reload();
        };
      }
    }, 2000);
  }
  /**
   * Stops all game activity
   * @private
   */
  stopGame() {
    this.stopAllGameIntervals();
    cancelAnimationFrame(this.animationFrame);
  }
}
