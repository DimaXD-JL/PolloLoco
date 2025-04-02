let canvas;
let world;
let keyboard = new Keyboard();
let game_sound = new Audio("audio/world-sound.mp3");
let sounds = {
  walkingSound: new Audio("audio/walking-charactor.mp3"),
  jumpSound: new Audio("audio/jump-sound.mp3"),
  longIdleSound: new Audio("audio/longidle.mp3"),
  hurtSound: new Audio("audio/hurt.mp3"),
  deadSound: new Audio("audio/dead.mp3"),
  break_sound: new Audio("audio/breaking.mp3"),
  walkSound: new Audio("audio/chicken-soundscape-200111.mp3"),
  bottles_sound: new Audio("audio/bottles.mp3"),
  coin_sound: new Audio("audio/coin.mp3"),
  chicken_sound: new Audio("audio/chicken-hurt-Dead.mp3"),
  winn_sound: new Audio("audio/winn.mp3"),
  gameover_sound: new Audio("audio/game-over.mp3"),
};

function startGame() {
  hideElements(["gameOver", "startButton", "startGame"]);
  initLevel1();
  world = new World(document.getElementById("canvas"), keyboard);
  game_sound.volume = 0.04;
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

function toggleSound(button) {
  const img = button.querySelector("img");
  const isSoundOn = img.dataset.state === "on";

  if (isSoundOn) {
    img.src = "img_pollo_locco/icon/sound_off.png";
    img.dataset.state = "off";
    // Alle Sounds stummschalten
    Object.values(sounds).forEach((sound) => {
      sound.muted = true;
    });
    game_sound.muted = true;
  } else {
    img.src = "img_pollo_locco/icon/sound_on.png";
    img.dataset.state = "on";
    // Alle Sounds wieder aktivieren
    Object.values(sounds).forEach((sound) => {
      sound.muted = false;
    });
    game_sound.muted = false;
  }
}
