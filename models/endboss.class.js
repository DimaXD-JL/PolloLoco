class Endboss extends MovableObject {
    y = 120
    height = 350;
    width = 200;
    energy = 100;



    offset = {
      x: 30,
      y: 70,
      width: 50,
      height: 150,
  }

    IMAGES_WALKING=[
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',
    
      ];
   
      constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2200; // auf welcher Position sich der Boss befindet
        this.animate();

      }
      animate(){
  
        setInterval(()=> {// Interval für die Bild Animation 
          this.playAnimation(this.IMAGES_WALKING);
        
       }, 400);
  
      }

      
  }


