class ThrowableObject extends MovableObject {
  height = 60;
  width = 50;
  hasSplashed = false; // Add this flag to track if splash has occurred

  offset = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.throw();
    this.animateRotation();
  }

  animateRotation() {
    setInterval(() => {
      if (!this.hasSplashed) {
        // Only rotate if not splashed
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 80);
  }

  // Play splash animation and mark as splashed
  splash() {
    this.hasSplashed = true;
    this.playAnimation(this.IMAGES_SPLASH);
    sounds.break_sound.play();
    sounds.break_sound.volume = 0.4;

    setTimeout(() => {
      this.markedForDeletion = true;
    }, 500); // Adjust time based on your animation duration
  }

  // Flaschenwurf
  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      if (!this.hasSplashed) {
        // Only move if not splashed
        this.x += 10;
      }
    }, 20);
  }
}
