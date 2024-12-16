class MovableObject{
  // cxt= steht meistens für „context“ und ist eine kurze, gebräuchliche Abkürzung.
        x = 120;
        y = 310;
        img;
        height= 150;
        width= 100;
        imageCache = {};
        currentImage = 0;
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 1;// Beschleunigung 


       applyGravity(){
        setInterval(()=>{
            this.y += this.speedY
            this.speedY -= this.acceleration;
        }, 1000 / 25);
       }

        loadImage(path){
            this.img = new Image();//this.img = document.getElementById('image') <img= id"image">
            this.img.src = path;
        }

        /**
         * 
         * @param {Array} arr - ['img/image1.png,'img/image2.png....]
         * Der Kommentar hilft Entwicklern zu verstehen, welche Art von Daten die Funktion erwartet.
         */

        loadImages(arr){
          arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            // img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
          }); 
        }

        playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;// let i= 0 % 6; 0, Rest 0
        //% (Modulo) sorgt dafür, dass der Wert von i innerhalb des Bereichs von 0 bis zur Länge des Arrays IMAGES_WALKING - 1 bleibt. 
        // Dadurch wird verhindert, dass der Index außerhalb der verfügbaren Bilder liegt.
        let path = images[i];
        this.img =this.imageCache[path];
        this.currentImage ++;
      }
         moveRight(){
            console.log('Moving right');
            
        }

        moveLeft(){
          setInterval(()=>{
            this.x -= 0.15;
        },1000/ 60);// hiermit sage ich wie schnell es geschiet!!(fps)
        }
}