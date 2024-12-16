class Character extends MovableObject{  // extends MovableObject Vererbung von !MovableObject!
    
    speed = 10;
    IMAGES_WALKING =[
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ]

    // currentImage = 0;
    world;


    constructor(){
        super().loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    } 
  
    animate(){

        setInterval(()=>{
            if (this.world.keyboard.RIGHT && this.x <2780 ){
                this.x += this.speed;
                this.otherDirection = false;
            }
            
            if (this.world.keyboard.LEFT&& this.x > 0){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x +100;
            
        },2000/60);

        setInterval(()=> {
            if(this.world.keyboard.RIGHT ||this.world.keyboard.LEFT){
            // Walk animation
        let i = this.currentImage % this.IMAGES_WALKING.length;// let i= 0 % 6; 0, Rest 0
        let path = this.IMAGES_WALKING[i];
        this.img =this.imageCache[path];
        this.currentImage ++;
        
    }}, 50);

    }
    jump(){

    }
}