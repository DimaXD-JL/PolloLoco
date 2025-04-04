class Endboss extends MovableObject {
  y = 120;
  height = 350;
  width = 200;
  energy = 100;
  hadFirstContact = false;
  alertAnimationFinished = false;
  isAttacking = false;
  speed = 2;

  offset = {
    x: 30,
    y: 70,
    width: 50,
    height: 150,
  };

  IMAGES_WALKING = [
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  /**
   * Creates a new Endboss instance.
   * Loads all required images and starts animations.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.animate();
  }

  /**
   * Initializes all animation intervals for the endboss.
   * Separates state updates from movement logic for better performance.
   */
  animate() {
    this.setupAnimationIntervals();
  }

  /**
   * Sets up the main animation intervals:
   * - State updates (200ms interval)
   * - Movement handling (60fps smooth movement)
   */
  setupAnimationIntervals() {
    setInterval(() => this.updateEndbossState(), 200);
    setInterval(() => this.handleMovement(), 2000 / 60);
  }

  /**
   * Updates the endboss state based on current game conditions.
   * Handles state transitions between dead, first contact, hurt, and normal states.
   */
  updateEndbossState() {
    if (this.isDead()) {
      this.playDeathAnimation();
      return;
    }

    if (!this.hadFirstContact) {
      this.checkFirstContact();
      return;
    }

    if (this.isHurt()) {
      this.playHurtAnimation();
    } else if (this.alertAnimationFinished) {
      this.playRandomAction();
    }
  }

  /**
   * Handles the endboss movement logic.
   * Only moves when specific conditions are met and stops when dead.
   */
  handleMovement() {
    if (this.isDead()) {
      this.stopMovement();
      return;
    }

    if (this.shouldMove()) {
      this.moveLeft();
      this.playMovementSound();
    }
  }

  /**
   * Determines if the endboss should move.
   * @returns {boolean} True if first contact occurred and alert animation finished
   */
  shouldMove() {
    return this.hadFirstContact && this.alertAnimationFinished;
  }

  /**
   * Ensures movement sound is playing when endboss moves.
   * Manages sound playback to prevent overlapping.
   */
  playMovementSound() {
    if (sounds.walkSound.paused) {
      sounds.walkSound.play();
      sounds.walkSound.volume = 0.4;
    }
  }

  /**
   * Checks for and handles first contact with player.
   * Triggers alert animation when player crosses threshold (x > 1800).
   */
  checkFirstContact() {
    if (world.character.x > 1600) {
      this.hadFirstContact = true;
      this.playSlowAlertAnimation();
    }
  }

  /**
   * Selects a random action (attack or walk) when in normal state.
   * 50% chance for each action when conditions are met.
   */
  playRandomAction() {
    if (Math.random() > 0.5) {
      this.playAnimationOnce(this.IMAGES_ATTACK);
    } else {
      this.playAnimationLoop(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the hurt animation sequence once.
   */
  playHurtAnimation() {
    this.playAnimationOnce(this.IMAGES_HURT);
  }

  /**
   * Plays the slow alert animation sequence.
   * Shows each frame at 400ms intervals.
   */
  playSlowAlertAnimation() {
    this.alertAnimationStarted = true;
    let currentFrame = 0;
    const frames = this.IMAGES_ALERT.length;

    const alertInterval = setInterval(() => {
      this.showAlertFrame(currentFrame);
      currentFrame++;

      if (currentFrame >= frames) {
        this.finishAlertAnimation(alertInterval);
      }
    }, 200);
  }

  /**
   * Displays a specific frame of the alert animation.
   * @param {number} frame - The frame index to display (0-based)
   */
  showAlertFrame(frame) {
    this.img = this.imageCache[this.IMAGES_ALERT[frame]];
  }

  /**
   * Completes the alert animation sequence.
   * @param {number} interval - The interval ID to clear
   */
  finishAlertAnimation(interval) {
    clearInterval(interval);
    this.alertAnimationFinished = true;
    sounds.walkSound.play();
    sounds.walkSound.volume = 1;
  }

  /**
   * Plays the death animation sequence.
   * Shows each frame at 500ms intervals.
   */
  playDeathAnimation() {
    let currentFrame = 0;
    const deathInterval = setInterval(() => {
      this.showDeathFrame(currentFrame);
      currentFrame++;

      if (currentFrame >= this.IMAGES_DEAD.length) {
        this.finishDeathAnimation(deathInterval);
      }
    }, 500);
  }

  /**
   * Displays a specific frame of the death animation.
   * @param {number} frame - The frame index to display (0-based)
   */
  showDeathFrame(frame) {
    this.img = this.imageCache[this.IMAGES_DEAD[frame]];
  }

  /**
   * Completes the death animation sequence.
   * Shows game end screen after 1 second delay.
   * @param {number} interval - The interval ID to clear
   */
  finishDeathAnimation(interval) {
    clearInterval(interval);
    setTimeout(() => {
      sounds.walkSound.pause();
      world.showGameEndScreen(true);
    }, 1000);
  }

  /**
   * Plays an animation sequence once through.
   * @param {string[]} images - Array of image paths for the animation
   */
  playAnimationOnce(images) {
    let currentFrame = 0;
    const interval = setInterval(() => {
      this.img = this.imageCache[images[currentFrame]];
      currentFrame++;

      if (currentFrame >= images.length) {
        clearInterval(interval);
      }
    }, 1500);
  }

  /**
   * Loops an animation sequence continuously.
   * @param {string[]} images - Array of image paths for the animation
   */
  playAnimationLoop(images) {
    this.img = this.imageCache[images[this.currentImage % images.length]];
    this.currentImage = (this.currentImage + 1) % images.length;
  }

  /**
   * Handles damage to the endboss.
   * Reduces energy by 30 and updates status bar.
   */
  hit() {
    this.energy = Math.max(0, this.energy - 30);
    this.updateBossStatusBar();
    this.lastHit = Date.now();
  }

  /**
   * Updates the boss health status bar if available.
   */
  updateBossStatusBar() {
    if (world.statusBarBoss) {
      world.statusBarBoss.setPercentage(this.energy);
    }
  }

  /**
   * Stops all endboss movement.
   * Should be called when endboss is defeated.
   */
  stopMovement() {
    // Implementation would track and clear movement intervals
  }
}
