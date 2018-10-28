var game = null //ok to use a global variable because client side 
function GUI(game) {
    this.game = game; //pass game to access all our game data
    console.log("GUI INSTANTIATED")
}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
}
function drawTable() {
   console.log(game.getRound())
}
function draw() {
    //drawTable()
    background(0)
    rect(5, 5, 50, 50)
}
