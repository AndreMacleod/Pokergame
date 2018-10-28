class Game {
    constructor(){ //sets up table
        this.table = new Table(2) //2 players
    }
    start() { //begins the game.
        console.log("you started a game")
        console.log(this.table.getState())
        this.table.nextState()
        console.log(this.table.getState())
        //do game logic loop
    }
    
}


//table.getPlayers()[0].giveHoleCard(table.getDeck()[0]) //first card in deck
//console.log(table.getPlayers())
