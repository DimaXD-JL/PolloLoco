class Endboss extends MovableObject {
  y = 120;
  height = 350;
  width = 200;
  energy = 100;

  offset = {
    x: 30,
    y: 70,
    width: 50,
    height: 150,
  };

  IMAGES_WALKING = [
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hadFirstContact = false;
  walkSound = new Audio("audio/chicken-soundscape-200111.mp3");

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 2200; // auf welcher Position sich der Boss befindet
    this.animate();
  }
  animate() {
    let i = 0;

    setInterval(() => {
      if (i < 10 && this.hadFirstContact) {
        this.playAnimation(this.IMAGES_ALERT); // Kurzes Warnen nach Kontakt
      } else if (this.hadFirstContact) {
        this.playAnimation(this.IMAGES_WALKING); // Laufanimation
      }

      i++;
      // Prüfen, ob der Charakter nahe genug ist
      if (world.character.x > 1900 && !this.hadFirstContact) {
        i = 0; // Zähler zurücksetzen
        this.hadFirstContact = true; // Boss wurde aktiviert
      }
    }, 300);

    setInterval(() => {
      if (this.hadFirstContact) {
        this.moveLeft();
        this.walkSound.play();
        this.walkSound.volume = 4;
      }
    }, 100 / 60); // Bewegung mit 60 FPS

    setInterval(() => {
      if (this.hadFirstContact) this.playAnimation(this.IMAGES_WALKING);
      this.playAnimation(this.IMAGES_ATTACK);
    }, 4000);
  }

  // animate() {
  //   setInterval(() => {
  //     if (this.energy > 0) {
  //       this.playAnimation(this.IMAGES_ALERT);
  //     } else if (this.energy === 0) {
  //       this.playAnimation(this.IMAGES_DEAD);
  //     }
  //   }, 280);
  // }
  hit() {
    this.energy -= 40;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }
}
