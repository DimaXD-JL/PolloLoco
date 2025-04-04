/**
 * Global game variables
 * @namespace
 */
let canvas;
/** @type {HTMLCanvasElement} The game canvas element */
let world;
/** @type {World} The main game world instance */
let keyboard = new Keyboard();

/** @type {Keyboard} Keyboard input handler */

/**
 * Main game sound track
 * @type {HTMLAudioElement}
 */
let game_sound = new Audio("audio/world-sound.mp3");

/**
 * Collection of all game sound effects
 * @namespace
 * @property {HTMLAudioElement} walkingSound - Character walking sound
 * @property {HTMLAudioElement} jumpSound - Character jump sound
 * @property {HTMLAudioElement} longIdleSound - Character idle sound
 * @property {HTMLAudioElement} hurtSound - Character hurt sound
 * @property {HTMLAudioElement} deadSound - Character death sound
 * @property {HTMLAudioElement} break_sound - Bottle breaking sound
 * @property {HTMLAudioElement} walkSound - Chicken walking sound
 * @property {HTMLAudioElement} bottles_sound - Bottle collection sound
 * @property {HTMLAudioElement} coin_sound - Coin collection sound
 * @property {HTMLAudioElement} chicken_sound - Chicken death sound
 * @property {HTMLAudioElement} winn_sound - Game win sound
 * @property {HTMLAudioElement} gameover_sound - Game over sound
 */
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

/**
 * Mutes or unmutes all game sounds
 * @function
 * @param {boolean} mute - Whether to mute (true) or unmute (false) all sounds
 */
function muteAllSounds(mute) {
  Object.values(sounds).forEach((sound) => {
    sound.muted = mute;
  });
  game_sound.muted = mute;
}

/**
 * Initializes the sound state based on saved preference in localStorage
 * @function
 */
function initSoundState() {
  setTimeout(() => {
    const soundButton = document.getElementById("soundButton");
    if (!soundButton) {
      console.error("SoundButton nicht gefunden!");
      return;
    }

    const img = soundButton.querySelector("img");
    if (!img) {
      console.error("SoundButton hat kein img-Element!");
      return;
    }

    const isMuted = localStorage.getItem("soundMuted") === "true";

    if (isMuted) {
      img.src = "img_pollo_locco/icon/sound_off.png";
      img.dataset.state = "off";
    } else {
      img.src = "img_pollo_locco/icon/sound_on.png";
      img.dataset.state = "on";
    }

    muteAllSounds(isMuted);
    console.log("Sound initialisiert:", isMuted ? "stumm" : "an");
  }, 100);
}

/**
 * Toggles game sound on/off and updates button icon
 * @function
 * @param {HTMLElement} button - The sound toggle button element
 */
function toggleSound(button) {
  const img = button.querySelector("img");
  const isSoundOn = img.dataset.state === "on";

  if (isSoundOn) {
    img.src = "img_pollo_locco/icon/sound_off.png";
    img.dataset.state = "off";
    muteAllSounds(true);
    localStorage.setItem("soundMuted", "true");
  } else {
    img.src = "img_pollo_locco/icon/sound_on.png";
    img.dataset.state = "on";
    muteAllSounds(false);
    localStorage.setItem("soundMuted", "false");
  }
}

/**
 * Initializes and starts the game
 * @function
 */
function startGame() {
  hideElements(["gameOver", "startButton", "startGame"]);
  initLevel1();
  world = new World(document.getElementById("canvas"), keyboard);
  game_sound.volume = 0.04;
  game_sound.play();
}

/**
 * Hides multiple elements by their IDs
 * @function
 * @param {string[]} ids - Array of element IDs to hide
 */
function hideElements(ids) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.classList.add("d-none");
  });
}

/**
 * Shows the game information overlay
 * @function
 */
function showgoodToKnow() {
  let goodToKnow = document.getElementById("goodToKnow");
  goodToKnow.style.display = "block";
}

/**
 * Hides the game information overlay
 * @function
 */
function closegoodToKnow() {
  let goodToKnow = document.getElementById("goodToKnow");
  goodToKnow.style.display = "none";
}

/**
 * Shows the imprint/legal information overlay
 * @function
 */
function showgoodImprint() {
  let imprint = document.getElementById("imprint");
  imprint.style.display = "block";
}

/**
 * Hides the imprint/legal information overlay
 * @function
 */
function closegoodImprint() {
  let imprint = document.getElementById("imprint");
  imprint.style.display = "none";
}

/**
 * Toggles the display of game information overlay
 * @function
 */
function toggleInfoOverlay() {
  const overlay = document.getElementById("infoOverlay");
  overlay.classList.toggle("show");
}

// Initialize sound state when DOM is loaded
window.addEventListener("DOMContentLoaded", initSoundState);
