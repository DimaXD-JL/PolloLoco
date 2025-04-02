/**
 * Represents a game level containing all game objects and environment elements.
 * This class serves as a container for organizing all entities within a specific game level.
 */
class Level {
  /** @type {Array<MovableObject>} Array of enemy objects in the level */
  enemies;

  /** @type {Array<Cloud>} Array of cloud objects in the level */
  clouds;

  /** @type {Array<BackgroundObject>} Array of background objects */
  backgroundObjects;

  /** @type {Array<Coin>} Array of collectible coin objects */
  coins;

  /** @type {Array<Bottle>} Array of collectible bottle objects */
  bottles;

  /**
   * Creates a new Level instance with specified game objects.
   * @param {Array<MovableObject>} enemies - Enemy objects to populate the level
   * @param {Array<Cloud>} clouds - Cloud objects for the level's sky
   * @param {Array<Coin>} coins - Collectible coins placed in the level
   * @param {Array<Bottle>} bottles - Collectible bottles placed in the level
   * @param {Array<BackgroundObject>} backgroundObjects - Background elements for the level
   */
  constructor(enemies, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
