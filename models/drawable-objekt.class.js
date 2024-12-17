class DrawbleObject {
    x = 120;
    y = 310;
    img;
    imageCache = {};
    currentImage = 0;
    height= 150;
    width= 100;




    loadImage(path){
        this.img = new Image();//this.img = document.getElementById('image') <img= id"image">
        this.img.src = path;
    }

    draw(ctx){
        // und hier wird alles wieder rückgengig gemacht 
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken){
        // blaue Umrandung Refactoring
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x,this.y,this.width,this.height);
      ctx.stroke();
      }
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
}