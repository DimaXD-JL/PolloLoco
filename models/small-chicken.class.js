class SmallChicken extends MovableObject {
  // extends MovableObject Vererbung von !MovableObject!
  y = 400;
  height = 50;
  width = 40;
  energy = 100;

  offset = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage(
      "img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);

    this.x = 400 + Math.random() * 1800;
    this.speed = 0.15 + Math.random() * 1.0;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.energy > 0) {
        this.moveLeft();
      }
    }, 1000 / 60);
    setInterval(() => {
      if (this.energy > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 400);
  }
  hit() {
    this.energy -= 100;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }
}
