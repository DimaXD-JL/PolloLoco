let canvas;
let ctx;
let character = new Character();
let enemies=[
    new Chicken(),
    new Chicken(),
    new Chicken(),
];
let world = new World();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    console.log('My Charector is', world.Character);
    
}
