class Chicken extends MovableObject {// extends MovableObject Vererbung von !MovableObject!
  y = 380
  height = 80;
  width = 60;
  IMAGES_WALKING=[
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

  ];

    constructor(){
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();
    } 

    animate(){
      this.moveLeft();

      setInterval(()=> {// Intercal für die bild Animation der Chicken 
      let i = this.currentImage % this.IMAGES_WALKING.length;// let i= 0 % 6; 0, Rest 0
      let path = this.IMAGES_WALKING[i];
      this.img =this.imageCache[path];
      this.currentImage ++;
      
     }, 400);

    }
}