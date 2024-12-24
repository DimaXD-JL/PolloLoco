class Character extends MovableObject{  // extends MovableObject Vererbung von !MovableObject!
    y = 80;
    height = 250;
    speed = 10;


    offset = {
        x: 30,
        y: 120,
        width: 50,
        height: 150,
    }

    idleTimer; // Timer
   

    IMAGES_WALKING =[
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ]
    IMAGES_JUMPING =[
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
        
    ];
    IMAGES_DEAD =[
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT =[
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',

    ]
    IMAGES_IDLE =[
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    
    ]

    // currentImage = 0;
    world;
    wlking_sound = new Audio('audio/walking-charactor.mp3')
    

    constructor(){// sobald der Character erstellt wird soll er folgendes ausführen!!
        super().loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
        
       
       
    } 
  
    animate(){

        setInterval(()=>{
            this.wlking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x <2200 ){
                this.moveRight();
                this.otherDirection = false;
                this.wlking_sound.play();  
                // this.x += this.speed;
                // this.otherDirection = false;
                // this.wlking_sound.play();
            }
            // alternatv = if (this.world.keyboard.LEFT&& this.x < this.level.level_end_x)
            if (this.world.keyboard.LEFT&& this.x >-100){// mit && this.x > 0 sage ich dem character bis wo er laufen kann ( begrenzung)
                this.moveLeft();
                this.wlking_sound.play();
                this.otherDirection = true;  
                // this.x -= this.speed;
                // this.otherDirection = true;
                // this.wlking_sound.play();
            }
            // wenn wir über denn boden sind und unser Chraracter NICHT! auf dem boden ist.
            if(this.world.keyboard.SPACE&& !this.isAboveGround()){
                this.jump();
                // this.speedY = 30;// Sprunghöhe 
            }
            if(this.world.keyboard.UP&& !this.isAboveGround()){
                this.jump();
                // this.speedY = 30;// Sprunghöhe 
            }
            this.world.camera_x = -this.x + 100;// hier sage ich der camera in welchen pixelradius mir der character angezeigt werden soll.   
        },2000/60);

        setInterval(() => {
            if (this.isDead()) {
                // Wenn die Figur tot ist, spiele die Todesanimation ab
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                // Wenn die Figur verletzt ist, spiele die Verletzungsanimation ab
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                // Wenn die Figur springt, spiele die Sprunganimation ab
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Wenn die Figur läuft, spiele die Laufanimation ab
                    this.playAnimation(this.IMAGES_WALKING);
        
                    // Lösche den idleTimer, wenn die Figur sich bewegt
                    if (this.idleTimer) {
                        clearTimeout(this.idleTimer);
                        this.idleTimer = null;
                    }
                }
                // Überprüfen, ob der idleTimer gesetzt ist, wenn die Figur nicht läuft
                if (!this.idleTimer) {
                    this.idleTimer = setTimeout(() => {
                        // Spiele die Idle-Animation ab, wenn die Figur nach 5 Sekunden nicht bewegt wird
                        this.playAnimation(this.IMAGES_IDLE);
                }, 5000); // Warten für 5000 Millisekunden (5 Sekunden), bevor die Funktion aufgerufen wird
            } 
            }  
    }, 5000/60);

    }


}