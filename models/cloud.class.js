class Cloud extends MovableObject{
    y = 50
    height = 150;
    width = 500;
    
    constructor(){
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = 200 + Math.random() * 500;
        this.width = 500;
       
    } 
   
}