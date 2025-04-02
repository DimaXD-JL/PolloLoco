/**
 * Represents the keyboard and touch input handler for the game.
 * Tracks the state of all control keys and touch buttons.
 */
class Keyboard {
  /**
   * Creates a new Keyboard instance with all keys initially released.
   */
  constructor() {
    /** @type {boolean} Left arrow key or 'A' key state */
    this.LEFT = false;

    /** @type {boolean} Right arrow key or 'D' key state */
    this.RIGHT = false;

    /** @type {boolean} Up arrow key or 'W' key state */
    this.UP = false;

    /** @type {boolean} Down arrow key or 'S' key state */
    this.DOWN = false;

    /** @type {boolean} Space bar key state */
    this.SPACE = false;

    /** @type {boolean} 'F' key state (used for throwing) */
    this.F = false;
  }
}

/**
 * Binds touch event listeners to on-screen control buttons.
 * Updates keyboard state when touch buttons are pressed/released.
 */
function bindButtonEvents() {
  // Left button touch events
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  // Right button touch events
  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  // Throw button touch events
  document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.F = true;
  });
  document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.F = false;
  });

  // Jump button touch events
  document.getElementById("btnJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("btnJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

/**
 * Handles keyboard keydown events.
 * Updates keyboard state when keys are pressed.
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener("keydown", (e) => {
  // Right arrow or D key
  if (e.keyCode == 39 || e.keyCode == 68) keyboard.RIGHT = true;
  // Left arrow or A key
  if (e.keyCode == 37 || e.keyCode == 65) keyboard.LEFT = true;
  // Up arrow or W key
  if (e.keyCode == 38 || e.keyCode == 87) keyboard.UP = true;
  // Down arrow or S key
  if (e.keyCode == 40 || e.keyCode == 83) keyboard.DOWN = true;
  // Space bar
  if (e.keyCode == 32) keyboard.SPACE = true;
  // F key
  if (e.keyCode == 70) keyboard.F = true;
});

/**
 * Handles keyboard keyup events.
 * Updates keyboard state when keys are released.
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener("keyup", (e) => {
  // Right arrow or D key
  if (e.keyCode == 39 || e.keyCode == 68) keyboard.RIGHT = false;
  // Left arrow or A key
  if (e.keyCode == 37 || e.keyCode == 65) keyboard.LEFT = false;
  // Up arrow or W key
  if (e.keyCode == 38 || e.keyCode == 87) keyboard.UP = false;
  // Down arrow or S key
  if (e.keyCode == 40 || e.keyCode == 83) keyboard.DOWN = false;
  // Space bar
  if (e.keyCode == 32) keyboard.SPACE = false;
  // F key
  if (e.keyCode == 70) keyboard.F = false;
});
