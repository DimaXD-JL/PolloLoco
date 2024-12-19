class ThrowableObject extends MovableObject{
    height = 60;
    width = 50;

    IMAGES_ROTATION= [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        '.img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '.img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '.img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '.img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.pngg',
        '.img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '.img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x,y){
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        // this.loadImages(this.IMAGES_SPLASH);
        this.x = x
        this.y = y;
        this.trow();
        this.animate();
        
    }
    animate(){
       
        setInterval(()=> {// Interval für die Bild Animation der Chicken 
          this.playAnimation(this.IMAGES_ROTATION);
        
       }, 400);
    }
    trow(){
        this.spedY = 30;
        this.applyGravity();
        setInterval(()=> {
            this.x += 12;
        }, 40);

    }
}