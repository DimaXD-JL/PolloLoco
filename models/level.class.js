class Level {
  enemies;
  clouds;
  backgroundObject;
  coins;
  bottles;
  // level_end_x = 700;

  constructor(enemies, clouds, coins, bottles, backgroundObject) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObject;
    this.coins = coins;
    this.bottles = bottles;
  }
}
