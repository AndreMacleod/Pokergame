class Game {
    constructor(){ //sets up table
        this.table = new Table(2) //x players
        this.round = null
    }
    start() { //begins the game.
        console.log("you started a game")
        this.round = new Round()
        this.round.nextState() //
        console.log(this.round.getState())
        //do game logic loop
    }
    
}


//table.getPlayers()[0].giveHoleCard(table.getDeck()[0]) //first card in deck
//console.log(table.getPlayers())
