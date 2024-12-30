class Coin extends MovableObject {
  height = 150;
  width = 100;

  offset = {
    x: 35,
    y: 55,
    width: 70,
    height: 110,
  };

  IMAGES_COIN = [
    "img_pollo_locco/img/8_coin/coin_1.png",
    "img_pollo_locco/img/8_coin/coin_2.png",
  ];

  constructor() {
    super();
    this.loadImage("img_pollo_locco/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.animate();
    this.y = 250;
    this.x = 100;
    this.x = 50 + Math.random() * 2100;
    this.y = 50 + Math.random() * 150;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 150);
  }
}
