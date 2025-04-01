class Chicken extends MovableObject {
  // extends MovableObject Vererbung von !MovableObject!
  y = 360;
  height = 90;
  width = 70;
  energy = 100;

  offset = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  IMAGES_WALKING = [
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead"];

  constructor() {
    super().loadImage(
      "img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 600 + Math.random() * 1800;
    this.speed = 0.15 + Math.random() * 0.8;
    this.animate();
  }

  animate() {
    // Bewegung
    setInterval(() => {
      if (this.energy > 0) {
        this.moveLeft();
      }
    }, 1000 / 60);

    // // Animation
    // setInterval(() => {
    //   if (this.energy <= 0) {
    //     this.playAnimation(this.IMAGES_DEAD); // Spiele Todesanimation in Schleife
    //   } else {
    //     this.playAnimation(this.IMAGES_WALKING);
    //   }
    // }, 10 / 60);
  }

  hit() {
    this.energy -= 100;
    if (this.energy <= 0) {
      this.energy = 0;
    }
  }
}
