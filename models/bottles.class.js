class Bottle extends MovableObject {
  height = 80;
  width = 50;
  y = 360;

  offset = {
    x: 40,
    y: 70,
    width: 70,
    height: 140,
  };

  IMAGES_BOTTLE = [
    "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage(
      "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
    );
    this.loadImages(this.IMAGES_BOTTLE);

    this.x = 100;
    this.x = 50 + Math.random() * 2100;
    this.image = this.loadRandomImage();
  }
  loadRandomImage() {
    let randomIndex = Math.floor(Math.random() * this.IMAGES_BOTTLE.length);
    return this.loadImage(this.IMAGES_BOTTLE[randomIndex]);
  }
}
