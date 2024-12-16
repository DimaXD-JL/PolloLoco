class Character extends MovableObject{  // extends MovableObject Vererbung von !MovableObject!
    y = 80;
    height = 250;
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
    wlking_sound = new Audio('audio/walking-charactor.mp3')

    constructor(){// sobald der Character erstellt wird soll er folgendes ausführen!!
        super().loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.animate();
    } 
  
    animate(){

        setInterval(()=>{
            this.wlking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x <2200 ){
                this.x += this.speed;
                this.otherDirection = false;
                this.wlking_sound.play();
            }
            // alternatv = if (this.world.keyboard.LEFT&& this.x < this.level.level_end_x)
            if (this.world.keyboard.LEFT&& this.x >-100){// mit && this.x > 0 sage ich dem character bis wo er laufen kann ( begrenzung)
                this.x -= this.speed;
                this.otherDirection = true;
                this.wlking_sound.play();
            }
            this.world.camera_x = -this.x + 100;// hier sage ich der camera in welchen pixelradius mir der character angezeigt werden soll. 
            
        },2000/60);

        setInterval(()=> {
            if(this.world.keyboard.RIGHT ||this.world.keyboard.LEFT){
            // Walk animation
            this.playAnimation(this.IMAGES_WALKING);    

            //**Langeform */
        // let i = this.currentImage % this.IMAGES_WALKING.length;// let i= 0 % 6; 0, Rest 0
        // //% (Modulo) sorgt dafür, dass der Wert von i innerhalb des Bereichs von 0 bis zur Länge des Arrays IMAGES_WALKING - 1 bleibt. 
        // // Dadurch wird verhindert, dass der Index außerhalb der verfügbaren Bilder liegt.
        // let path = this.IMAGES_WALKING[i];
        // this.img =this.imageCache[path];
        // this.currentImage ++;
        
    }}, 50);

    }
    jump(){

    }
}