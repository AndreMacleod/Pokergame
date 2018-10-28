function GUI(game) {
    this.game = game; //pass game to access all our game data
    console.log(this.game)
}
function setup() {
    console.log("setup")
    createCanvas(500, 500)
}
function draw() {
    background(0)
    rect(5, 5, 50, 50)
}
