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
        
        this.x = 400 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.8;
        this.animate();
    } 

    animate(){
      setInterval(()=>{
        this.moveLeft();
    },1000/ 60);// hiermit sage ich wie schnell es geschiet!!(fps)
    
      

      setInterval(()=> {// Intercal für die bild Animation der Chicken 
        this.playAnimation(this.IMAGES_WALKING);
      
     }, 400);

    }
    hit() {
      this.energy -= 100;
      if (this.energy < 0) {
          this.energy = 0;
      }
  }
}