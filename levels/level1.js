let level1;
function initLevel1() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),

      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Endboss(),
    ],

    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ],
    [
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        -719
      ),

      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        0
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        0
      ),

      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719
      ),

      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        1438
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        1438
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        1438
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        1438
      ),

      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        2157
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        2157
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        2157
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        2157
      ),
    ]
  );
}
