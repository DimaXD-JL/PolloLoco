let canvas;
let world;
let keyboard = new Keyboard();
game_sound = new Audio("audio/world-sound.mp3");

function startGame() {
  const elementsToHide = ["gameOver", "startButton", "startGame"];
  elementsToHide.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("d-none"); // Blendet das Element aus
    }
  });

  // Spiel initialisieren
  initLevel1();
  world = new World(document.getElementById("canvas"), keyboard);

  // Spielsound starten
  this.game_sound.play();
  this.game_sound.volume = 0.1;
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    // ➡️
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 68) {
    // D
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    //⬅️
    keyboard.LEFT = true;
  }
  if (e.keyCode == 65) {
    // A
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    // ⬆️
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    // ⬇️
    keyboard.DOWN = true;
  }
  if (e.keyCode == 83) {
    // S
    keyboard.DOWN = true;
  }
  if (e.keyCode == 87) {
    // W
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    //Lehrtaste (Jump)
    keyboard.SPACE = true;
  }
  if (e.keyCode == 70) {
    //Werfen
    keyboard.F = true;
  }
  console.log(e);
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    // ➡️
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 68) {
    // D
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    //⬅️
    keyboard.LEFT = false;
  }
  if (e.keyCode == 65) {
    // A
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    // ⬆️
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    // ⬇️
    keyboard.DOWN = false;
  }
  if (e.keyCode == 83) {
    // S
    keyboard.DOWN = false;
  }
  if (e.keyCode == 87) {
    // W
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    //Lehrtaste (Jump)
    keyboard.SPACE = false;
  }
  if (e.keyCode == 70) {
    //Werfen
    keyboard.F = false;
  }
  console.log(e);
});

function showgoodToKnow() {
  let goodToKnow = document.getElementById("goodToKnow");
  goodToKnow.style.display = "block";
}

function closegoodToKnow() {
  let goodToKnow = document.getElementById("goodToKnow");
  goodToKnow.style.display = "none";
}

function doNotClose(event) {
  event.stopPropagation();
}
