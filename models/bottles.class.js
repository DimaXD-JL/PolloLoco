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
  currentImageIndex = 0;

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[0]);
    this.loadImages(this.IMAGES_BOTTLE);

    this.x = 50 + Math.random() * 2100;
    this.startImageSwitch();
  }

  startImageSwitch() {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.IMAGES_BOTTLE.length;
      this.loadImage(this.IMAGES_BOTTLE[this.currentImageIndex]);
    }, 500); // Wechselt alle 500ms das Bild
  }
}
