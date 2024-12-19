class Coin extends MovableObject {
    height = 150;
    width = 100;

    IMAGES_COIN = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.y= 300;
        this.x= 100;
            this.x = 50 + Math.random() * 2100;
            this.y = 50 + Math.random() * 320;
        }



}



