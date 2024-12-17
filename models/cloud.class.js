class Cloud extends MovableObject{
    y = 10
    height = 350;
    width = 500;
    IMAGES_CLOUD = [
        'img_pollo_locco/img/5_background/layers/4_clouds/1.png',
        'img_pollo_locco/img/5_background/layers/4_clouds/2.png',
    ]
    
    constructor(){
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 2100;
        this.animate();
       
    } 
   
    // mit dieser function sorge ich dafür das es jede secunde ausgeführt wird und die Wolkenposition sich ändert !! 
    animate(){
        setInterval(()=>{
            this.moveLeft();
        },1000/ 60);
    }

   
} 