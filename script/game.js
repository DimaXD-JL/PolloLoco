let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard);


    console.log('My Charector is', world.character);
    
}

window.addEventListener("keydown", (e)=>{
    if(e.keyCode == 39){// ➡️
        keyboard.RIGHT = true; 
    }
    if(e.keyCode == 68){// D
        keyboard.RIGHT = true; 
    }
    if(e.keyCode == 37){//⬅️
        keyboard.LEFT = true; 
    }
    if(e.keyCode == 65){// A
        keyboard.LEFT = true; 
    }
    if(e.keyCode == 38){// ⬆️
        keyboard.UP = true; 
    }
    if(e.keyCode == 40){// ⬇️
        keyboard.DOWN = true; 
    }
    if(e.keyCode == 83){// S
        keyboard.DOWN = true; 
    }
    if(e.keyCode == 87){// W
        keyboard.UP = true; 
    }
    if(e.keyCode == 32){//Lehrtaste (Jump)
        keyboard.SPACE = true; 
    }
console.log(e);
});

window.addEventListener("keyup", (e)=>{
    if(e.keyCode == 39){// ➡️
        keyboard.RIGHT = false; 
    }
    if(e.keyCode == 68){// D
        keyboard.RIGHT = false; 
    }
    if(e.keyCode == 37){//⬅️
        keyboard.LEFT = false; 
    }
    if(e.keyCode == 65){// A
        keyboard.LEFT = false; 
    }
    if(e.keyCode == 38){// ⬆️
        keyboard.UP = false; 
    }
    if(e.keyCode == 40){// ⬇️
        keyboard.DOWN = false; 
    }
    if(e.keyCode == 83){// S
        keyboard.DOWN = false; 
    }
    if(e.keyCode == 87){// W
        keyboard.UP = false; 
    }
    if(e.keyCode == 32){//Lehrtaste (Jump)
        keyboard.SPACE = false; 
    }
console.log(e);
});