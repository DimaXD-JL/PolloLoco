class MovableObject extends DrawbleObject{
  // cxt= steht meistens für „context“ und ist eine kurze, gebräuchliche Abkürzung.
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 2.5;// Beschleunigung 
        energy = 100;
        lastHit = 0;


       applyGravity(){
        setInterval(()=>{// wenn wir auf dem Boden sind !!
          if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY
            this.speedY -= this.acceleration;
          }
        }, 1000 / 25);
        
       }

       isAboveGround(){
        if(this instanceof ThrowableObject){
          return true;
        } else{
        return this.y < 210;
       }
      }
    
      isCollding(mo){
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x &&
               this.y < mo.y + mo.height;
      }

      hit() {
        this.energy -= 5;
        if(this.energy < 0) {
          this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
      }
      isHurt(){
        let timepassed= new Date().getTime() - this.lastHit;// Differece in ms
        timepassed = timepassed / 1000;//Difference in s
        return timepassed < 0.5;
      }

      isDead(){
        return this.energy == 0;
      }
      
      playAnimation(images){
        let i = this.currentImage % images.length;// let i= 0 % 6; 0, Rest 0
        //% (Modulo) sorgt dafür, dass der Wert von i innerhalb des Bereichs von 0 bis zur Länge des Arrays IMAGES_WALKING - 1 bleibt. 
        // Dadurch wird verhindert, dass der Index außerhalb der verfügbaren Bilder liegt.
        let path = images[i];
        this.img =this.imageCache[path];
        this.currentImage ++;
      }
        moveRight(){
          this.x += this.speed; 
        }

        moveLeft(){
        this.x -= this.speed;
        }
      
        jump(){
          this.speedY = 30;
       }
}