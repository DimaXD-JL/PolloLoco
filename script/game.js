let canvas;
let world;
let keyboard = new Keyboard();
let game_sound = new Audio("audio/world-sound.mp3");

function startGame() {
  hideElements(["gameOver", "startButton", "startGame"]);
  initLevel1();
  world = new World(document.getElementById("canvas"), keyboard);
  game_sound.volume = 0.1;
  game_sound.play();
}

function hideElements(ids) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.classList.add("d-none");
  });
}

function showgoodToKnow() {
  let goodToKnow = document.getElementById("goodToKnow");
  goodToKnow.style.display = "block";
}

function closegoodToKnow() {
  let goodToKnow = document.getElementById("goodToKnow");
  goodToKnow.style.display = "none";
}
function showgoodImprint() {
  let imprint = document.getElementById("imprint");
  imprint.style.display = "block";
}

function closegoodImprint() {
  let imprint = document.getElementById("imprint");
  imprint.style.display = "none";
}

function toggleInfoOverlay() {
  const overlay = document.getElementById("infoOverlay");
  overlay.classList.toggle("show");
}

// function toggleSound(button) {
//   const img = button.querySelector("img");
//   const isSoundOn = img.dataset.state === "on";

//   if (isSoundOn) {
//     img.src = "img_pollo_locco/icon/sound_off.png";
//     img.dataset.state = "off";
//     // Hier Code für Sound ausschalten einfügen
//   } else {
//     img.src = "img_pollo_locco/icon/sound_on.png";
//     img.dataset.state = "on";
//     // Hier Code für Sound einschalten einfügen
//   }
// }
